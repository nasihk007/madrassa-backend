import { ClassDivision } from '../entities/class-division.entity';
import { Ustad } from '../entities/ustad.entity';
export declare const classesProviders: ({
    provide: string;
    useValue: typeof ClassDivision;
} | {
    provide: string;
    useValue: typeof Ustad;
})[];
