import { ClassDivision } from '../entities/class-division.entity';
import { Ustad } from '../entities/ustad.entity';

export const classesProviders = [
  {
    provide: 'CLASS_DIVISION_REPOSITORY',
    useValue: ClassDivision,
  },
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
];
