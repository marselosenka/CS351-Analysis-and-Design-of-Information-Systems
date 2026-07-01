import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Subscriber } from './subscriber.model';

@Injectable()
export class SubscribersService {
    constructor(private readonly db: DatabaseService) {}

    async findAll(): Promise<Subscriber[]> {
        return await this.db.query(
            "SELECT * FROM users WHERE role = 'subscriber'"
        );
    }

    async findById(id: number): Promise<Subscriber> {
        const results = await this.db.query(
            "SELECT * FROM users WHERE id = ? AND role = 'subscriber'",
            [id]
        );
        return results[0];
    }

    async create(name: string, lastName: string, username: string, email: string, password: string): Promise<any> {
        const result = await this.db.query(
            'INSERT INTO users (name, lastName, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [name, lastName, username, email, password, 'subscriber'],
        );

        const userId = result.insertId;

        return await this.db.query(
            'INSERT INTO subscribers (userId, favorites) VALUES (?, ?)',
            [userId, '[]'],
        );
    }
}
