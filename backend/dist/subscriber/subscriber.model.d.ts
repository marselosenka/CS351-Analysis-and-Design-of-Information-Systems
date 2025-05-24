import { User } from '../user/user.model';
import { Favorite } from '../favorites/favorite.model';
export interface Subscriber extends User {
    subscriptionDate: string;
    favorites?: Favorite[];
}
