import { Model } from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
import { AcademicYear } from './academic-year.entity';
export declare class Prayer extends Model<Prayer> {
    id: string;
    date: Date;
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
    studentId: string;
    markedById: string;
    academicYearId: string;
    createdAt: Date;
    updatedAt: Date;
    student: Student;
    markedBy: Ustad;
    academicYear: AcademicYear;
}
