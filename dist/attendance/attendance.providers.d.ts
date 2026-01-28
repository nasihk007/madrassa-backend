import { Attendance } from '../entities/attendance.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';
export declare const attendanceProviders: ({
    provide: string;
    useValue: typeof Attendance;
} | {
    provide: string;
    useValue: typeof Student;
} | {
    provide: string;
    useValue: typeof Ustad;
} | {
    provide: string;
    useValue: typeof AcademicYear;
})[];
