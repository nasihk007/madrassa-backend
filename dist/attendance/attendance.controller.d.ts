import { AttendanceService } from './attendance.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { BulkCreateAttendanceDto } from './dto/bulk-create-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    findAll(pageOptionsDto: PageOptionsDto, req: any): Promise<CommonDataResponseDto>;
    findByDate(date: string): Promise<CommonDataResponseDto>;
    findByStudent(studentId: string, pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto>;
    findOne(id: string): Promise<CommonDataResponseDto>;
    create(createAttendanceDto: CreateAttendanceDto): Promise<CommonDataResponseDto>;
    bulkUpsert(bulkCreateDto: BulkCreateAttendanceDto, req: any): Promise<CommonDataResponseDto>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<CommonDataResponseDto>;
    remove(id: string): Promise<CommonDataResponseDto>;
}
