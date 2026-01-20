import { Module, forwardRef } from '@nestjs/common';
import { UstadsController } from './ustads.controller';
import { UstadsService } from './ustads.service';
import { ustadsProviders } from './ustads.providers';
import { DatabaseModule } from '../database/database.module';
import { ClassesModule } from '../classes/classes.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => ClassesModule)],
  controllers: [UstadsController],
  providers: [UstadsService, ...ustadsProviders],
  exports: [UstadsService],
})
export class UstadsModule {}

