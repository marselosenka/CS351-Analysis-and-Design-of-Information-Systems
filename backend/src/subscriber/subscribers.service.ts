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

    async create(name: string, email: string, subscriptionDate: string): Promise<any> {
        return await this.db.query(
            'INSERT INTO users (name, email, role, subscriptionDate) VALUES (?, ?, ?, ?)',
            [name, email, 'subscriber', subscriptionDate],
        );
    }
}
