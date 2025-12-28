import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsDateString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student full name',
    example: 'Ahmed Hassan',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Student address',
    example: '123 Main Street, City, Country',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Student roll number',
    example: 'STU2024001',
  })
  @IsString()
  rollNumber: string;

  @ApiProperty({
    description: 'Legacy guardian name (deprecated)',
    required: false,
    example: 'Hassan Ali',
  })
  @IsOptional()
  @IsString()
  guardianName?: string;

  @ApiProperty({
    description: 'Legacy guardian phone number (deprecated)',
    required: false,
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  guardianPhone?: string;

  @ApiProperty({
    description: 'Admission date',
    example: '2024-01-15',
  })
  @IsDateString()
  admissionDate: string;

  @ApiProperty({
    description: 'Class division ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  classDivisionId: string;

  @ApiProperty({
    description: 'Academic year ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  academicYearId: string;

  @ApiProperty({
    description: 'Existing parent identifier (if selecting an existing parent)',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    description: 'Parent full name (required when creating a new parent)',
    example: 'Hassan Ali',
    required: false,
  })
  @IsOptional()
  @IsString()
  parentName?: string;

  @ApiProperty({
    description: 'Parent email address (required when creating a new parent)',
    example: 'parent@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  parentEmail?: string;

  @ApiProperty({
    description: 'Parent phone number',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  parentPhone?: string;

  @ApiProperty({
    description: 'Parent address',
    example: '123 Main Street, City, Country',
    required: false,
  })
  @IsOptional()
  @IsString()
  parentAddress?: string;

  @ApiProperty({
    description: 'Parent account password (required when creating a new parent)',
    example: 'parentPass123',
    minLength: 6,
    required: false,
  })
  @IsOptional()
  @MinLength(6)
  @IsString()
  parentPassword?: string;
}
