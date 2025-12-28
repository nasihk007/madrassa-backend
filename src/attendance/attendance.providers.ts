import { Attendance } from '../entities/attendance.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { AcademicYear } from '../entities/academic-year.entity';

export const attendanceProviders = [
  {
    provide: 'ATTENDANCE_REPOSITORY',
    useValue: Attendance,
  },
  {
    provide: 'STUDENT_REPOSITORY',
    useValue: Student,
  },
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
  {
    provide: 'ACADEMIC_YEAR_REPOSITORY',
    useValue: AcademicYear,
  },
];
