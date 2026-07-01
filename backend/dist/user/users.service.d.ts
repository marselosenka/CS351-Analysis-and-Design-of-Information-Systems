import { DatabaseService } from '../db/db.service';
import { User } from './user.model';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    create(name: string, lastName: string, username: string, email: string, password: string, role: string): Promise<any>;
}
