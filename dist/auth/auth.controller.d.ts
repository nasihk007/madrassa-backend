import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DataResponseDto } from '../shared/dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<DataResponseDto>;
    register(registerDto: RegisterDto): Promise<DataResponseDto>;
    getProfile(req: any): DataResponseDto;
    switchStudent(req: any, studentId: string): Promise<DataResponseDto>;
    switchParent(req: any): Promise<DataResponseDto>;
}
