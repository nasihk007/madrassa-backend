import { ExamResult } from '../entities/exam-result.entity';
import { Ustad } from '../entities/ustad.entity';

export const resultsProviders = [
  {
    provide: 'EXAM_RESULT_REPOSITORY',
    useValue: ExamResult,
  },
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
];
