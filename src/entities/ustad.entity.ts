import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { ClassDivision } from './class-division.entity';
import { Attendance } from './attendance.entity';
import { Prayer } from './prayer.entity';
import { ExamResult } from './exam-result.entity';

@Table({
  tableName: 'ustads',
  timestamps: true,
  underscored: true,
})
export class Ustad extends Model<Ustad> {
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
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  specialization: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  qualification: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'joining_date',
  })
  joiningDate: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'user_id',
  })
  userId: string;

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
  user: User;

  @HasMany(() => ClassDivision, {
    foreignKey: 'ustad_id',
    as: 'assignedClasses',
  })
  assignedClasses: ClassDivision[];

  @HasMany(() => Attendance, {
    foreignKey: 'marked_by_id',
    as: 'markedAttendances',
  })
  markedAttendances: Attendance[];

  @HasMany(() => Prayer, {
    foreignKey: 'marked_by_id',
    as: 'markedPrayers',
  })
  markedPrayers: Prayer[];

  @HasMany(() => ExamResult, {
    foreignKey: 'marked_by_id',
    as: 'markedResults',
  })
  markedResults: ExamResult[];
}
