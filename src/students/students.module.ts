import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { studentsProviders } from './students.providers';
import { DatabaseModule } from '../database/database.module';
import { UstadsModule } from '../ustads/ustads.module';

@Module({
  imports: [DatabaseModule, UstadsModule],
  controllers: [StudentsController],
  providers: [StudentsService, ...studentsProviders],
  exports: [StudentsService],
})
export class StudentsModule {}

