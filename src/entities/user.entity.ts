import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { Ustad } from './ustad.entity';
import { Announcement } from './announcement.entity';
import { Parent } from './parent.entity';

export enum UserRole {
  ADMIN = 'admin',
  USTAD = 'ustad',
  PARENT = 'parent',
}

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Exclude()
  password: string;

  @Column({
    type: DataType.ENUM('admin', 'ustad', 'parent'),
    allowNull: false,
    defaultValue: 'parent',
  })
  role: UserRole;

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
  @HasOne(() => Parent, {
    foreignKey: 'user_id',
    as: 'parent',
  })
  parent: Parent;

  @HasOne(() => Ustad, {
    foreignKey: 'user_id',
    as: 'ustad',
  })
  ustad: Ustad;

  @HasMany(() => Announcement, {
    foreignKey: 'created_by_id',
    as: 'announcements',
  })
  announcements: Announcement[];
}
