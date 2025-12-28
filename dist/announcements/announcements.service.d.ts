import { Announcement } from '../entities/announcement.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
export declare class AnnouncementsService {
    private announcementRepository;
    constructor(announcementRepository: typeof Announcement);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<Announcement>;
    create(createAnnouncementDto: any): Promise<Announcement>;
    update(id: string, updateAnnouncementDto: any): Promise<Announcement>;
    remove(id: string): Promise<void>;
}
