import { Prayer } from '../entities/prayer.entity';
import { Ustad } from '../entities/ustad.entity';

export const prayerProviders = [
  {
    provide: 'PRAYER_REPOSITORY',
    useValue: Prayer,
  },
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
];
