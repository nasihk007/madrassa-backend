import { Module } from '@nestjs/common';
import { AcademicYearsController } from './academic-years.controller';
import { AcademicYearsService } from './academic-years.service';
import { academicYearsProviders } from './academic-years.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService, ...academicYearsProviders],
  exports: [AcademicYearsService],
})
export class AcademicYearsModule {}

