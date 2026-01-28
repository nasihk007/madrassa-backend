import { ExamResult } from '../entities/exam-result.entity';
import { Ustad } from '../entities/ustad.entity';
import { ResultEntrySession } from '../entities/result-entry-session.entity';
import { Attendance } from '../entities/attendance.entity';
import { Student } from '../entities/student.entity';
import { Parent } from '../entities/parent.entity';
export declare const resultsProviders: ({
    provide: string;
    useValue: typeof ExamResult;
} | {
    provide: string;
    useValue: typeof Ustad;
} | {
    provide: string;
    useValue: typeof ResultEntrySession;
} | {
    provide: string;
    useValue: typeof Attendance;
} | {
    provide: string;
    useValue: typeof Student;
} | {
    provide: string;
    useValue: typeof Parent;
})[];
