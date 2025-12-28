import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { resultsProviders } from './results.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResultsController],
  providers: [ResultsService, ...resultsProviders],
  exports: [ResultsService],
})
export class ResultsModule {}

