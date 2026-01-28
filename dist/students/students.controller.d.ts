import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CommonDataResponseDto, PageOptionsDto } from '../shared/dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createStudentDto: CreateStudentDto): Promise<CommonDataResponseDto>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
