import { Parent } from '../entities/parent.entity';
import { Student } from '../entities/student.entity';
import { User } from '../entities/user.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PageOptionsDto, CommonDataResponseDto } from '../shared/dto';
export declare class ParentsService {
    private readonly parentRepository;
    private readonly userRepository;
    constructor(parentRepository: typeof Parent, userRepository: typeof User);
    getAllParents(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    getParentById(parentId: string): Promise<Parent>;
    getParentByUserId(userId: string): Promise<Parent>;
    createParent(createParentDto: CreateParentDto): Promise<Parent>;
    getStudentsForParentUser(userId: string): Promise<Student[]>;
    getStudentsByParentId(parentId: string): Promise<Student[]>;
    updateParent(id: string, updateParentDto: UpdateParentDto): Promise<Parent>;
    deleteParent(id: string): Promise<void>;
    setActiveStudentForUser(userId: string, studentId: string): Promise<Parent>;
    setActiveStudentForParent(parentId: string, studentId: string): Promise<Parent>;
    updatePhoneByUserId(userId: string, phone: string): Promise<Parent>;
    private setActiveStudent;
    private decorateParent;
    private attachLegacyFields;
}
