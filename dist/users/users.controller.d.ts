import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(userData: Partial<User>): Promise<CommonDataResponseDto>;
    update(id: string, userData: Partial<User>): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
    updateEmail(req: any, updateEmailDto: UpdateEmailDto): Promise<CommonDataResponseDto>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordDto): Promise<CommonDataResponseDto>;
}
