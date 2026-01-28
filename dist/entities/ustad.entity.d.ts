import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
import { ClassDivision } from './class-division.entity';
import { Attendance } from './attendance.entity';
import { Prayer } from './prayer.entity';
import { ExamResult } from './exam-result.entity';
export declare class Ustad extends Model<Ustad> {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    qualification: string;
    joiningDate: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    assignedClasses: ClassDivision[];
    markedAttendances: Attendance[];
    markedPrayers: Prayer[];
    markedResults: ExamResult[];
}
