import { Model } from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
import { AcademicYear } from './academic-year.entity';
export declare class ExamResult extends Model<ExamResult> {
    id: string;
    subject: string;
    marks: number;
    totalMarks: number;
    examType: string;
    examDate: Date;
    grade: string;
    studentId: string;
    markedById: string;
    academicYearId: string;
    createdAt: Date;
    updatedAt: Date;
    student: Student;
    markedBy: Ustad;
    academicYear: AcademicYear;
}
