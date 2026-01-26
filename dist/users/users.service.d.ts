import { User } from '../entities/user.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User | null>;
    remove(id: string): Promise<void>;
    updateEmail(userId: string, email: string): Promise<User>;
    updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
