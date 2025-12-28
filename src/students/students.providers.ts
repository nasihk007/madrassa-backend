import { Student } from '../entities/student.entity';
import { User } from '../entities/user.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Parent } from '../entities/parent.entity';

export const studentsProviders = [
  {
    provide: 'STUDENT_REPOSITORY',
    useValue: Student,
  },
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
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
    provide: 'PARENT_REPOSITORY',
    useValue: Parent,
  },
];
