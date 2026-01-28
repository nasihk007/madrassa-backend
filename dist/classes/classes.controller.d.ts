import { ClassesService } from './classes.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    findAll(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createClassDto: any): Promise<CommonDataResponseDto>;
    update(id: string, updateClassDto: any): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
