import { Module } from '@nestjs/common';
import { PrayerController } from './prayer.controller';
import { PrayerService } from './prayer.service';
import { prayerProviders } from './prayer.providers';
import { DatabaseModule } from '../database/database.module';
import { UstadsModule } from '../ustads/ustads.module';

@Module({
  imports: [DatabaseModule, UstadsModule],
  controllers: [PrayerController],
  providers: [PrayerService, ...prayerProviders],
  exports: [PrayerService],
})
export class PrayerModule {}

