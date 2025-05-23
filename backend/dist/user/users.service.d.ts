import { DatabaseService } from '../db/db.service';
import { User } from './user.model';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    create(name: string, email: string, role: string): Promise<any>;
}
