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

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

@Table({
  tableName: 'attendances',
  timestamps: true,
  underscored: true,
})
export class Attendance extends Model<Attendance> {
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
    type: DataType.ENUM('present', 'absent', 'late', 'excused'),
    allowNull: false,
    defaultValue: 'present',
  })
  status: AttendanceStatus;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;

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
