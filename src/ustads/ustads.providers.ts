import { Ustad } from '../entities/ustad.entity';
import { User } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';

export const ustadsProviders = [
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
  {
    provide: 'CLASS_DIVISION_REPOSITORY',
    useValue: ClassDivision,
  },
];
