import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
