import { ExamResult } from '../entities/exam-result.entity';
import { Ustad } from '../entities/ustad.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { UstadsService } from '../ustads/ustads.service';
export declare class ResultsService {
    private examResultRepository;
    private ustadRepository;
    private ustadsService;
    constructor(examResultRepository: typeof ExamResult, ustadRepository: typeof Ustad, ustadsService: UstadsService);
    findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<ExamResult>;
    findByStudent(studentId: string): Promise<ExamResult[]>;
    create(createResultDto: CreateExamResultDto): Promise<ExamResult>;
    update(id: string, updateResultDto: UpdateExamResultDto): Promise<ExamResult>;
    remove(id: string): Promise<void>;
}
