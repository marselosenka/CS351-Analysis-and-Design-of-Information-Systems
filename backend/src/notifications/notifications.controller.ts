import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.model';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string): Promise<Notification[]> {
    return this.notificationsService.findAllByUser(parseInt(userId, 10));
  }

  @Post()
  create(@Body() body: { userId: number; message: string }) {
    return this.notificationsService.create(body.userId, body.message);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(parseInt(id, 10));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationsService.delete(parseInt(id, 10));
  }
}
