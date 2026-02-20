import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { Op } from 'sequelize';
import { ClassDivision } from '../entities/class-division.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { Parent } from '../entities/parent.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { UserRole } from '../entities/user.entity';
import { UstadsService } from '../ustads/ustads.service';

@Injectable()
export class ClassesService {
  constructor(
    @Inject('CLASS_DIVISION_REPOSITORY')
    private classDivisionRepository: typeof ClassDivision,
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
    private ustadsService: UstadsService,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string, filterByAssigned: boolean = false): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    if (pageOptionsDto.query) {
      whereClause[Op.or] = [
        { className: { [Op.like]: `%${pageOptionsDto.query}%` } },
        { division: { [Op.like]: `%${pageOptionsDto.query}%` } },
      ];
    }

    // Filter by assigned classes if:
    // 1. User is an ustad (always filter)
    // 2. User is an admin AND filterByAssigned is true (for my-classes endpoint)
    if (userId && (userRole === UserRole.USTAD || (userRole === UserRole.ADMIN && filterByAssigned))) {
      const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
      if (assignedClassIds.length > 0) {
        whereClause.id = { [Op.in]: assignedClassIds };
      } else {
        // If user has no assigned classes, return empty result
        whereClause.id = { [Op.in]: [] };
      }
    }
    // Admin users without filterByAssigned flag: no filtering - show all classes

    const { rows, count } = await this.classDivisionRepository.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Student,
          include: [
            {
              model: Parent,
              attributes: ['id', 'name', 'phone', 'email'],
            },
          ],
        },
        {
          model: Ustad,
          as: 'assignedUstad',
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

    return new CommonDataResponseDto(rows, true, 'Classes retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<ClassDivision> {
    const classDivision = await this.classDivisionRepository.findOne({
      where: { id },
      include: [
        {
          model: Student,
          include: [
            {
              model: Parent,
              attributes: ['id', 'name', 'phone', 'email'],
            },
          ],
        },
        {
          model: Ustad,
          as: 'assignedUstad',
        },
      ],
    });

    if (!classDivision) {
      throw new NotFoundException(`Class division with ID ${id} not found`);
    }

    return classDivision;
  }

  async create(createClassDto: any): Promise<ClassDivision> {
    // Normalize empty string UUID fields to null
    if (!createClassDto.ustadId) {
      createClassDto.ustadId = null;
    }

    // Validate ustad if provided
    if (createClassDto.ustadId) {
      const ustad = await this.ustadRepository.findByPk(createClassDto.ustadId);
      if (!ustad) {
        throw new NotFoundException(`Ustad with ID ${createClassDto.ustadId} not found`);
      }
    }

    const classDivision = await this.classDivisionRepository.create(createClassDto);
    return classDivision;
  }

  async update(id: string, updateClassDto: any): Promise<ClassDivision> {
    const classDivision = await this.findOne(id);

    // Validate ustad if provided
    if (updateClassDto.ustadId !== undefined) {
      if (updateClassDto.ustadId) {
        // Check if class already has a different ustad assigned
        if (classDivision.ustadId && classDivision.ustadId !== updateClassDto.ustadId) {
          const existingUstad = await this.ustadRepository.findByPk(classDivision.ustadId, {
            attributes: ['name'],
          });
          const existingUstadName = existingUstad?.name || 'an ustad';
          throw new BadRequestException(
            `${existingUstadName} is already assigned to ${classDivision.className} ${classDivision.division}`
          );
        }

        const ustad = await this.ustadRepository.findByPk(updateClassDto.ustadId);
        if (!ustad) {
          throw new NotFoundException(`Ustad with ID ${updateClassDto.ustadId} not found`);
        }
      }
      // If ustadId is null, it means removing the ustad assignment
    }

    await classDivision.update(updateClassDto);
    return classDivision;
  }

  async remove(id: string): Promise<void> {
    const classDivision = await this.findOne(id);
    await classDivision.destroy();
  }
}

