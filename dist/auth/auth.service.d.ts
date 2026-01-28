import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ParentsService } from '../parents/parents.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private readonly parentsService;
    constructor(userRepository: typeof User, jwtService: JwtService, parentsService: ParentsService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
        parent: import("../entities/parent.entity").Parent;
        ustad: import("../entities/ustad.entity").Ustad;
        announcements: import("../entities/announcement.entity").Announcement[];
        deletedAt?: Date | any;
        version?: number | any;
        _attributes: User;
        dataValues: User;
        _creationAttributes: User;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<User, User>;
    }>;
    switchStudent(parentUserId: string, studentId: string): Promise<{
        access_token: string;
        role: string;
        token_type: string;
        student: import("../entities/student.entity").Student;
        parent: {
            id: string;
            activeStudentId: string;
            students: import("../entities/student.entity").Student[];
        };
    }>;
    switchParent(parentUserId: string): Promise<{
        access_token: string;
        role: UserRole;
        token_type: string;
        parent: {
            id: string;
            activeStudentId: string;
            students: import("../entities/student.entity").Student[];
        };
    }>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
