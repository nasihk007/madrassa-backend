import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { attendanceProviders } from './attendance.providers';
import { DatabaseModule } from '../database/database.module';
import { UstadsModule } from '../ustads/ustads.module';

@Module({
  imports: [DatabaseModule, UstadsModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, ...attendanceProviders],
  exports: [AttendanceService],
})
export class AttendanceModule {}

