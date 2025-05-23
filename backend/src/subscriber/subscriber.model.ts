import { User } from '../users/user.model';

export interface Subscriber extends User {
  subscriptionDate: string; // ISO or YYYY-MM-DD
    favorites?: Favorite[];

}
