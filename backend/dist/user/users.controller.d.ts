import { UsersService } from './users.service';
import { User } from './user.model';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(body: {
        name: string;
        email: string;
        role: string;
    }): Promise<any>;
}
