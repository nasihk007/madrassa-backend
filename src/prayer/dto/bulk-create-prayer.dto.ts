import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrayerDto } from './create-prayer.dto';

export class BulkCreatePrayerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrayerDto)
  records: CreatePrayerDto[];
}
