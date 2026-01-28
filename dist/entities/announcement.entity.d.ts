import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
export declare enum AnnouncementVisibility {
    ALL = "all",
    ADMIN = "admin",
    USTAD = "ustad",
    PARENT = "parent"
}
export declare enum AnnouncementPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Announcement extends Model<Announcement> {
    id: string;
    title: string;
    content: string;
    visibleTo: AnnouncementVisibility;
    priority: AnnouncementPriority;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
}
