import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { AcademicYear } from '../entities/academic-year.entity';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';

@Injectable()
export class AcademicYearsService {
  constructor(
    @Inject('ACADEMIC_YEAR_REPOSITORY')
    private academicYearRepository: typeof AcademicYear,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    if (pageOptionsDto.query) {
      whereClause[Op.or] = [
        { year: { [Op.like]: `%${pageOptionsDto.query}%` } },
      ];
    }

    const { rows, count } = await this.academicYearRepository.findAndCountAll({
      where: whereClause,
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Academic years retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<AcademicYear> {
    const academicYear = await this.academicYearRepository.findOne({
      where: { id },
    });

    if (!academicYear) {
      throw new NotFoundException(`Academic year with ID ${id} not found`);
    }

    return academicYear;
  }

  async findActive(): Promise<AcademicYear | null> {
    return this.academicYearRepository.findOne({
      where: { isActive: true },
    });
  }

  async create(createAcademicYearDto: CreateAcademicYearDto): Promise<AcademicYear> {
    const academicYear = await this.academicYearRepository.create({
      ...createAcademicYearDto,
      startDate: new Date(createAcademicYearDto.startDate),
      endDate: new Date(createAcademicYearDto.endDate),
    });
    return academicYear;
  }

  async update(id: string, updateAcademicYearDto: UpdateAcademicYearDto): Promise<AcademicYear> {
    const academicYear = await this.findOne(id);
    const updateData: any = { ...updateAcademicYearDto };
    if (updateAcademicYearDto.startDate) {
      updateData.startDate = new Date(updateAcademicYearDto.startDate);
    }
    if (updateAcademicYearDto.endDate) {
      updateData.endDate = new Date(updateAcademicYearDto.endDate);
    }
    await academicYear.update(updateData);
    return academicYear;
  }

  async remove(id: string): Promise<void> {
    const academicYear = await this.findOne(id);
    await academicYear.destroy();
  }
}
