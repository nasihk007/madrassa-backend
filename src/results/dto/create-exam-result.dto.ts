import { IsString, IsDateString, IsNumber, IsOptional, IsUUID, Min, Max } from 'class-validator';

export class CreateExamResultDto {
  @IsString()
  subject: string;

  @IsNumber()
  @Min(0)
  marks: number;

  @IsNumber()
  @Min(0)
  totalMarks: number;

  @IsString()
  examType: string;

  @IsDateString()
  examDate: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsUUID()
  studentId: string;

  @IsOptional()
  @IsUUID()
  markedById?: string;

  @IsOptional()
  @IsUUID()
  markedByUserId?: string;

  @IsOptional()
  @IsUUID()
  academicYearId?: string;

  @IsOptional()
  @IsString()
  passFailStatus?: 'pass' | 'fail';

  @IsOptional()
  @IsUUID()
  resultEntrySessionId?: string;
}

