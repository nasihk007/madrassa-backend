import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min, IsString } from 'class-validator';
import { Order } from '../constants/constants';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 10;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Alias for take',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ type: String, description: 'Search query' })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiPropertyOptional({ type: String, description: 'Student ID filter' })
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional({ type: String, description: 'Class Division ID filter' })
  @IsString()
  @IsOptional()
  classDivisionId?: string;

  @ApiPropertyOptional({ type: String, description: 'Academic Year ID filter' })
  @IsString()
  @IsOptional()
  academicYearId?: string;

  @ApiPropertyOptional({ type: String, description: 'Priority filter (for announcements)', enum: ['low', 'medium', 'high'] })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ type: String, description: 'Date filter (YYYY-MM-DD) for date-based records' })
  @IsString()
  @IsOptional()
  date?: string;

  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.limit ?? this.take ?? 10);
  }

  get takeOrLimit(): number {
    return this.limit ?? this.take ?? 10;
  }
}
