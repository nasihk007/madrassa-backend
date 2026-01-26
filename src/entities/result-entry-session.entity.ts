import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';
import { AcademicYear } from './academic-year.entity';
import { ExamResult } from './exam-result.entity';

@Table({
  tableName: 'result_entry_sessions',
  timestamps: true,
  underscored: true,
})
export class ResultEntrySession extends Model<ResultEntrySession> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'student_id',
  })
  studentId: string;

  @Column({
    type: DataType.ENUM('first_term', 'mid_term', 'annual'),
    allowNull: false,
    field: 'exam_type',
  })
  examType: 'first_term' | 'mid_term' | 'annual';

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'exam_date',
  })
  examDate: Date;

  @ForeignKey(() => AcademicYear)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'academic_year_id',
  })
  academicYearId: string;

  @ForeignKey(() => Ustad)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'marked_by_id',
  })
  markedById: string;

  @Column({
    type: DataType.ENUM('draft', 'submitted'),
    allowNull: false,
    defaultValue: 'draft',
  })
  status: 'draft' | 'submitted';

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'total_marks',
  })
  totalMarks: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'total_possible_marks',
  })
  totalPossibleMarks: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'total_hajers',
  })
  totalHajers: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'class_rank',
  })
  classRank: number;

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

  @HasMany(() => ExamResult, {
    foreignKey: 'result_entry_session_id',
    as: 'examResults',
  })
  examResults: ExamResult[];
}

