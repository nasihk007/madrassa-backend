import { UstadsService } from './ustads.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateUstadDto } from './dto/create-ustad.dto';
import { UpdateUstadDto } from './dto/update-ustad.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { ClassesService } from '../classes/classes.service';
export declare class UstadsController {
    private readonly ustadsService;
    private readonly classesService;
    constructor(ustadsService: UstadsService, classesService: ClassesService);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    getMyProfile(req: any): Promise<CommonDataResponseDto>;
    getMyClasses(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createUstadDto: CreateUstadDto): Promise<CommonDataResponseDto>;
    update(id: string, updateUstadDto: UpdateUstadDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
    updatePhone(req: any, updatePhoneDto: UpdatePhoneDto): Promise<CommonDataResponseDto>;
}
