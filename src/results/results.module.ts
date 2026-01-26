import { Module, forwardRef } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { resultsProviders } from './results.providers';
import { DatabaseModule } from '../database/database.module';
import { UstadsModule } from '../ustads/ustads.module';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UstadsModule), AttendanceModule],
  controllers: [ResultsController],
  providers: [ResultsService, ...resultsProviders],
  exports: [ResultsService],
})
export class ResultsModule {}

