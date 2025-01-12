import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudySet } from './entities/study-set.entity';
import { StudySetsController } from './study-sets.controller';
import { StudySetsService } from './study-sets.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudySet])],
  controllers: [StudySetsController],
  providers: [StudySetsService],
})
export class StudySetsModule {}
