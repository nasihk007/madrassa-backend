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
    type: DataType.ENUM('pending', 'approved', 'published'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: 'pending' | 'approved' | 'published';

  @ForeignKey(() => Ustad)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'approved_by_id',
  })
  approvedById: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'approved_at',
  })
  approvedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'published_at',
  })
  publishedAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_pass_fail',
  })
  isPassFail: boolean;

  @Column({
    type: DataType.ENUM('pass', 'fail'),
    allowNull: true,
    field: 'pass_fail_status',
  })
  passFailStatus: 'pass' | 'fail';

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'total_marks_calculated',
  })
  totalMarksCalculated: number;

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
    type: DataType.INTEGER,
    allowNull: true,
    field: 'total_possible_marks',
  })
  totalPossibleMarks: number;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'result_entry_session_id',
  })
  resultEntrySessionId: string;

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

  @BelongsTo(() => Ustad, { foreignKey: 'approved_by_id' })
  approvedBy: Ustad;

  @BelongsTo(() => AcademicYear)
  academicYear: AcademicYear;
}
