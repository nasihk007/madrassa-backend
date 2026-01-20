import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Student } from '../entities/student.entity';
import { User, UserRole } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { Parent } from '../entities/parent.entity';
import { UstadsService } from '../ustads/ustads.service';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: typeof Student,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('CLASS_DIVISION_REPOSITORY')
    private classDivisionRepository: typeof ClassDivision,
    @Inject('ACADEMIC_YEAR_REPOSITORY')
    private academicYearRepository: typeof AcademicYear,
    @Inject('PARENT_REPOSITORY')
    private parentRepository: typeof Parent,
    private ustadsService: UstadsService,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto> {
    const where: any = {};

    // Add search functionality - search by student name and rollNumber (case-insensitive)
    if (pageOptionsDto.query) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${pageOptionsDto.query}%` } },
        { rollNumber: { [Op.iLike]: `%${pageOptionsDto.query}%` } },
      ];
    }

    // Add filters
    if (pageOptionsDto.classDivisionId) {
      where.classDivisionId = pageOptionsDto.classDivisionId;
    }

    if (pageOptionsDto.academicYearId) {
      where.academicYearId = pageOptionsDto.academicYearId;
    }

    if (pageOptionsDto.studentId) {
      where.id = pageOptionsDto.studentId;
    }

    // Filter by ustad's assigned classes if user is an ustad
    // Note: Admin users always see all students (no filtering) for Students module and Student Analytics
    // Only ustads are filtered by their assigned classes
    if (userRole === UserRole.USTAD && userId) {
      const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
      if (assignedClassIds.length > 0) {
        where.classDivisionId = { [Op.in]: assignedClassIds };
      } else {
        // If ustad has no assigned classes, return empty result
        where.classDivisionId = { [Op.in]: [] };
      }
    }
    // Admin users: no filtering - show all students

    const { count, rows } = await this.studentRepository.findAndCountAll({
      where,
      include: [Parent, ClassDivision, AcademicYear],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order || 'ASC']],
    });

    rows.forEach((student) => this.attachLegacyFields(student));

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Students retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      include: [Parent, ClassDivision, AcademicYear],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    this.attachLegacyFields(student);

    return student;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Check if class division exists
    const classDivision = await this.classDivisionRepository.findOne({
      where: { id: createStudentDto.classDivisionId },
    });

    if (!classDivision) {
      throw new NotFoundException('Class division not found');
    }

    // Check if academic year exists
    const academicYear = await this.academicYearRepository.findOne({
      where: { id: createStudentDto.academicYearId },
    });

    if (!academicYear) {
      throw new NotFoundException('Academic year not found');
    }

    const parentName = createStudentDto.parentName ?? createStudentDto.guardianName;
    const parentPhone = createStudentDto.parentPhone ?? createStudentDto.guardianPhone;
    let parentId = createStudentDto.parentId;

    if (parentId) {
      const parent = await this.parentRepository.findOne({ where: { id: parentId } });
      if (!parent) {
        throw new NotFoundException('Parent not found');
      }
    } else {
      if (!parentName || !createStudentDto.parentEmail || !createStudentDto.parentPassword) {
        throw new BadRequestException('Parent details are required to create a new parent account');
      }

      const existingParent = await this.parentRepository.findOne({
        where: { email: createStudentDto.parentEmail },
      });

      if (existingParent) {
        throw new BadRequestException('Parent with this email already exists. Please select the existing parent.');
      }

      const existingUser = await this.userRepository.findOne({
        where: { email: createStudentDto.parentEmail },
      });

      if (existingUser) {
        throw new BadRequestException('User with this email already exists. Please select the existing parent.');
      }

      const hashedParentPassword = await bcrypt.hash(createStudentDto.parentPassword, 10);
      const parentUser = await this.userRepository.create({
        name: parentName,
        email: createStudentDto.parentEmail,
        password: hashedParentPassword,
        role: UserRole.PARENT,
      });

      const parent = await this.parentRepository.create({
        name: parentName,
        email: createStudentDto.parentEmail,
        phone: parentPhone,
        address: createStudentDto.parentAddress,
        userId: parentUser.id,
      });

      parentId = parent.id;
    }

    const student = await this.studentRepository.create({
      name: createStudentDto.name,
      address: createStudentDto.address,
      rollNumber: createStudentDto.rollNumber,
      admissionDate: new Date(createStudentDto.admissionDate),
      classDivisionId: classDivision.id,
      academicYearId: academicYear.id,
      parentId,
    });

    this.attachLegacyFields(student);

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    if (updateStudentDto.classDivisionId) {
      const classDivision = await this.classDivisionRepository.findOne({
        where: { id: updateStudentDto.classDivisionId },
      });

      if (!classDivision) {
        throw new NotFoundException('Class division not found');
      }
    }

    if (updateStudentDto.academicYearId) {
      const academicYear = await this.academicYearRepository.findOne({
        where: { id: updateStudentDto.academicYearId },
      });

      if (!academicYear) {
        throw new NotFoundException('Academic year not found');
      }
    }

    if (updateStudentDto.parentId) {
      const parent = await this.parentRepository.findOne({
        where: { id: updateStudentDto.parentId },
      });

      if (!parent) {
        throw new NotFoundException('Parent not found');
      }
    }

    // Update student fields
    const updateData: any = {
      name: updateStudentDto.name ?? student.name,
      address: updateStudentDto.address ?? student.address,
      rollNumber: updateStudentDto.rollNumber ?? student.rollNumber,
      classDivisionId: updateStudentDto.classDivisionId ?? student.classDivisionId,
      academicYearId: updateStudentDto.academicYearId ?? student.academicYearId,
    };

    if (updateStudentDto.parentId) {
      updateData.parentId = updateStudentDto.parentId;
    }

    if (updateStudentDto.admissionDate) {
      updateData.admissionDate = new Date(updateStudentDto.admissionDate);
    }
    await student.update(updateData);

    this.attachLegacyFields(student);

    return student;
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await student.destroy();
  }

  private attachLegacyFields(student: Student) {
    if (!student) return;

    const parent = student.parent;
    if (parent) {
      student.setDataValue('userId', parent.userId);
      student.setDataValue('guardianName', parent.name);
      student.setDataValue('guardianPhone', parent.phone);
    } else {
      student.setDataValue('userId', null);
      student.setDataValue('guardianName', null);
      student.setDataValue('guardianPhone', null);
    }
  }
}

