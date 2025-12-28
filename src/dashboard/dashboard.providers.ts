import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Attendance } from '../entities/attendance.entity';
import { Prayer } from '../entities/prayer.entity';
import { Announcement } from '../entities/announcement.entity';

export const dashboardProviders = [
  {
    provide: 'STUDENT_REPOSITORY',
    useValue: Student,
  },
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
  {
    provide: 'CLASS_DIVISION_REPOSITORY',
    useValue: ClassDivision,
  },
  {
    provide: 'ACADEMIC_YEAR_REPOSITORY',
    useValue: AcademicYear,
  },
  {
    provide: 'ATTENDANCE_REPOSITORY',
    useValue: Attendance,
  },
  {
    provide: 'PRAYER_REPOSITORY',
    useValue: Prayer,
  },
  {
    provide: 'ANNOUNCEMENT_REPOSITORY',
    useValue: Announcement,
  },
];
