import { IsString, IsDateString, IsUUID, IsOptional, IsArray, IsNumber, IsEnum, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SubjectEntryDto {
  @IsString()
  subjectName: string;

  @IsNumber()
  @Min(0)
  marks: number;

  @IsNumber()
  @Min(0)
  totalMarks: number;
}

export class CreateBulkResultEntryDto {
  @IsUUID()
  studentId: string;

  @IsEnum(['first_term', 'mid_term', 'annual'])
  examType: 'first_term' | 'mid_term' | 'annual';

  @IsDateString()
  examDate: string;

  @IsUUID()
  academicYearId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectEntryDto)
  subjects?: SubjectEntryDto[];

  @IsOptional()
  @IsEnum(['pass', 'fail'])
  passFailStatus?: 'pass' | 'fail';
}

