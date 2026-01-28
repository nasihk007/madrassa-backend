import { Model } from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
import { AcademicYear } from './academic-year.entity';
import { ExamResult } from './exam-result.entity';
export declare class ResultEntrySession extends Model<ResultEntrySession> {
    id: string;
    studentId: string;
    examType: 'first_term' | 'mid_term' | 'annual';
    examDate: Date;
    academicYearId: string;
    markedById: string;
    status: 'draft' | 'submitted';
    totalMarks: number;
    totalPossibleMarks: number;
    totalHajers: number;
    classRank: number;
    createdAt: Date;
    updatedAt: Date;
    student: Student;
    markedBy: Ustad;
    academicYear: AcademicYear;
    examResults: ExamResult[];
}
