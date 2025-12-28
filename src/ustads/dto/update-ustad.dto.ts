import { PartialType } from '@nestjs/mapped-types';
import { CreateUstadDto } from './create-ustad.dto';

export class UpdateUstadDto extends PartialType(CreateUstadDto) {}

