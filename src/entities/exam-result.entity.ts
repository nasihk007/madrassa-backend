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
  tableName: 'exam_results',
  timestamps: true,
  underscored: true,
})
export class ExamResult extends Model<ExamResult> {
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
  subject: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  marks: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'total_marks',
  })
  totalMarks: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'exam_type',
  })
  examType: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'exam_date',
  })
  examDate: Date;

  @Column({
    type: DataType.STRING(5),
    allowNull: true,
  })
  grade: string;

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
