import { DatabaseService } from '../db/db.service';
import { Event } from './event.model';
export declare class EventsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<Event[]>;
    getById(id: number): Promise<Event>;
    create(event: Event): Promise<any>;
}
