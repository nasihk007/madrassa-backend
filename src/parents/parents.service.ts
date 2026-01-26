import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Parent } from '../entities/parent.entity';
import { Student } from '../entities/student.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Ustad } from '../entities/ustad.entity';
import { User, UserRole } from '../entities/user.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';

const STUDENT_WITH_ASSOCIATIONS = {
  model: Student,
  as: 'students',
  include: [
    {
      model: ClassDivision,
      as: 'classDivision',
      include: [{ model: Ustad, as: 'assignedUstad' }],
    },
    { model: AcademicYear, as: 'academicYear' },
  ],
};

@Injectable()
export class ParentsService {
  constructor(
    @Inject('PARENT_REPOSITORY')
    private readonly parentRepository: typeof Parent,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async getAllParents(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto> {
    let whereClause: any = {};

    // If no query provided, simple paginated fetch with includes
    if (!pageOptionsDto.query) {
    const { count, rows } = await this.parentRepository.findAndCountAll({
      where: whereClause,
      include: [STUDENT_WITH_ASSOCIATIONS, { model: User }],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order || 'DESC']],
    });

    const decoratedParents = await Promise.all(
      rows.map((parent) => this.decorateParent(parent)),
    );

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(
      decoratedParents,
      true,
      'Parents retrieved successfully',
      pageMetaDto,
    );
    }

    // When query is provided, we want to search by:
    // - Parent fields (name, email, phone)
    // - Student name (via association), without relying on dialect‑specific `$students.name$` paths

    const query = pageOptionsDto.query;

    // 1) Parents that match by their own fields
    const parentsBySelf = await this.parentRepository.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
          { phone: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: ['id'],
    });

    // 2) Parents that have at least one student whose name matches
    const parentsByStudent = await this.parentRepository.findAll({
      include: [
        {
          ...STUDENT_WITH_ASSOCIATIONS,
          required: true,
          where: {
            name: { [Op.iLike]: `%${query}%` },
          },
        },
      ],
      attributes: ['id'],
    });

    const parentIdsSet = new Set<string>();
    parentsBySelf.forEach((p) => parentIdsSet.add(p.id));
    parentsByStudent.forEach((p) => parentIdsSet.add(p.id));

    const parentIds = Array.from(parentIdsSet);

    // If nothing matches, return an empty, well‑formed paginated response
    if (parentIds.length === 0) {
      const emptyMeta = new PageMetaDto({
        pageOptionsDto,
        itemCount: 0,
      });
      return new CommonDataResponseDto(
        [],
        true,
        'Parents retrieved successfully',
        emptyMeta,
      );
    }

    whereClause = {
      id: { [Op.in]: parentIds },
    };

