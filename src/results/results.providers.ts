import { ExamResult } from '../entities/exam-result.entity';
import { Ustad } from '../entities/ustad.entity';
import { ResultEntrySession } from '../entities/result-entry-session.entity';
import { Attendance } from '../entities/attendance.entity';
import { Student } from '../entities/student.entity';
import { Parent } from '../entities/parent.entity';

export const resultsProviders = [
  {
    provide: 'EXAM_RESULT_REPOSITORY',
    useValue: ExamResult,
  },
  {
    provide: 'USTAD_REPOSITORY',
    useValue: Ustad,
  },
  {
    provide: 'RESULT_ENTRY_SESSION_REPOSITORY',
    useValue: ResultEntrySession,
  },
  {
    provide: 'ATTENDANCE_REPOSITORY',
    useValue: Attendance,
  },
  {
    provide: 'STUDENT_REPOSITORY',
    useValue: Student,
  },
  {
    provide: 'PARENT_REPOSITORY',
    useValue: Parent,
  },
];
