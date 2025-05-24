import { DatabaseService } from '../db/db.service';
import { ContentCreator } from './contentCreator.model';
export declare class ContentCreatorsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<ContentCreator[]>;
    findById(id: number): Promise<ContentCreator>;
    create(name: string, email: string): Promise<any>;
    delete(id: number): Promise<any>;
}
