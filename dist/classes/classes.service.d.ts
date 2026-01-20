import { ClassDivision } from '../entities/class-division.entity';
import { Ustad } from '../entities/ustad.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { UstadsService } from '../ustads/ustads.service';
export declare class ClassesService {
    private classDivisionRepository;
    private ustadRepository;
    private ustadsService;
    constructor(classDivisionRepository: typeof ClassDivision, ustadRepository: typeof Ustad, ustadsService: UstadsService);
    findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string, filterByAssigned?: boolean): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<ClassDivision>;
    create(createClassDto: any): Promise<ClassDivision>;
    update(id: string, updateClassDto: any): Promise<ClassDivision>;
    remove(id: string): Promise<void>;
}
