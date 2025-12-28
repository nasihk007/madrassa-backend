import { Student } from '../entities/student.entity';
import { User } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Parent } from '../entities/parent.entity';
export declare const studentsProviders: ({
    provide: string;
    useValue: typeof Student;
} | {
    provide: string;
    useValue: typeof User;
} | {
    provide: string;
    useValue: typeof ClassDivision;
} | {
    provide: string;
    useValue: typeof AcademicYear;
} | {
    provide: string;
    useValue: typeof Parent;
})[];
