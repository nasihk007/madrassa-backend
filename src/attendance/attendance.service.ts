import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Attendance } from '../entities/attendance.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UserRole } from '../entities/user.entity';
import { UstadsService } from '../ustads/ustads.service';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject('ATTENDANCE_REPOSITORY')
    private attendanceRepository: typeof Attendance,
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: typeof Student,
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
    @Inject('ACADEMIC_YEAR_REPOSITORY')
    private academicYearRepository: typeof AcademicYear,
    private ustadsService: UstadsService,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    if (pageOptionsDto.query) {
      whereClause[Op.or] = [
        { status: { [Op.like]: `%${pageOptionsDto.query}%` } },
      ];
    }

    if (pageOptionsDto.date) {
      whereClause.date = new Date(pageOptionsDto.date);
    }

    if (pageOptionsDto.studentId) {
      whereClause.studentId = pageOptionsDto.studentId;
    }

    if (pageOptionsDto.academicYearId) {
      whereClause.academicYearId = pageOptionsDto.academicYearId;
    }

    // Filter by ustad's assigned classes if user is an ustad
    let studentInclude: any = {
      model: Student,
    };
    
    if (userRole === UserRole.USTAD && userId) {
      const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
      if (assignedClassIds.length > 0) {
        studentInclude.where = {
          classDivisionId: { [Op.in]: assignedClassIds },
        };
        studentInclude.required = true;
      } else {
        // If ustad has no assigned classes, return empty result
        studentInclude.where = {
          classDivisionId: { [Op.in]: [] },
        };
        studentInclude.required = true;
      }
    }

    const { rows, count } = await this.attendanceRepository.findAndCountAll({
      where: whereClause,
      include: [
        studentInclude,
        { model: Ustad, as: 'markedBy' },
        AcademicYear
      ],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['date', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Attendance records retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }

    return attendance;
  }

  async findByStudent(studentId: string): Promise<Attendance[]> {
    return this.attendanceRepository.findAll({
      where: { studentId },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });
  }

  async findByDate(date: string): Promise<Attendance[]> {
    return this.attendanceRepository.findAll({
      where: { date: new Date(date) },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });
  }

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    let markedById = createAttendanceDto.markedById;
    
    // If markedByUserId is provided, find the corresponding ustad ID
    if (createAttendanceDto.markedByUserId && !markedById) {
      const ustad = await this.ustadRepository.findOne({
        where: { userId: createAttendanceDto.markedByUserId }
      });
      if (ustad) {
        markedById = ustad.id;
      }
    }

    const attendanceData = {
      ...createAttendanceDto,
      date: new Date(createAttendanceDto.date),
      markedById,
      // Remove markedByUserId from the data as it's not a field in the entity
      markedByUserId: undefined,
    };
    
    // Remove undefined values
    const cleanAttendanceData = Object.fromEntries(
      Object.entries(attendanceData).filter(([_, value]) => value !== undefined)
    );
    
    const attendance = await this.attendanceRepository.create(cleanAttendanceData);
    return attendance;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.findOne(id);
    const updateData: any = { ...updateAttendanceDto };
    
    if (updateAttendanceDto.date) {
      updateData.date = new Date(updateAttendanceDto.date);
    }
    
    // Remove markedByUserId from update data as it's not a field in the entity
    delete updateData.markedByUserId;
    
    await attendance.update(updateData);
    return attendance;
  }

  async remove(id: string): Promise<void> {
    const attendance = await this.findOne(id);
    await attendance.destroy();
  }
}

