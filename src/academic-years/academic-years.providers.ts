import { AcademicYear } from '../entities/academic-year.entity';

export const academicYearsProviders = [
  {
    provide: 'ACADEMIC_YEAR_REPOSITORY',
    useValue: AcademicYear,
  },
];
