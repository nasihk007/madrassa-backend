import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Student } from './student.entity';
import { Ustad } from './ustad.entity';

@Table({
  tableName: 'class_divisions',
  timestamps: true,
  underscored: true,
})
export class ClassDivision extends Model<ClassDivision> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: 'class_name',
  })
  className: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  division: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 30,
  })
  capacity: number;

  @ForeignKey(() => Ustad)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'ustad_id',
  })
  ustadId: string | null;

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
    foreignKey: 'class_division_id',
    as: 'students',
  })
  students: Student[];

  @BelongsTo(() => Ustad, {
    foreignKey: 'ustad_id',
    as: 'assignedUstad',
  })
  assignedUstad: Ustad;
}
