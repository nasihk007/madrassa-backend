import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Student } from './student.entity';

@Table({
  tableName: 'parents',
  timestamps: true,
  underscored: true,
})
export class Parent extends Model<Parent> {
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
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  userId: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'active_student_id',
  })
  activeStudentId: string | null;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Student, {
    foreignKey: 'active_student_id',
    constraints: false,
    as: 'activeStudent',
  })
  activeStudent?: Student;

  @HasMany(() => Student, {
    foreignKey: 'parent_id',
    as: 'students',
  })
  students: Student[];
}