    const { count, rows } = await this.parentRepository.findAndCountAll({
      where: whereClause,
      include: [STUDENT_WITH_ASSOCIATIONS, { model: User }],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order || 'DESC']],
    });

    const decoratedParents = await Promise.all(rows.map((parent) => this.decorateParent(parent)));

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(decoratedParents, true, 'Parents retrieved successfully', pageMetaDto);
  }

  async getParentById(parentId: string): Promise<Parent> {
    const parent = await this.parentRepository.findOne({
      where: { id: parentId },
      include: [STUDENT_WITH_ASSOCIATIONS, { model: User }],
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    return this.decorateParent(parent);
  }

  async getParentByUserId(userId: string): Promise<Parent> {
    const parent = await this.parentRepository.findOne({
      where: { userId },
      include: [STUDENT_WITH_ASSOCIATIONS, { model: User }],
    });

    if (!parent) {
      throw new NotFoundException('Parent not found for current user');
    }

    return this.decorateParent(parent);
  }

  async createParent(createParentDto: CreateParentDto): Promise<Parent> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createParentDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createParentDto.password, 10);

    const user = await this.userRepository.create({
      name: createParentDto.name,
      email: createParentDto.email,
      password: hashedPassword,
      role: UserRole.PARENT,
    });

    const parent = await this.parentRepository.create({
      name: createParentDto.name,
      email: createParentDto.email,
      phone: createParentDto.phone,
      address: createParentDto.address,
      userId: user.id,
    });

    return this.getParentById(parent.id);
  }

  async getStudentsForParentUser(userId: string): Promise<Student[]> {
    const parent = await this.getParentByUserId(userId);
    return parent.students || [];
  }

  async getStudentsByParentId(parentId: string): Promise<Student[]> {
    const parent = await this.getParentById(parentId);
    return parent.students || [];
  }

  async updateParent(id: string, updateParentDto: UpdateParentDto): Promise<Parent> {
    const parent = await this.parentRepository.findOne({
      where: { id },
      include: [{ model: User }],
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    if (updateParentDto.email && updateParentDto.email !== parent.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateParentDto.email },
      });

      if (existingUser && existingUser.id !== parent.userId) {
        throw new BadRequestException('A user with this email already exists');
      }
    }

    if (updateParentDto.name || updateParentDto.email || updateParentDto.password) {
      const updates: Partial<User> = {};
      if (updateParentDto.name) {
        updates.name = updateParentDto.name;
      }
      if (updateParentDto.email) {
        updates.email = updateParentDto.email;
      }
      if (updateParentDto.password) {
        updates.password = await bcrypt.hash(updateParentDto.password, 10);
      }
      await parent.user.update(updates);
    }

    await parent.update({
      name: updateParentDto.name ?? parent.name,
      email: updateParentDto.email ?? parent.email,
      phone: updateParentDto.phone ?? parent.phone,
      address: updateParentDto.address ?? parent.address,
    });

    return this.getParentById(parent.id);
  }

  async deleteParent(id: string): Promise<void> {
    const parent = await this.parentRepository.findOne({
      where: { id },
      include: [{ model: Student, as: 'students' }],
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    if (parent.students && parent.students.length > 0) {
      throw new BadRequestException('Cannot delete parent with linked students. Reassign or remove students first.');
    }

    const userId = parent.userId;
    await parent.destroy();

    if (userId) {
      await this.userRepository.destroy({ where: { id: userId } });
    }
  }

  async setActiveStudentForUser(userId: string, studentId: string): Promise<Parent> {
    const parent = await this.getParentByUserId(userId);
    await this.setActiveStudent(parent, studentId);
    return this.getParentByUserId(userId);
  }

  async setActiveStudentForParent(parentId: string, studentId: string): Promise<Parent> {
    const parent = await this.getParentById(parentId);
    await this.setActiveStudent(parent, studentId);
    return this.getParentById(parentId);
  }

  async updatePhoneByUserId(userId: string, phone: string): Promise<Parent> {
    const parent = await this.getParentByUserId(userId);
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    await parent.update({ phone });
    return parent;
  }

  private async setActiveStudent(parent: Parent, studentId: string): Promise<void> {
    if (!parent.students || parent.students.length === 0) {
      throw new BadRequestException('Parent has no students');
    }

    const student = parent.students.find((s) => s.id === studentId);

    if (!student) {
      throw new BadRequestException('Student does not belong to this parent');
    }

    if (parent.activeStudentId !== studentId) {
      await parent.update({ activeStudentId: studentId });
      parent.activeStudentId = studentId;
    }
  }

  private async decorateParent(parent: Parent): Promise<Parent> {
    if (!parent) {
      return parent;
    }

    if (parent.students && parent.students.length > 0) {
      if (!parent.activeStudentId) {
        const firstStudentId = parent.students[0].id;
        await parent.update({ activeStudentId: firstStudentId });
        parent.activeStudentId = firstStudentId;
      }
    }

    this.attachLegacyFields(parent);
    return parent;
  }

  private attachLegacyFields(parent: Parent) {
    if (!parent) return;

    (parent.students || []).forEach((student) => {
      student.setDataValue('userId', parent.userId);
      student.setDataValue('guardianName', parent.name);
      student.setDataValue('guardianPhone', parent.phone);
      student.setDataValue('isActive', parent.activeStudentId === student.id);
    });
  }
}

