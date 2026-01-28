import { Prayer } from '../entities/prayer.entity';
import { Ustad } from '../entities/ustad.entity';
export declare const prayerProviders: ({
    provide: string;
    useValue: typeof Prayer;
} | {
    provide: string;
    useValue: typeof Ustad;
})[];
