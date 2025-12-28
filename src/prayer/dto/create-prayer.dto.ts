import { IsString, IsDateString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreatePrayerDto {
  @IsDateString()
  date: string;

  @IsBoolean()
  fajr: boolean;

  @IsBoolean()
  dhuhr: boolean;

  @IsBoolean()
  asr: boolean;

  @IsBoolean()
  maghrib: boolean;

  @IsBoolean()
  isha: boolean;

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

