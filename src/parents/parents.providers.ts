import { Parent } from '../entities/parent.entity';
import { User } from '../entities/user.entity';

export const parentsProviders = [
  {
    provide: 'PARENT_REPOSITORY',
    useValue: Parent,
  },
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];

