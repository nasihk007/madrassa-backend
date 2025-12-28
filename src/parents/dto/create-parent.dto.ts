import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateParentDto {
  @ApiProperty({
    description: 'Parent full name',
    example: 'Fatima Ahmed',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Parent email address',
    example: 'fatima.ahmed@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the parent account',
    example: 'ParentPass123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Parent phone number',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Parent address',
    example: '123 Main Street, City, Country',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;
}



