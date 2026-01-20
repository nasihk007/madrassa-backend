import { ResultsService } from './results.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
export declare class ResultsController {
    private readonly resultsService;
    constructor(resultsService: ResultsService);
    findAll(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findByStudent(studentId: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createResultDto: CreateExamResultDto): Promise<CommonDataResponseDto>;
    update(id: string, updateResultDto: UpdateExamResultDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
