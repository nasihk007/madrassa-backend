import { ResultsService } from './results.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { CreateBulkResultEntryDto } from './dto/create-bulk-result-entry.dto';
import { ApproveResultsDto } from './dto/approve-results.dto';
import { PublishResultsDto } from './dto/publish-results.dto';
export declare class ResultsController {
    private readonly resultsService;
    constructor(resultsService: ResultsService);
    findAll(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findByStudent(studentId: string, req: any): Promise<CommonDataResponseDto>;
    getPendingResults(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    getPublishedResults(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    getByClass(classDivisionId: string, pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    getRank(classDivisionId: string, examType: string, academicYearId?: string): Promise<CommonDataResponseDto>;
    getProgressCard(studentId: string, examType?: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createResultDto: CreateExamResultDto): Promise<CommonDataResponseDto>;
    update(id: string, updateResultDto: UpdateExamResultDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
    createBulkEntry(createBulkEntryDto: CreateBulkResultEntryDto, req: any): Promise<CommonDataResponseDto>;
    approveResults(approveResultsDto: ApproveResultsDto, req: any): Promise<CommonDataResponseDto>;
    publishResults(publishResultsDto: PublishResultsDto, req: any): Promise<CommonDataResponseDto>;
}
