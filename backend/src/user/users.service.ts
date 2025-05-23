import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService) {}

    async findAll(): Promise<User[]> {
        return await this.db.query('SELECT * FROM users');
    }

    async findById(id: number): Promise<User> {
        const results = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
        return results[0];
    }

    async create(name: string, email: string, role: string): Promise<any> {
        return await this.db.query(
            'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
            [name, email, role],
        );
    }
}
