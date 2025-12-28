import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { ExamResult } from '../entities/exam-result.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @Inject('EXAM_RESULT_REPOSITORY')
    private examResultRepository: typeof ExamResult,
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    if (pageOptionsDto.query) {
      whereClause[Op.or] = [
        { examType: { [Op.like]: `%${pageOptionsDto.query}%` } },
        { subjectName: { [Op.like]: `%${pageOptionsDto.query}%` } },
      ];
    }

    if (pageOptionsDto.studentId) {
      whereClause.studentId = pageOptionsDto.studentId;
    }

    if (pageOptionsDto.academicYearId) {
      whereClause.academicYearId = pageOptionsDto.academicYearId;
    }

    const { rows, count } = await this.examResultRepository.findAndCountAll({
      where: whereClause,
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['examDate', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Exam results retrieved successfully', pageMetaDto);
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

  async findByStudent(studentId: string): Promise<ExamResult[]> {
    return this.examResultRepository.findAll({
      where: { studentId },
      include: [Student, { model: Ustad, as: 'markedBy' }, AcademicYear],
    });
  }

  async create(createResultDto: CreateExamResultDto): Promise<ExamResult> {
    let markedById = createResultDto.markedById;
    
    // If markedByUserId is provided, find the corresponding ustad ID
    if (createResultDto.markedByUserId && !markedById) {
      const ustad = await this.ustadRepository.findOne({
        where: { userId: createResultDto.markedByUserId }
      });
      if (ustad) {
        markedById = ustad.id;
      }
    }

    const resultData = {
      ...createResultDto,
      examDate: new Date(createResultDto.examDate),
      markedById,
      // Remove markedByUserId from the data as it's not a field in the entity
      markedByUserId: undefined,
    };
    
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
    
    // Remove markedByUserId from update data as it's not a field in the entity
    delete updateData.markedByUserId;
    
    await result.update(updateData);
    return result;
  }

  async remove(id: string): Promise<void> {
    const result = await this.findOne(id);
    await result.destroy();
  }
}

