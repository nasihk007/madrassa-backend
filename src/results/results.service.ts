import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { Op, Transaction } from 'sequelize';
import { ExamResult } from '../entities/exam-result.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { ResultEntrySession } from '../entities/result-entry-session.entity';
import { Attendance } from '../entities/attendance.entity';
import { Parent } from '../entities/parent.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { CreateBulkResultEntryDto } from './dto/create-bulk-result-entry.dto';
import { ApproveResultsDto } from './dto/approve-results.dto';
import { PublishResultsDto } from './dto/publish-results.dto';
import { UserRole } from '../entities/user.entity';
import { UstadsService } from '../ustads/ustads.service';
import { AttendanceService } from '../attendance/attendance.service';

@Injectable()
export class ResultsService {
  constructor(
    @Inject('EXAM_RESULT_REPOSITORY')
    private examResultRepository: typeof ExamResult,
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
    @Inject('RESULT_ENTRY_SESSION_REPOSITORY')
    private resultEntrySessionRepository: typeof ResultEntrySession,
    @Inject('ATTENDANCE_REPOSITORY')
    private attendanceRepository: typeof Attendance,
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: typeof Student,
    @Inject('PARENT_REPOSITORY')
    private parentRepository: typeof Parent,
    private ustadsService: UstadsService,
    private attendanceService: AttendanceService,
    @Inject('SEQUELIZE')
    private sequelize: any,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    // Filter by exam type if provided
    if (pageOptionsDto.examType) {
      whereClause.examType = pageOptionsDto.examType;
    }

    // Filter by status if provided
    if (pageOptionsDto.status) {
      whereClause.status = pageOptionsDto.status;
    }

    if (pageOptionsDto.studentId) {
      whereClause.studentId = pageOptionsDto.studentId;
    }

    if (pageOptionsDto.academicYearId) {
      whereClause.academicYearId = pageOptionsDto.academicYearId;
    }

    // Filter by ustad's assigned classes if user is an ustad
    // Admin users always see all exam results (no filtering)
    let studentInclude: any = {
      model: Student,
    };
    
    // Build class division filter
    const classDivisionFilter: any = {};
    
    if (userRole === UserRole.USTAD && userId) {
      const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
      if (assignedClassIds.length > 0) {
        // For ustad: filter by requested classDivisionId if provided, otherwise show all assigned classes
        if (pageOptionsDto.classDivisionId) {
          // Check if requested class is in ustad's assigned classes
          if (assignedClassIds.includes(pageOptionsDto.classDivisionId)) {
            classDivisionFilter.classDivisionId = pageOptionsDto.classDivisionId;
          } else {
            // If ustad doesn't have access to this class, return empty result
            classDivisionFilter.classDivisionId = { [Op.in]: [] };
          }
        } else {
          // No specific class requested, show all assigned classes
          classDivisionFilter.classDivisionId = { [Op.in]: assignedClassIds };
        }
        studentInclude.where = classDivisionFilter;
        studentInclude.required = true;
      } else {
        // If ustad has no assigned classes, return empty result
        studentInclude.where = {
          classDivisionId: { [Op.in]: [] },
        };
        studentInclude.required = true;
      }
    } else {
      // For admin or other roles, always require Student include (INNER JOIN)
      // since every result should have a student
      studentInclude.required = true;
      
      // Only apply classDivisionId filter if provided
      if (pageOptionsDto.classDivisionId) {
        classDivisionFilter.classDivisionId = pageOptionsDto.classDivisionId;
        studentInclude.where = classDivisionFilter;
      }
      // If no class filter, studentInclude has no where clause, so all results are returned
    }

    // Handle search query - search only in student name (case-insensitive)
    if (pageOptionsDto.query) {
      // Ensure Student include is required when searching by student name
      studentInclude.required = true;
      
      // Search in student name using case-insensitive ILIKE (PostgreSQL)
      whereClause['$student.name$'] = { [Op.iLike]: `%${pageOptionsDto.query}%` };
    }

    // Build include array
    // Make markedBy and AcademicYear optional to avoid filtering out results with null values
    const includeArray: any[] = [
      studentInclude,
      { model: Ustad, as: 'markedBy', required: false },
      { model: AcademicYear, required: false }
    ];

    // STEP 1: Fetch ALL matching results (without pagination limit)
    // We need all results to group them by session
    const allResults = await this.examResultRepository.findAll({
      where: whereClause,
      include: includeArray,
      order: [
        ['examDate', pageOptionsDto.order],
        ['id', 'ASC'] // Secondary sort by ID for consistency
      ],
    });

    // STEP 2: Group results by resultEntrySessionId
    // For results without resultEntrySessionId, treat each as its own session
    const sessionMap = new Map<string, ExamResult[]>();
    
    allResults.forEach((result) => {
      // Use resultEntrySessionId if available, otherwise use result id as session identifier
      const sessionId = result.resultEntrySessionId || `single-${result.id}`;
      
      if (!sessionMap.has(sessionId)) {
        sessionMap.set(sessionId, []);
      }
      sessionMap.get(sessionId)!.push(result);
    });

    // STEP 3: Convert grouped sessions to array and sort
    // Each session should be represented by its first result (for sorting purposes)
    const sessions = Array.from(sessionMap.entries()).map(([sessionId, results]) => {
      // Sort results within session by subject or id for consistency
      const sortedResults = results.sort((a, b) => {
        if (a.subject && b.subject) {
          return a.subject.localeCompare(b.subject);
        }
        return a.id.localeCompare(b.id);
      });
      
      return {
        sessionId,
        firstResult: sortedResults[0], // Use first result for session metadata
        allResults: sortedResults, // All results in this session
      };
    });

    // Sort sessions by examDate (from first result) and then by sessionId
    sessions.sort((a, b) => {
      const dateA = new Date(a.firstResult.examDate).getTime();
      const dateB = new Date(b.firstResult.examDate).getTime();
      
      if (dateA !== dateB) {
        return pageOptionsDto.order === 'DESC' ? dateB - dateA : dateA - dateB;
      }
      
      // If dates are equal, sort by sessionId
      return a.sessionId.localeCompare(b.sessionId);
    });

    // STEP 4: Get total count of sessions (not individual results)
    const totalSessionCount = sessions.length;

    // STEP 5: Apply pagination to sessions
    const take = pageOptionsDto.takeOrLimit;
    const skip = pageOptionsDto.skip;
    const paginatedSessions = sessions.slice(skip, skip + take);

    // STEP 6: Flatten paginated sessions back to individual results for response
    // The frontend will group them again, but this ensures all subjects for a session are included
    const paginatedResults: ExamResult[] = [];
    paginatedSessions.forEach((session) => {
      // Add all results from this session
      paginatedResults.push(...session.allResults);
    });

    // STEP 7: Create pagination metadata based on sessions, not individual results
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: totalSessionCount, // Count of sessions, not individual results
    });

    return new CommonDataResponseDto(paginatedResults, true, 'Exam results retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<ExamResult> {
    const result = await this.examResultRepository.findOne({
      where: { id },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });

    if (!result) {
      throw new NotFoundException(`Exam result with ID ${id} not found`);
    }

    return result;
  }

  async findByStudent(studentId: string, userId?: string, userRole?: string): Promise<ExamResult[]> {
    const whereClause: any = { studentId };

    // For parents, only return published results
    if ((userRole === UserRole.PARENT || userRole === 'parent') && userId) {
      whereClause.status = 'published';
    }

    return this.examResultRepository.findAll({
      where: whereClause,
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });
  }

  async create(createResultDto: CreateExamResultDto): Promise<ExamResult> {
    let markedById = createResultDto.markedById;
    
    // If markedByUserId is provided, find the corresponding ustad ID
    if (createResultDto.markedByUserId && !markedById) {
      const ustad = await this.ustadsService.getUstadByUserId(createResultDto.markedByUserId);
      if (ustad) {
        markedById = ustad.id;
      }
    }

    const resultData: any = {
      ...createResultDto,
      examDate: new Date(createResultDto.examDate),
      markedById,
    };
    
    // Remove markedByUserId from the data as it's not a field in the entity
    delete resultData.markedByUserId;
    
    // Remove undefined values
    const cleanResultData = Object.fromEntries(
      Object.entries(resultData).filter(([_, value]) => value !== undefined)
    );
    
    const result = await this.examResultRepository.create(cleanResultData);
    return result;
  }

  async update(id: string, updateResultDto: UpdateExamResultDto): Promise<ExamResult> {
    const result = await this.findOne(id);
    const updateData: any = { ...updateResultDto };
    
    if (updateResultDto.examDate) {
      updateData.examDate = new Date(updateResultDto.examDate);
    }
    
    // If markedByUserId is provided, find the corresponding ustad ID
    if (updateResultDto.markedByUserId && !updateResultDto.markedById) {
      const ustad = await this.ustadsService.getUstadByUserId(updateResultDto.markedByUserId);
      if (ustad) {
        updateData.markedById = ustad.id;
      }
    }
    
    // Remove markedByUserId from update data as it's not a field in the entity
    delete updateData.markedByUserId;
    
    await result.update(updateData);
    return result;
  }

  async remove(id: string): Promise<void> {
    const result = await this.findOne(id);
    await result.destroy();
  }

  async createBulkEntry(createBulkEntryDto: CreateBulkResultEntryDto, markedByUserId?: string): Promise<ResultEntrySession> {
    const transaction = await this.sequelize.transaction();
    
    try {
      // Validate exam type vs entry type
      if (createBulkEntryDto.examType === 'annual' && createBulkEntryDto.subjects && createBulkEntryDto.subjects.length > 0) {
        throw new BadRequestException('Annual exam should only have pass/fail status, not subjects');
      }
      if (createBulkEntryDto.examType !== 'annual' && !createBulkEntryDto.passFailStatus && (!createBulkEntryDto.subjects || createBulkEntryDto.subjects.length === 0)) {
        throw new BadRequestException('First Term and Mid Term require at least one subject');
      }

      // Get markedById from userId if provided
      let markedById = createBulkEntryDto.studentId; // Placeholder, will be updated
      if (markedByUserId) {
        const ustad = await this.ustadsService.getUstadByUserId(markedByUserId);
        if (ustad) {
          markedById = ustad.id;
        }
      }

      // Create ResultEntrySession
      const session = await this.resultEntrySessionRepository.create({
        studentId: createBulkEntryDto.studentId,
        examType: createBulkEntryDto.examType,
        examDate: new Date(createBulkEntryDto.examDate),
        academicYearId: createBulkEntryDto.academicYearId,
        markedById,
        status: 'submitted',
      }, { transaction });

      // Create ExamResult records
      const examResults: ExamResult[] = [];

      if (createBulkEntryDto.examType === 'annual') {
        // Annual exam - single pass/fail record
        // Use 0/0 for marks since annual exams are pass/fail only (marks not applicable)
        const annualResult = await this.examResultRepository.create({
          studentId: createBulkEntryDto.studentId,
          subject: 'Annual Exam',
          marks: 0,
          totalMarks: 0,
          examType: createBulkEntryDto.examType,
          examDate: new Date(createBulkEntryDto.examDate),
          academicYearId: createBulkEntryDto.academicYearId,
          markedById,
          status: 'pending',
          isPassFail: true,
          passFailStatus: createBulkEntryDto.passFailStatus,
          resultEntrySessionId: session.id,
        }, { transaction });
        examResults.push(annualResult);
      } else {
        // First Term & Mid Term - multiple subject records
        for (const subjectEntry of createBulkEntryDto.subjects || []) {
          const result = await this.examResultRepository.create({
            studentId: createBulkEntryDto.studentId,
            subject: subjectEntry.subjectName, // Store subject name
            marks: subjectEntry.marks,
            totalMarks: subjectEntry.totalMarks,
            examType: createBulkEntryDto.examType,
            examDate: new Date(createBulkEntryDto.examDate),
            academicYearId: createBulkEntryDto.academicYearId,
            markedById,
            status: 'pending',
            isPassFail: false,
            resultEntrySessionId: session.id,
          }, { transaction });
          examResults.push(result);
        }
      }

      // Calculate totals and rank
      await this.calculateTotals(session.id, transaction);
      await transaction.commit();

      return await this.resultEntrySessionRepository.findByPk(session.id, {
        include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear, { model: ExamResult, as: 'examResults' }],
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async approveResults(approveResultsDto: ApproveResultsDto, adminUserId: string): Promise<number> {
    // Find the ustad record for the admin user (if exists)
    // approvedById must reference an ustad record, not a user ID
    const ustad = await this.ustadRepository.findOne({
      where: { userId: adminUserId },
    });

    // If admin doesn't have an ustad record, we'll set approvedById to null (allowed)
    const approvedById = ustad ? ustad.id : null;

    // First, find the results to approve
    const whereClause: any = {
      status: 'pending',
      examType: approveResultsDto.examType,
    };

    if (approveResultsDto.academicYearId) {
      whereClause.academicYearId = approveResultsDto.academicYearId;
    }

    if (approveResultsDto.resultIds && approveResultsDto.resultIds.length > 0) {
      whereClause.id = { [Op.in]: approveResultsDto.resultIds };
    }

    // Get results to update (with student include if filtering by class)
    const includeOptions: any[] = [];
    if (approveResultsDto.classDivisionId) {
      includeOptions.push({
        model: Student,
        where: { classDivisionId: approveResultsDto.classDivisionId },
        required: true,
      });
    }

    const results = await this.examResultRepository.findAll({
      where: whereClause,
      include: includeOptions,
    });

    const resultIds = results.map(r => r.id);

    if (resultIds.length === 0) {
      return 0;
    }

    // Update all results
    const updateData: any = {
      status: 'approved',
      approvedAt: new Date(),
    };
    
    // Only set approvedById if we have a valid ustad record
    if (approvedById) {
      updateData.approvedById = approvedById;
    }

    const [updatedCount] = await this.examResultRepository.update(
      updateData,
      {
        where: { id: { [Op.in]: resultIds } },
      }
    );

    // Recalculate ranks after approval
    if (approveResultsDto.classDivisionId) {
      await this.calculateRank(
        approveResultsDto.examType,
        approveResultsDto.classDivisionId,
        approveResultsDto.academicYearId,
      );
    }

    return updatedCount;
  }

  async publishResults(publishResultsDto: PublishResultsDto, adminId: string): Promise<number> {
    // First, find the results to publish
    const whereClause: any = {
      status: 'approved',
    };

    if (publishResultsDto.examType) {
      whereClause.examType = publishResultsDto.examType;
    }

    if (publishResultsDto.academicYearId) {
      whereClause.academicYearId = publishResultsDto.academicYearId;
    }

    if (publishResultsDto.resultIds && publishResultsDto.resultIds.length > 0) {
      whereClause.id = { [Op.in]: publishResultsDto.resultIds };
    }

    // Get results to update (with student include if filtering by class)
    const includeOptions: any[] = [];
    if (publishResultsDto.classDivisionId) {
      includeOptions.push({
        model: Student,
        where: { classDivisionId: publishResultsDto.classDivisionId },
        required: true,
      });
    }

    const results = await this.examResultRepository.findAll({
      where: whereClause,
      include: includeOptions,
    });

    const resultIds = results.map(r => r.id);

    if (resultIds.length === 0) {
      return 0;
    }

    // Update all results
    const [updatedCount] = await this.examResultRepository.update(
      {
        status: 'published',
        publishedAt: new Date(),
      },
      {
        where: { id: { [Op.in]: resultIds } },
      }
    );

    return updatedCount;
  }

  async calculateRank(examType: string, classDivisionId: string, academicYearId?: string): Promise<void> {
    const whereClause: any = {
      examType,
      status: { [Op.in]: ['approved', 'published'] },
    };

    if (academicYearId) {
      whereClause.academicYearId = academicYearId;
    }

    // Get all students in the class
    const students = await this.studentRepository.findAll({
      where: { classDivisionId },
    });

    const studentIds = students.map(s => s.id);

    // Get all results for these students
    const results = await this.examResultRepository.findAll({
      where: {
        ...whereClause,
        studentId: { [Op.in]: studentIds },
      },
      include: [Student],
    });

    // Group results by student and calculate total marks
    const studentTotals = new Map<string, { totalMarks: number; totalPossibleMarks: number; student: Student }>();

    results.forEach(result => {
      const studentId = result.studentId;
      if (!studentTotals.has(studentId)) {
        studentTotals.set(studentId, {
          totalMarks: 0,
          totalPossibleMarks: 0,
          student: result.student as Student,
        });
      }

      const totals = studentTotals.get(studentId)!;
      if (result.marks !== null && result.totalMarks !== null) {
        totals.totalMarks += result.marks;
        totals.totalPossibleMarks += result.totalMarks;
      }
    });

    // Sort by total marks (descending)
    const sortedStudents = Array.from(studentTotals.entries())
      .sort((a, b) => b[1].totalMarks - a[1].totalMarks);

    // Assign ranks (handle ties)
    let currentRank = 1;
    let previousMarks: number | null = null;

    for (let i = 0; i < sortedStudents.length; i++) {
      const [studentId, data] = sortedStudents[i];
      
      if (previousMarks !== null && data.totalMarks < previousMarks) {
        currentRank = i + 1;
      }

      // Update all results for this student with the rank
      await this.examResultRepository.update(
        { classRank: currentRank },
        {
          where: {
            studentId,
            examType,
            academicYearId: academicYearId || { [Op.ne]: null },
          },
        }
      );

      previousMarks = data.totalMarks;
    }
  }

  async calculateTotals(resultEntrySessionId: string, transaction?: Transaction): Promise<void> {
    const session = await this.resultEntrySessionRepository.findByPk(resultEntrySessionId, {
      include: [{ model: ExamResult, as: 'examResults' }],
      transaction,
    });

    if (!session) {
      throw new NotFoundException('Result entry session not found');
    }

    // Calculate total marks and total possible marks for this session
    let sessionTotalMarks = 0;
    let sessionTotalPossibleMarks = 0;

    if (session.examResults) {
      session.examResults.forEach(result => {
        if (result.marks !== null && result.totalMarks !== null) {
          sessionTotalMarks += result.marks;
          sessionTotalPossibleMarks += result.totalMarks;
        }
      });
    }

    // Get all results for this student and exam type to calculate overall totals
    const allStudentResults = await this.examResultRepository.findAll({
      where: {
        studentId: session.studentId,
        examType: session.examType,
        academicYearId: session.academicYearId,
        status: { [Op.in]: ['pending', 'approved', 'published'] },
      },
      transaction,
    });

    // Calculate overall totals across all results for this exam type
    let totalMarks = 0;
    let totalPossibleMarks = 0;

    allStudentResults.forEach(result => {
      if (result.marks !== null && result.totalMarks !== null) {
        totalMarks += result.marks;
        totalPossibleMarks += result.totalMarks;
      }
    });

    // Calculate total hajers (attendance percentage)
    // Get all attendance records for this student and academic year
    const attendanceRecords = await this.attendanceRepository.findAll({
      where: {
        studentId: session.studentId,
        academicYearId: session.academicYearId,
      },
      transaction,
    });

    let totalHajers = 0;
    if (attendanceRecords.length > 0) {
      const presentDays = attendanceRecords.filter(r => r.status === 'present').length;
      totalHajers = (presentDays / attendanceRecords.length) * 100;
    }

    // Update session with session-specific totals
    await session.update({
      totalMarks: sessionTotalMarks,
      totalPossibleMarks: sessionTotalPossibleMarks,
      totalHajers,
    }, { transaction });

    // Update all results in this session with overall calculated values
    if (session.examResults) {
      for (const result of session.examResults) {
        await result.update({
          totalMarksCalculated: totalMarks,
          totalPossibleMarks,
          totalHajers,
        }, { transaction });
      }
    }

    // Also update all other results for this student/exam type with overall totals
    for (const result of allStudentResults) {
      await result.update({
        totalMarksCalculated: totalMarks,
        totalPossibleMarks,
        totalHajers,
      }, { transaction });
    }

    // Calculate and update rank
    const student = await this.studentRepository.findByPk(session.studentId, { transaction });
    if (student?.classDivisionId) {
      await this.calculateRank(
        session.examType,
        student.classDivisionId,
        session.academicYearId,
      );
    }
  }

  async getPublishedResults(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto> {
    const whereClause: any = {
      status: 'published',
    };

    if (pageOptionsDto.studentId) {
      whereClause.studentId = pageOptionsDto.studentId;
    }

    if (pageOptionsDto.academicYearId) {
      whereClause.academicYearId = pageOptionsDto.academicYearId;
    }

    // Build student include - filter by parent's students if user is a parent
    const studentInclude: any = {
      model: Student,
    };

    // For parents, filter to only show their children's results
    if ((userRole === UserRole.PARENT || userRole === 'parent') && userId) {
      const parent = await this.parentRepository.findOne({
        where: { userId },
      });

      if (parent) {
        // Filter to only include students that belong to this parent
        studentInclude.where = {
          parentId: parent.id,
        };
        studentInclude.required = true;
      } else {
        // If parent record not found, return empty results
        studentInclude.where = {
          parentId: { [Op.in]: [] },
        };
        studentInclude.required = true;
      }
    }

    const { rows, count } = await this.examResultRepository.findAndCountAll({
      where: whereClause,
      include: [
        studentInclude,
        { model: Ustad, as: 'markedBy' },
        AcademicYear,
      ],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['examDate', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Published results retrieved successfully', pageMetaDto);
  }
}

