import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Ustad } from '../entities/ustad.entity';
import { User, UserRole } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { CreateUstadDto } from './dto/create-ustad.dto';
import { UpdateUstadDto } from './dto/update-ustad.dto';

@Injectable()
export class UstadsService {
  constructor(
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('CLASS_DIVISION_REPOSITORY')
    private classDivisionRepository: typeof ClassDivision,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    // Add search functionality - search by ustad name only (case-insensitive)
    if (pageOptionsDto.query) {
      whereClause['$user.name$'] = { [Op.iLike]: `%${pageOptionsDto.query}%` };
    }

    const { rows, count } = await this.ustadRepository.findAndCountAll({
      where: whereClause,
      include: [
        User,
        {
          model: ClassDivision,
          as: 'assignedClasses',
        },
      ],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Ustads retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<Ustad> {
    const ustad = await this.ustadRepository.findOne({
      where: { id },
      include: [
        User,
        {
          model: ClassDivision,
          as: 'assignedClasses',
        },
      ],
    });

    if (!ustad) {
      throw new NotFoundException(`Ustad with ID ${id} not found`);
    }

    return ustad;
  }

  async create(createUstadDto: CreateUstadDto): Promise<Ustad> {
    let savedUser: User;

    // If userId is provided, link to existing user; otherwise create new user
    if (createUstadDto.userId) {
      // Link to existing user
      savedUser = await this.userRepository.findByPk(createUstadDto.userId);
      if (!savedUser) {
        throw new NotFoundException(`User with ID ${createUstadDto.userId} not found`);
      }

      // Check if user already has an ustad profile
      const existingUstad = await this.ustadRepository.findOne({
        where: { userId: createUstadDto.userId },
      });
      if (existingUstad) {
        throw new BadRequestException(`User with ID ${createUstadDto.userId} already has an ustad profile`);
      }
    } else {
      // Create new user account
      if (!createUstadDto.password) {
        throw new BadRequestException('Password is required when creating a new user');
      }
      if (!createUstadDto.name || !createUstadDto.email) {
        throw new BadRequestException('Name and email are required when creating a new user');
      }

      // Check for duplicate email before hitting the DB unique constraint
      const existingUser = await this.userRepository.findOne({
        where: { email: createUstadDto.email },
      });
      if (existingUser) {
        throw new BadRequestException(`A user with email "${createUstadDto.email}" already exists`);
      }

      const hashedPassword = await bcrypt.hash(createUstadDto.password, 10);
      savedUser = await this.userRepository.create({
        name: createUstadDto.name,
        email: createUstadDto.email,
        password: hashedPassword,
        role: UserRole.USTAD,
      });
    }

    // Create ustad record (exclude password and assignedClasses from direct creation)
    const { password, assignedClasses, userId, ...ustadData } = createUstadDto;
    const ustad = await this.ustadRepository.create({
      ...ustadData,
      name: savedUser.name,
      email: savedUser.email,
      userId: savedUser.id,
      joiningDate: new Date(createUstadDto.joiningDate),
    });

    // Handle assigned classes if provided - update each class to assign this ustad
    if (assignedClasses && assignedClasses.length > 0) {
      // Check if any of the classes already have a different ustad assigned
      const classesToAssign = await this.classDivisionRepository.findAll({
        where: { id: assignedClasses },
        include: [
          {
            model: Ustad,
            as: 'assignedUstad',
            attributes: ['id', 'name'],
          },
        ],
      });

      // Find classes that already have a ustad assigned
      const conflictingClasses = classesToAssign.filter(
        (cls) => cls.ustadId !== null
      );

      if (conflictingClasses.length > 0) {
        const conflictMessages = conflictingClasses.map(
          (cls) => `${cls.assignedUstad?.name || 'an ustad'} is already assigned to ${cls.className} ${cls.division}`
        );
        throw new BadRequestException(
          conflictMessages.length === 1 
            ? conflictMessages[0]
            : `Cannot assign ustad to these classes: ${conflictMessages.join(', ')}`
        );
      }

      await this.classDivisionRepository.update(
        { ustadId: ustad.id },
        { where: { id: assignedClasses } }
      );
    }

    return ustad;
  }

  async update(id: string, updateUstadDto: UpdateUstadDto): Promise<Ustad> {
    const ustad = await this.findOne(id);
    const { assignedClasses, ...updateData } = updateUstadDto;
    
    const updatePayload: any = { ...updateData };
    if (updateData.joiningDate) {
      updatePayload.joiningDate = new Date(updateData.joiningDate);
    }
    
    await ustad.update(updatePayload);

    // Handle assigned classes if provided
    if (assignedClasses !== undefined) {
      // Check if any of the new classes already have a different ustad assigned
      const classesToAssign = await this.classDivisionRepository.findAll({
        where: { id: assignedClasses },
        include: [
          {
            model: Ustad,
            as: 'assignedUstad',
            attributes: ['id', 'name'],
          },
        ],
      });

      // Find classes that already have a different ustad
      const conflictingClasses = classesToAssign.filter(
        (cls) => cls.ustadId && cls.ustadId !== ustad.id
      );

      if (conflictingClasses.length > 0) {
        const conflictMessages = conflictingClasses.map(
          (cls) => `${cls.assignedUstad?.name || 'an ustad'} is already assigned to ${cls.className} ${cls.division}`
        );
        throw new BadRequestException(
          conflictMessages.length === 1 
            ? conflictMessages[0]
            : `Cannot assign ustad to these classes: ${conflictMessages.join(', ')}`
        );
      }

      // Get current classes assigned to this ustad
      const currentClasses = await this.classDivisionRepository.findAll({
        where: { ustadId: ustad.id }
      });
      
      // Remove ustad from current classes that are not in the new list
      const classesToRemove = currentClasses.filter(
        (currentClass) => !assignedClasses.includes(currentClass.id)
      );
      
      if (classesToRemove.length > 0) {
        await this.classDivisionRepository.update(
          { ustadId: null },
          { where: { id: classesToRemove.map(c => c.id) } }
        );
      }

      // Assign this ustad to new classes
      if (assignedClasses.length > 0) {
        await this.classDivisionRepository.update(
          { ustadId: ustad.id },
          { where: { id: assignedClasses } }
        );
      }
    }

    return ustad;
  }

  async remove(id: string): Promise<void> {
    const ustad = await this.findOne(id);

    if (ustad.user) {
      await ustad.user.destroy();
    }

    await ustad.destroy();
  }

  /**
   * Get assigned class division IDs for a user (ustad or admin with ustad profile)
   * @param userId - The user ID
   * @returns Array of class division IDs
   */
  async getAssignedClassIds(userId: string): Promise<string[]> {
    const ustad = await this.ustadRepository.findOne({
      where: { userId },
    });

    if (!ustad) {
      return [];
    }

    const classes = await this.classDivisionRepository.findAll({
      where: { ustadId: ustad.id },
    });

    return classes.map((classDiv) => classDiv.id);
  }

  /**
   * Check if a user has an ustad profile
   * @param userId - The user ID
   * @returns true if user has an ustad profile, false otherwise
   */
  async hasUstadProfile(userId: string): Promise<boolean> {
    const ustad = await this.ustadRepository.findOne({
      where: { userId },
    });
    return !!ustad;
  }

  /**
   * Get ustad profile by user ID
   * @param userId - The user ID
   * @returns Ustad profile or null
   */
  async getUstadByUserId(userId: string): Promise<Ustad | null> {
    return await this.ustadRepository.findOne({
      where: { userId },
      include: [
        User,
        {
          model: ClassDivision,
          as: 'assignedClasses',
        },
      ],
    });
  }

  /**
   * Update ustad phone number by user ID
   * @param userId - The user ID
   * @param phone - The new phone number
   * @returns Updated ustad profile
   */
  async updatePhoneByUserId(userId: string, phone: string): Promise<Ustad> {
    const ustad = await this.getUstadByUserId(userId);
    if (!ustad) {
      throw new NotFoundException('Ustad not found');
    }
    await ustad.update({ phone });
    return ustad;
  }
}

