import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ContentCreatorsModule } from './content-creators/content-creators.module';
import { UsersModule } from './user/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    NotificationsModule,
    SubscribersModule,
    ContentCreatorsModule,
    UsersModule,
    FavoritesModule,
    AuthModule,
  ],
})
export class AppModule {}
