import { NotificationsService } from './notifications.service';
import { Notification } from './notification.model';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAllByUser(userId: string): Promise<Notification[]>;
    create(body: {
        userId: number;
        message: string;
    }): Promise<any>;
    markAsRead(id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
