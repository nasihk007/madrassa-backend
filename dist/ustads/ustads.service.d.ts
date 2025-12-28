import { Ustad } from '../entities/ustad.entity';
import { User } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { CreateUstadDto } from './dto/create-ustad.dto';
import { UpdateUstadDto } from './dto/update-ustad.dto';
export declare class UstadsService {
    private ustadRepository;
    private userRepository;
    private classDivisionRepository;
    constructor(ustadRepository: typeof Ustad, userRepository: typeof User, classDivisionRepository: typeof ClassDivision);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<Ustad>;
    create(createUstadDto: CreateUstadDto): Promise<Ustad>;
    update(id: string, updateUstadDto: UpdateUstadDto): Promise<Ustad>;
    remove(id: string): Promise<void>;
    getAssignedClassIds(userId: string): Promise<string[]>;
}
