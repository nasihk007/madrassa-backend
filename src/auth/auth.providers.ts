import { User } from '../entities/user.entity';

export const authProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
