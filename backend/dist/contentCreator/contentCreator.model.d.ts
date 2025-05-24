import { User } from '../user/user.model';
import { Notification } from '../notifications/notification.model';
export interface ContentCreator extends User {
    notifications?: Notification[];
}
