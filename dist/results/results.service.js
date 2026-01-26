"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const exam_result_entity_1 = require("../entities/exam-result.entity");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const dto_1 = require("../shared/dto");
const user_entity_1 = require("../entities/user.entity");
const ustads_service_1 = require("../ustads/ustads.service");
const attendance_service_1 = require("../attendance/attendance.service");
let ResultsService = class ResultsService {
    constructor(examResultRepository, ustadRepository, resultEntrySessionRepository, attendanceRepository, studentRepository, parentRepository, ustadsService, attendanceService, sequelize) {
        this.examResultRepository = examResultRepository;
        this.ustadRepository = ustadRepository;
        this.resultEntrySessionRepository = resultEntrySessionRepository;
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.parentRepository = parentRepository;
        this.ustadsService = ustadsService;
        this.attendanceService = attendanceService;
        this.sequelize = sequelize;
    }
    async findAll(pageOptionsDto, userId, userRole) {
        const whereClause = {};
        if (pageOptionsDto.examType) {
            whereClause.examType = pageOptionsDto.examType;
        }
        if (pageOptionsDto.status) {
            whereClause.status = pageOptionsDto.status;
        }
        if (pageOptionsDto.studentId) {
            whereClause.studentId = pageOptionsDto.studentId;
        }
        if (pageOptionsDto.academicYearId) {
            whereClause.academicYearId = pageOptionsDto.academicYearId;
        }
        let studentInclude = {
            model: student_entity_1.Student,
        };
        const classDivisionFilter = {};
        if (userRole === user_entity_1.UserRole.USTAD && userId) {
            const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
            if (assignedClassIds.length > 0) {
                if (pageOptionsDto.classDivisionId) {
                    if (assignedClassIds.includes(pageOptionsDto.classDivisionId)) {
                        classDivisionFilter.classDivisionId = pageOptionsDto.classDivisionId;
                    }
                    else {
                        classDivisionFilter.classDivisionId = { [sequelize_1.Op.in]: [] };
                    }
                }
                else {
                    classDivisionFilter.classDivisionId = { [sequelize_1.Op.in]: assignedClassIds };
                }
                studentInclude.where = classDivisionFilter;
                studentInclude.required = true;
            }
            else {
                studentInclude.where = {
                    classDivisionId: { [sequelize_1.Op.in]: [] },
                };
                studentInclude.required = true;
            }
        }
        else {
            studentInclude.required = true;
            if (pageOptionsDto.classDivisionId) {
                classDivisionFilter.classDivisionId = pageOptionsDto.classDivisionId;
                studentInclude.where = classDivisionFilter;
            }
        }
        if (pageOptionsDto.query) {
            studentInclude.required = true;
            whereClause['$student.name$'] = { [sequelize_1.Op.iLike]: `%${pageOptionsDto.query}%` };
        }
        const includeArray = [
            studentInclude,
            { model: ustad_entity_1.Ustad, as: 'markedBy', required: false },
            { model: academic_year_entity_1.AcademicYear, required: false }
        ];
        const allResults = await this.examResultRepository.findAll({
            where: whereClause,
            include: includeArray,
            order: [
                ['examDate', pageOptionsDto.order],
                ['id', 'ASC']
            ],
        });
        const sessionMap = new Map();
        allResults.forEach((result) => {
            const sessionId = result.resultEntrySessionId || `single-${result.id}`;
            if (!sessionMap.has(sessionId)) {
                sessionMap.set(sessionId, []);
            }
            sessionMap.get(sessionId).push(result);
        });
        const sessions = Array.from(sessionMap.entries()).map(([sessionId, results]) => {
            const sortedResults = results.sort((a, b) => {
                if (a.subject && b.subject) {
                    return a.subject.localeCompare(b.subject);
                }
                return a.id.localeCompare(b.id);
            });
            return {
                sessionId,
                firstResult: sortedResults[0],
                allResults: sortedResults,
            };
        });
        sessions.sort((a, b) => {
            const dateA = new Date(a.firstResult.examDate).getTime();
            const dateB = new Date(b.firstResult.examDate).getTime();
            if (dateA !== dateB) {
                return pageOptionsDto.order === 'DESC' ? dateB - dateA : dateA - dateB;
            }
            return a.sessionId.localeCompare(b.sessionId);
        });
        const totalSessionCount = sessions.length;
        const take = pageOptionsDto.takeOrLimit;
        const skip = pageOptionsDto.skip;
        const paginatedSessions = sessions.slice(skip, skip + take);
        const paginatedResults = [];
        paginatedSessions.forEach((session) => {
            paginatedResults.push(...session.allResults);
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: totalSessionCount,
        });
        return new dto_1.CommonDataResponseDto(paginatedResults, true, 'Exam results retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const result = await this.examResultRepository.findOne({
            where: { id },
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
        if (!result) {
            throw new common_1.NotFoundException(`Exam result with ID ${id} not found`);
        }
        return result;
    }
    async findByStudent(studentId, userId, userRole) {
        const whereClause = { studentId };
        if ((userRole === user_entity_1.UserRole.PARENT || userRole === 'parent') && userId) {
            whereClause.status = 'published';
        }
        return this.examResultRepository.findAll({
            where: whereClause,
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
    }
    async create(createResultDto) {
        let markedById = createResultDto.markedById;
        if (createResultDto.markedByUserId && !markedById) {
            const ustad = await this.ustadsService.getUstadByUserId(createResultDto.markedByUserId);
            if (ustad) {
                markedById = ustad.id;
            }
        }
        const resultData = {
            ...createResultDto,
            examDate: new Date(createResultDto.examDate),
            markedById,
        };
        delete resultData.markedByUserId;
        const cleanResultData = Object.fromEntries(Object.entries(resultData).filter(([_, value]) => value !== undefined));
        const result = await this.examResultRepository.create(cleanResultData);
        return result;
    }
    async update(id, updateResultDto) {
        const result = await this.findOne(id);
        const updateData = { ...updateResultDto };
        if (updateResultDto.examDate) {
            updateData.examDate = new Date(updateResultDto.examDate);
        }
        if (updateResultDto.markedByUserId && !updateResultDto.markedById) {
            const ustad = await this.ustadsService.getUstadByUserId(updateResultDto.markedByUserId);
            if (ustad) {
                updateData.markedById = ustad.id;
            }
        }
        delete updateData.markedByUserId;
        await result.update(updateData);
        return result;
    }
    async remove(id) {
        const result = await this.findOne(id);
        await result.destroy();
    }
    async createBulkEntry(createBulkEntryDto, markedByUserId) {
        const transaction = await this.sequelize.transaction();
        try {
            if (createBulkEntryDto.examType === 'annual' && createBulkEntryDto.subjects && createBulkEntryDto.subjects.length > 0) {
                throw new common_1.BadRequestException('Annual exam should only have pass/fail status, not subjects');
            }
            if (createBulkEntryDto.examType !== 'annual' && !createBulkEntryDto.passFailStatus && (!createBulkEntryDto.subjects || createBulkEntryDto.subjects.length === 0)) {
                throw new common_1.BadRequestException('First Term and Mid Term require at least one subject');
            }
            let markedById = createBulkEntryDto.studentId;
            if (markedByUserId) {
                const ustad = await this.ustadsService.getUstadByUserId(markedByUserId);
                if (ustad) {
                    markedById = ustad.id;
                }
            }
            const session = await this.resultEntrySessionRepository.create({
                studentId: createBulkEntryDto.studentId,
                examType: createBulkEntryDto.examType,
                examDate: new Date(createBulkEntryDto.examDate),
                academicYearId: createBulkEntryDto.academicYearId,
                markedById,
                status: 'submitted',
            }, { transaction });
            const examResults = [];
            if (createBulkEntryDto.examType === 'annual') {
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
            }
            else {
                for (const subjectEntry of createBulkEntryDto.subjects || []) {
                    const result = await this.examResultRepository.create({
                        studentId: createBulkEntryDto.studentId,
                        subject: subjectEntry.subjectName,
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
            await this.calculateTotals(session.id, transaction);
            await transaction.commit();
            return await this.resultEntrySessionRepository.findByPk(session.id, {
                include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear, { model: exam_result_entity_1.ExamResult, as: 'examResults' }],
            });
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async approveResults(approveResultsDto, adminUserId) {
        const ustad = await this.ustadRepository.findOne({
            where: { userId: adminUserId },
        });
        const approvedById = ustad ? ustad.id : null;
        const whereClause = {
            status: 'pending',
            examType: approveResultsDto.examType,
        };
        if (approveResultsDto.academicYearId) {
            whereClause.academicYearId = approveResultsDto.academicYearId;
        }
        if (approveResultsDto.resultIds && approveResultsDto.resultIds.length > 0) {
            whereClause.id = { [sequelize_1.Op.in]: approveResultsDto.resultIds };
        }
        const includeOptions = [];
        if (approveResultsDto.classDivisionId) {
            includeOptions.push({
                model: student_entity_1.Student,
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
        const updateData = {
            status: 'approved',
            approvedAt: new Date(),
        };
        if (approvedById) {
            updateData.approvedById = approvedById;
        }
        const [updatedCount] = await this.examResultRepository.update(updateData, {
            where: { id: { [sequelize_1.Op.in]: resultIds } },
        });
        if (approveResultsDto.classDivisionId) {
            await this.calculateRank(approveResultsDto.examType, approveResultsDto.classDivisionId, approveResultsDto.academicYearId);
        }
        return updatedCount;
    }
    async publishResults(publishResultsDto, adminId) {
        const whereClause = {
            status: 'approved',
        };
        if (publishResultsDto.examType) {
            whereClause.examType = publishResultsDto.examType;
        }
        if (publishResultsDto.academicYearId) {
            whereClause.academicYearId = publishResultsDto.academicYearId;
        }
        if (publishResultsDto.resultIds && publishResultsDto.resultIds.length > 0) {
            whereClause.id = { [sequelize_1.Op.in]: publishResultsDto.resultIds };
        }
        const includeOptions = [];
        if (publishResultsDto.classDivisionId) {
            includeOptions.push({
                model: student_entity_1.Student,
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
        const [updatedCount] = await this.examResultRepository.update({
            status: 'published',
            publishedAt: new Date(),
        }, {
            where: { id: { [sequelize_1.Op.in]: resultIds } },
        });
        return updatedCount;
    }
    async calculateRank(examType, classDivisionId, academicYearId) {
        const whereClause = {
            examType,
            status: { [sequelize_1.Op.in]: ['approved', 'published'] },
        };
        if (academicYearId) {
            whereClause.academicYearId = academicYearId;
        }
        const students = await this.studentRepository.findAll({
            where: { classDivisionId },
        });
        const studentIds = students.map(s => s.id);
        const results = await this.examResultRepository.findAll({
            where: {
                ...whereClause,
                studentId: { [sequelize_1.Op.in]: studentIds },
            },
            include: [student_entity_1.Student],
        });
        const studentTotals = new Map();
        results.forEach(result => {
            const studentId = result.studentId;
            if (!studentTotals.has(studentId)) {
                studentTotals.set(studentId, {
                    totalMarks: 0,
                    totalPossibleMarks: 0,
                    student: result.student,
                });
            }
            const totals = studentTotals.get(studentId);
            if (result.marks !== null && result.totalMarks !== null) {
                totals.totalMarks += result.marks;
                totals.totalPossibleMarks += result.totalMarks;
            }
        });
        const sortedStudents = Array.from(studentTotals.entries())
            .sort((a, b) => b[1].totalMarks - a[1].totalMarks);
        let currentRank = 1;
        let previousMarks = null;
        for (let i = 0; i < sortedStudents.length; i++) {
            const [studentId, data] = sortedStudents[i];
            if (previousMarks !== null && data.totalMarks < previousMarks) {
                currentRank = i + 1;
            }
            await this.examResultRepository.update({ classRank: currentRank }, {
                where: {
                    studentId,
                    examType,
                    academicYearId: academicYearId || { [sequelize_1.Op.ne]: null },
                },
            });
            previousMarks = data.totalMarks;
        }
    }
    async calculateTotals(resultEntrySessionId, transaction) {
        const session = await this.resultEntrySessionRepository.findByPk(resultEntrySessionId, {
            include: [{ model: exam_result_entity_1.ExamResult, as: 'examResults' }],
            transaction,
        });
        if (!session) {
            throw new common_1.NotFoundException('Result entry session not found');
        }
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
        const allStudentResults = await this.examResultRepository.findAll({
            where: {
                studentId: session.studentId,
                examType: session.examType,
                academicYearId: session.academicYearId,
                status: { [sequelize_1.Op.in]: ['pending', 'approved', 'published'] },
            },
            transaction,
        });
        let totalMarks = 0;
        let totalPossibleMarks = 0;
        allStudentResults.forEach(result => {
            if (result.marks !== null && result.totalMarks !== null) {
                totalMarks += result.marks;
                totalPossibleMarks += result.totalMarks;
            }
        });
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
        await session.update({
            totalMarks: sessionTotalMarks,
            totalPossibleMarks: sessionTotalPossibleMarks,
            totalHajers,
        }, { transaction });
        if (session.examResults) {
            for (const result of session.examResults) {
                await result.update({
                    totalMarksCalculated: totalMarks,
                    totalPossibleMarks,
                    totalHajers,
                }, { transaction });
            }
        }
        for (const result of allStudentResults) {
            await result.update({
                totalMarksCalculated: totalMarks,
                totalPossibleMarks,
                totalHajers,
            }, { transaction });
        }
        const student = await this.studentRepository.findByPk(session.studentId, { transaction });
        if (student?.classDivisionId) {
            await this.calculateRank(session.examType, student.classDivisionId, session.academicYearId);
        }
    }
    async getPublishedResults(pageOptionsDto, userId, userRole) {
        const whereClause = {
            status: 'published',
        };
        if (pageOptionsDto.studentId) {
            whereClause.studentId = pageOptionsDto.studentId;
        }
        if (pageOptionsDto.academicYearId) {
            whereClause.academicYearId = pageOptionsDto.academicYearId;
        }
        const studentInclude = {
            model: student_entity_1.Student,
        };
        if ((userRole === user_entity_1.UserRole.PARENT || userRole === 'parent') && userId) {
            const parent = await this.parentRepository.findOne({
                where: { userId },
            });
            if (parent) {
                studentInclude.where = {
                    parentId: parent.id,
                };
                studentInclude.required = true;
            }
            else {
                studentInclude.where = {
                    parentId: { [sequelize_1.Op.in]: [] },
                };
                studentInclude.required = true;
            }
        }
        const { rows, count } = await this.examResultRepository.findAndCountAll({
            where: whereClause,
            include: [
                studentInclude,
                { model: ustad_entity_1.Ustad, as: 'markedBy' },
                academic_year_entity_1.AcademicYear,
            ],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['examDate', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Published results retrieved successfully', pageMetaDto);
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXAM_RESULT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __param(2, (0, common_1.Inject)('RESULT_ENTRY_SESSION_REPOSITORY')),
    __param(3, (0, common_1.Inject)('ATTENDANCE_REPOSITORY')),
    __param(4, (0, common_1.Inject)('STUDENT_REPOSITORY')),
    __param(5, (0, common_1.Inject)('PARENT_REPOSITORY')),
    __param(8, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, ustads_service_1.UstadsService,
        attendance_service_1.AttendanceService, Object])
], ResultsService);
//# sourceMappingURL=results.service.js.map