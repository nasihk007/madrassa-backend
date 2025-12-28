import { IsString, IsEmail, IsOptional, IsDateString, IsArray, MinLength } from 'class-validator';

export class CreateUstadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  specialization: string;

  @IsString()
  qualification: string;

  @IsDateString()
  joiningDate: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assignedClasses?: string[];
}

