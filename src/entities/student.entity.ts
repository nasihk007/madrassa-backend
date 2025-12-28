import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ClassDivision } from './class-division.entity';
import { AcademicYear } from './academic-year.entity';
import { Attendance } from './attendance.entity';
import { ExamResult } from './exam-result.entity';
import { Prayer } from './prayer.entity';
import { Parent } from './parent.entity';

@Table({
  tableName: 'students',
  timestamps: true,
  underscored: true,
})
export class Student extends Model<Student> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  // Virtual/legacy properties for compatibility
  declare userId?: string | null;
  declare guardianName?: string | null;
  declare guardianPhone?: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
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

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
    field: 'roll_number',
  })
  rollNumber: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'admission_date',
  })
  admissionDate: Date;

  @ForeignKey(() => Parent)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'parent_id',
  })
  parentId: string;

  @ForeignKey(() => ClassDivision)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'class_division_id',
  })
  classDivisionId: string;

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
  @BelongsTo(() => Parent)
  parent: Parent;

  declare isActive?: boolean;

  @BelongsTo(() => ClassDivision)
  classDivision: ClassDivision;

  @BelongsTo(() => AcademicYear)
  academicYear: AcademicYear;

  @HasMany(() => Attendance, {
    foreignKey: 'student_id',
    as: 'attendances',
  })
  attendances: Attendance[];

  @HasMany(() => ExamResult, {
    foreignKey: 'student_id',
    as: 'examResults',
  })
  examResults: ExamResult[];

  @HasMany(() => Prayer, {
    foreignKey: 'student_id',
    as: 'prayers',
  })
  prayers: Prayer[];
}
