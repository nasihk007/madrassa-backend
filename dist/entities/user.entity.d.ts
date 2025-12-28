import { Model } from 'sequelize-typescript';
import { Ustad } from './ustad.entity';
import { Announcement } from './announcement.entity';
import { Parent } from './parent.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USTAD = "ustad",
    PARENT = "parent"
}
export declare class User extends Model<User> {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    parent: Parent;
    ustad: Ustad;
    announcements: Announcement[];
}
