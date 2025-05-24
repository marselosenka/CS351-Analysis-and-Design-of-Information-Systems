import { Module } from '@nestjs/common';
import { ContentCreatorsService } from './contentCreators.service';
import { ContentCreatorsController } from './contentCreators.controller';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContentCreatorsController],
  providers: [ContentCreatorsService],
})
export class ContentCreatorsModule {}
