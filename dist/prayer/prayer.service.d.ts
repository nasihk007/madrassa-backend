import { Prayer } from '../entities/prayer.entity';
import { Ustad } from '../entities/ustad.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { UstadsService } from '../ustads/ustads.service';
export declare class PrayerService {
    private prayerRepository;
    private ustadRepository;
    private ustadsService;
    constructor(prayerRepository: typeof Prayer, ustadRepository: typeof Ustad, ustadsService: UstadsService);
    findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<Prayer>;
    findByStudent(studentId: string, pageOptionsDto?: PageOptionsDto): Promise<Prayer[]>;
    create(createPrayerDto: CreatePrayerDto): Promise<Prayer>;
    update(id: string, updatePrayerDto: UpdatePrayerDto): Promise<Prayer>;
    bulkUpsert(records: CreatePrayerDto[], userId?: string): Promise<Prayer[]>;
    remove(id: string): Promise<void>;
}
