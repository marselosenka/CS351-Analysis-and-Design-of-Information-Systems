import { DatabaseService } from '../db/db.service';
import { Subscriber } from './subscriber.model';
export declare class SubscribersService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<Subscriber[]>;
    findById(id: number): Promise<Subscriber>;
    create(name: string, email: string, subscriptionDate: string): Promise<any>;
}
