import { Module } from '@nestjs/common';
import { UstadsController } from './ustads.controller';
import { UstadsService } from './ustads.service';
import { ustadsProviders } from './ustads.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UstadsController],
  providers: [UstadsService, ...ustadsProviders],
  exports: [UstadsService],
})
export class UstadsModule {}

