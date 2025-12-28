import { User } from '../entities/user.entity';
export declare const authProviders: {
    provide: string;
    useValue: typeof User;
}[];
