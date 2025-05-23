import { User } from '../users/user.model';
export interface Subscriber extends User {
    subscriptionDate: string;
    favorites?: Favorite[];
}
