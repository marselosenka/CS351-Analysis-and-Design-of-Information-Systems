import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Notification } from './notification.model';

@Injectable()
export class NotificationsService {
  constructor(private readonly db: DatabaseService) {}

  async findAllByUser(userId: number): Promise<Notification[]> {
    return await this.db.query(
      'SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );
  }

  async create(userId: number, message: string): Promise<any> {
    return await this.db.query(
      'INSERT INTO notifications (userId, message, isRead, createdAt) VALUES (?, ?, ?, NOW())',
      [userId, message, false]
    );
  }

  async markAsRead(id: number): Promise<any> {
    return await this.db.query(
      'UPDATE notifications SET isRead = ? WHERE id = ?',
      [true, id]
    );
  }

  async delete(id: number): Promise<any> {
    return await this.db.query(
      'DELETE FROM notifications WHERE id = ?',
      [id]
    );
  }
}
