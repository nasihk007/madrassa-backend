import { AcademicYearsService } from './academic-years.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
export declare class AcademicYearsController {
    private readonly academicYearsService;
    constructor(academicYearsService: AcademicYearsService);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findActive(): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createAcademicYearDto: CreateAcademicYearDto): Promise<CommonDataResponseDto>;
    update(id: string, updateAcademicYearDto: UpdateAcademicYearDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
