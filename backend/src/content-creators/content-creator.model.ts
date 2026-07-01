import { User } from '../user/user.model';
import { Notification } from '../notifications/notification.model';

export interface ContentCreator extends User {
  bio?: string;
  notifications?: Notification[];
}
