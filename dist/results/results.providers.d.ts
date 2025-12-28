import { ExamResult } from '../entities/exam-result.entity';
import { Ustad } from '../entities/ustad.entity';
export declare const resultsProviders: ({
    provide: string;
    useValue: typeof ExamResult;
} | {
    provide: string;
    useValue: typeof Ustad;
})[];
