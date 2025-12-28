import { Student } from '../entities/student.entity';
import { User } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
import { Parent } from '../entities/parent.entity';
import { UstadsService } from '../ustads/ustads.service';
export declare class StudentsService {
    private studentRepository;
    private userRepository;
    private classDivisionRepository;
    private academicYearRepository;
    private parentRepository;
    private ustadsService;
    constructor(studentRepository: typeof Student, userRepository: typeof User, classDivisionRepository: typeof ClassDivision, academicYearRepository: typeof AcademicYear, parentRepository: typeof Parent, ustadsService: UstadsService);
    findAll(pageOptionsDto: PageOptionsDto, userId?: string, userRole?: string): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<Student>;
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
    remove(id: string): Promise<void>;
    private attachLegacyFields;
}
