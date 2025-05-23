import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { DatabaseModule } from '../db/db.module';

@Module({
    imports: [DatabaseModule],
    controllers: [SubscribersController],
    providers: [SubscribersService],
})
export class SubscribersModule {}
