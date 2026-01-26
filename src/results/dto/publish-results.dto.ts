import { IsString, IsOptional, IsUUID, IsArray, IsEnum } from 'class-validator';

export class PublishResultsDto {
  @IsOptional()
  @IsEnum(['first_term', 'mid_term', 'annual'])
  examType?: 'first_term' | 'mid_term' | 'annual';

  @IsOptional()
  @IsUUID()
  academicYearId?: string;

  @IsOptional()
  @IsUUID()
  classDivisionId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  resultIds?: string[];
}



