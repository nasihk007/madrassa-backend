import { IsString, IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AttendanceStatus } from '../../entities/attendance.entity';

export class CreateAttendanceDto {
  @IsDateString()
  date: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsOptional()
  @IsString()
  notes?: string;

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
}
