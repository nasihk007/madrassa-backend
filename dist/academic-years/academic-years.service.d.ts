import { AcademicYear } from '../entities/academic-year.entity';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
export declare class AcademicYearsService {
    private academicYearRepository;
    constructor(academicYearRepository: typeof AcademicYear);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<AcademicYear>;
    findActive(): Promise<AcademicYear | null>;
    create(createAcademicYearDto: CreateAcademicYearDto): Promise<AcademicYear>;
    update(id: string, updateAcademicYearDto: UpdateAcademicYearDto): Promise<AcademicYear>;
    remove(id: string): Promise<void>;
}
