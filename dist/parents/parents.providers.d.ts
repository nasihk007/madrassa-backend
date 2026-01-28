import { Parent } from '../entities/parent.entity';
import { User } from '../entities/user.entity';
export declare const parentsProviders: ({
    provide: string;
    useValue: typeof Parent;
} | {
    provide: string;
    useValue: typeof User;
})[];
