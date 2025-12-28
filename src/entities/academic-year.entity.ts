import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Student } from './student.entity';
import { Attendance } from './attendance.entity';
import { Prayer } from './prayer.entity';
import { ExamResult } from './exam-result.entity';

@Table({
  tableName: 'academic_years',
  timestamps: true,
  underscored: true,
})
export class AcademicYear extends Model<AcademicYear> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'start_date',
  })
  startDate: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'end_date',
  })
  endDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_active',
  })
  isActive: boolean;

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
  @HasMany(() => Student, {
    foreignKey: 'academic_year_id',
    as: 'students',
  })
  students: Student[];

  @HasMany(() => Attendance, {
    foreignKey: 'academic_year_id',
    as: 'attendances',
  })
  attendances: Attendance[];

  @HasMany(() => Prayer, {
    foreignKey: 'academic_year_id',
    as: 'prayers',
  })
  prayers: Prayer[];

  @HasMany(() => ExamResult, {
    foreignKey: 'academic_year_id',
    as: 'examResults',
  })
  examResults: ExamResult[];
}
