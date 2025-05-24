import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SubscribersModule } from './subscriber/subscribers.module';
import { ContentCreatorsModule } from './contentCreator/contentCreators.module';
import { UsersModule } from './user/users.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    NotificationsModule,
    SubscribersModule,
    ContentCreatorsModule,
    UsersModule,
    FavoritesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
