import { UstadsService } from './ustads.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateUstadDto } from './dto/create-ustad.dto';
import { UpdateUstadDto } from './dto/update-ustad.dto';
export declare class UstadsController {
    private readonly ustadsService;
    constructor(ustadsService: UstadsService);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createUstadDto: CreateUstadDto): Promise<CommonDataResponseDto>;
    update(id: string, updateUstadDto: UpdateUstadDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
