import { PrayerService } from './prayer.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
export declare class PrayerController {
    private readonly prayerService;
    constructor(prayerService: PrayerService);
    findAll(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findByStudent(studentId: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createPrayerDto: CreatePrayerDto): Promise<CommonDataResponseDto>;
    update(id: string, updatePrayerDto: UpdatePrayerDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
