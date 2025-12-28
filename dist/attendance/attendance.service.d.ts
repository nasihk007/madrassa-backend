import { Attendance } from '../entities/attendance.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UstadsService } from '../ustads/ustads.service';
export declare class AttendanceService {
    private attendanceRepository;
    private studentRepository;
    private ustadRepository;
    private academicYearRepository;
    private ustadsService;
    constructor(attendanceRepository: typeof Attendance, studentRepository: typeof Student, ustadRepository: typeof Ustad, academicYearRepository: typeof AcademicYear, ustadsService: UstadsService);
    findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<Attendance>;
    findByStudent(studentId: string): Promise<Attendance[]>;
    findByDate(date: string): Promise<Attendance[]>;
    create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    remove(id: string): Promise<void>;
}
