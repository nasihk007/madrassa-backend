import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';

export enum AnnouncementVisibility {
  ALL = 'all',
  ADMIN = 'admin',
  USTAD = 'ustad',
  PARENT = 'parent',
}

export enum AnnouncementPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Table({
  tableName: 'announcements',
  timestamps: true,
  underscored: true,
})
export class Announcement extends Model<Announcement> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.ENUM('all', 'admin', 'ustad', 'parent'),
    allowNull: false,
    defaultValue: 'all',
    field: 'visible_to',
  })
  visibleTo: AnnouncementVisibility;

  @Column({
    type: DataType.ENUM('low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'medium',
  })
  priority: AnnouncementPriority;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'created_by_id',
  })
  createdById: string;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;

  // Relationships
  @BelongsTo(() => User)
  createdBy: User;
}
