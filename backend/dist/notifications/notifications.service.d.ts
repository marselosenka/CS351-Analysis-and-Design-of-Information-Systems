import { DatabaseService } from '../db/db.service';
import { Notification } from './notification.model';
export declare class NotificationsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAllByUser(userId: number): Promise<Notification[]>;
    create(userId: number, message: string): Promise<any>;
    markAsRead(id: number): Promise<any>;
    delete(id: number): Promise<any>;
}
