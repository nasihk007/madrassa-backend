import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Attendance } from '../entities/attendance.entity';
import { Prayer } from '../entities/prayer.entity';
import { Announcement } from '../entities/announcement.entity';
export declare const dashboardProviders: ({
    provide: string;
    useValue: typeof Student;
} | {
    provide: string;
    useValue: typeof Ustad;
} | {
    provide: string;
    useValue: typeof ClassDivision;
} | {
    provide: string;
    useValue: typeof AcademicYear;
} | {
    provide: string;
    useValue: typeof Attendance;
} | {
    provide: string;
    useValue: typeof Prayer;
} | {
    provide: string;
    useValue: typeof Announcement;
})[];
