import { Announcement } from '../entities/announcement.entity';

export const announcementsProviders = [
  {
    provide: 'ANNOUNCEMENT_REPOSITORY',
    useValue: Announcement,
  },
];
