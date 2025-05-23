import { DatabaseService } from '../db/db.service';
export declare class EventsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<any>;
    getById(id: number): Promise<any>;
    create(name: string, date: string): Promise<any>;
}
