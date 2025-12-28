import { ExamResult } from '../entities/exam-result.entity';
import { Ustad } from '../entities/ustad.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
export declare class ResultsService {
    private examResultRepository;
    private ustadRepository;
    constructor(examResultRepository: typeof ExamResult, ustadRepository: typeof Ustad);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<ExamResult>;
    findByStudent(studentId: string): Promise<ExamResult[]>;
    create(createResultDto: CreateExamResultDto): Promise<ExamResult>;
    update(id: string, updateResultDto: UpdateExamResultDto): Promise<ExamResult>;
    remove(id: string): Promise<void>;
}
