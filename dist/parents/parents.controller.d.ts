import { ParentsService } from './parents.service';
import { CommonDataResponseDto, DataResponseDto, PageOptionsDto } from '../shared/dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
export declare class ParentsController {
    private readonly parentsService;
    constructor(parentsService: ParentsService);
    getParents(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    createParent(req: any, createParentDto: CreateParentDto): Promise<DataResponseDto>;
    updateParent(id: string, req: any, updateParentDto: UpdateParentDto): Promise<DataResponseDto>;
    deleteParent(id: string, req: any): Promise<DataResponseDto>;
    getMyStudents(req: any): Promise<CommonDataResponseDto>;
    getParent(id: string, req: any): Promise<DataResponseDto>;
    getParentStudents(id: string, req: any): Promise<CommonDataResponseDto>;
    activateMyStudent(studentId: string, req: any): Promise<DataResponseDto>;
    activateStudentForParent(parentId: string, studentId: string, req: any): Promise<DataResponseDto>;
    updatePhone(req: any, updatePhoneDto: UpdatePhoneDto): Promise<DataResponseDto>;
    private ensureAdmin;
}
