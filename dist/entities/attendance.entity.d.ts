import { Model } from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
import { AcademicYear } from './academic-year.entity';
export declare enum AttendanceStatus {
    PRESENT = "present",
    ABSENT = "absent",
    LATE = "late",
    EXCUSED = "excused"
}
export declare class Attendance extends Model<Attendance> {
    id: string;
    date: Date;
    status: AttendanceStatus;
    notes: string;
    studentId: string;
    markedById: string;
    academicYearId: string;
    createdAt: Date;
    updatedAt: Date;
    student: Student;
    markedBy: Ustad;
    academicYear: AcademicYear;
}
