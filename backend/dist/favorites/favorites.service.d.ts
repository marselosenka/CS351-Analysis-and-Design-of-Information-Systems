import { DatabaseService } from '../db/db.service';
import { Favorite } from './favorite.model';
export declare class FavoritesService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<Favorite[]>;
    findById(id: number): Promise<Favorite>;
    create(contentId: number | null, eventId: number | null, description: string): Promise<any>;
    update(id: number, description: string): Promise<any>;
    delete(id: number): Promise<any>;
}
