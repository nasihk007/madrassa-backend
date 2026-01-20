import { Module, forwardRef } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { classesProviders } from './classes.providers';
import { DatabaseModule } from '../database/database.module';
import { UstadsModule } from '../ustads/ustads.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UstadsModule)],
  controllers: [ClassesController],
  providers: [ClassesService, ...classesProviders],
  exports: [ClassesService],
})
export class ClassesModule {}

