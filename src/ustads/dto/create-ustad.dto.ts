import { IsString, IsEmail, IsOptional, IsDateString, IsArray, MinLength, IsUUID, ValidateIf } from 'class-validator';

export class CreateUstadDto {
  @IsString()
  @ValidateIf((o) => !o.userId)
  name?: string;

  @IsEmail()
  @ValidateIf((o) => !o.userId)
  email?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ValidateIf((o) => !o.userId)
  password?: string;

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

  @IsUUID()
  @IsOptional()
  userId?: string;
}

