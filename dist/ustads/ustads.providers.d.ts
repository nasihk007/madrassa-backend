import { Ustad } from '../entities/ustad.entity';
import { User } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
export declare const ustadsProviders: ({
    provide: string;
    useValue: typeof Ustad;
} | {
    provide: string;
    useValue: typeof User;
} | {
    provide: string;
    useValue: typeof ClassDivision;
})[];
