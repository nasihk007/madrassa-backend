import { AttendanceStatus } from '../../entities/attendance.entity';
export declare class CreateAttendanceDto {
    date: string;
    status: AttendanceStatus;
    notes?: string;
    studentId: string;
    markedById?: string;
    markedByUserId?: string;
    academicYearId?: string;
}
