import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhoneDto {
  @ApiProperty({
    description: 'New phone number',
    example: '+1234567890',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  phone: string;
}

