import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Prayer } from '../entities/prayer.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { UserRole } from '../entities/user.entity';
import { UstadsService } from '../ustads/ustads.service';

@Injectable()
export class PrayerService {
  constructor(
    @Inject('PRAYER_REPOSITORY')
    private prayerRepository: typeof Prayer,
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
    private ustadsService: UstadsService,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    if (pageOptionsDto.query) {
      whereClause[Op.or] = [
        { prayerName: { [Op.like]: `%${pageOptionsDto.query}%` } },
        { status: { [Op.like]: `%${pageOptionsDto.query}%` } },
      ];
    }

    if (pageOptionsDto.date) {
      // Normalize date string (YYYY-MM-DD) to Date object for comparison
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

    const { rows, count } = await this.prayerRepository.findAndCountAll({
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

    return new CommonDataResponseDto(rows, true, 'Prayer records retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<Prayer> {
    const prayer = await this.prayerRepository.findOne({
      where: { id },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });

    if (!prayer) {
      throw new NotFoundException(`Prayer record with ID ${id} not found`);
    }

    return prayer;
  }

  async findByStudent(studentId: string): Promise<Prayer[]> {
    return this.prayerRepository.findAll({
      where: { studentId },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });
  }

  async create(createPrayerDto: CreatePrayerDto): Promise<Prayer> {
    let markedById = createPrayerDto.markedById;
    
    // If markedByUserId is provided, find the corresponding ustad ID
    if (createPrayerDto.markedByUserId && !markedById) {
      const ustad = await this.ustadRepository.findOne({
        where: { userId: createPrayerDto.markedByUserId }
      });
      if (ustad) {
        markedById = ustad.id;
      }
    }

    const prayerData = {
      ...createPrayerDto,
      date: new Date(createPrayerDto.date),
      markedById,
      // Remove markedByUserId from the data as it's not a field in the entity
      markedByUserId: undefined,
    };
    
    // Remove undefined values
    const cleanPrayerData = Object.fromEntries(
      Object.entries(prayerData).filter(([_, value]) => value !== undefined)
    );
    
    const prayer = await this.prayerRepository.create(cleanPrayerData);
    return prayer;
  }

  async update(id: string, updatePrayerDto: UpdatePrayerDto): Promise<Prayer> {
    const prayer = await this.findOne(id);
    const updateData: any = { ...updatePrayerDto };
    
    if (updatePrayerDto.date) {
      updateData.date = new Date(updatePrayerDto.date);
    }
    
    // Remove markedByUserId from update data as it's not a field in the entity
    delete updateData.markedByUserId;
    
    await prayer.update(updateData);
    return prayer;
  }

  async remove(id: string): Promise<void> {
    const prayer = await this.findOne(id);
    await prayer.destroy();
  }
}

