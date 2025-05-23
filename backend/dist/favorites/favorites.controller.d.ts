import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.model';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    findAll(): Promise<Favorite[]>;
    findOne(id: string): Promise<Favorite>;
    create(body: {
        contentId?: number;
        eventId?: number;
        description: string;
    }): Promise<any>;
    update(id: string, body: {
        description: string;
    }): Promise<any>;
    delete(id: string): Promise<any>;
}
