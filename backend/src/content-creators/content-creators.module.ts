import { Module } from '@nestjs/common';
import { ContentCreatorsService } from './content-creators.service';
import { ContentCreatorsController } from './content-creators.controller';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContentCreatorsController],
  providers: [ContentCreatorsService],
})
export class ContentCreatorsModule {}
