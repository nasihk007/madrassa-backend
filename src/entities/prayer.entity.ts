import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
import { AcademicYear } from './academic-year.entity';

@Table({
  tableName: 'prayers',
  timestamps: true,
  underscored: true,
})
export class Prayer extends Model<Prayer> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  fajr: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  dhuhr: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  asr: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  maghrib: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isha: boolean;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'student_id',
  })
  studentId: string;

  @ForeignKey(() => Ustad)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'marked_by_id',
  })
  markedById: string;

  @ForeignKey(() => AcademicYear)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'academic_year_id',
  })
  academicYearId: string;

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
  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Ustad)
  markedBy: Ustad;

  @BelongsTo(() => AcademicYear)
  academicYear: AcademicYear;
}
