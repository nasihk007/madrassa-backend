import { AnnouncementsService } from './announcements.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
export declare class AnnouncementsController {
    private readonly announcementsService;
    constructor(announcementsService: AnnouncementsService);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createAnnouncementDto: any): Promise<CommonDataResponseDto>;
    update(id: string, updateAnnouncementDto: any): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
