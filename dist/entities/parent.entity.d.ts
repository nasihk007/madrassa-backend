import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
import { Student } from './student.entity';
export declare class Parent extends Model<Parent> {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    userId: string;
    activeStudentId: string | null;
    user: User;
    activeStudent?: Student;
    students: Student[];
}
