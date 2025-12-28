import { Model } from 'sequelize-typescript';
import { Student } from './student.entity';
import { Attendance } from './attendance.entity';
import { Prayer } from './prayer.entity';
import { ExamResult } from './exam-result.entity';
export declare class AcademicYear extends Model<AcademicYear> {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    students: Student[];
    attendances: Attendance[];
    prayers: Prayer[];
    examResults: ExamResult[];
}
