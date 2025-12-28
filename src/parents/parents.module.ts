import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { parentsProviders } from './parents.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ParentsController],
  providers: [ParentsService, ...parentsProviders],
  exports: [ParentsService],
})
export class ParentsModule {}


