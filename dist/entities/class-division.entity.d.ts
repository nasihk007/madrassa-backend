import { Model } from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
export declare class ClassDivision extends Model<ClassDivision> {
    id: string;
    className: string;
    division: string;
    capacity: number;
    ustadId: string | null;
    createdAt: Date;
    updatedAt: Date;
    students: Student[];
    assignedUstad: Ustad;
}
