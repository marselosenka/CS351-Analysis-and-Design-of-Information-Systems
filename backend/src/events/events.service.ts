import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';

@Injectable()
export class EventsService {
    constructor(private readonly db: DatabaseService) { }

    async findAll() {
        return await this.db.query('SELECT * FROM events');
    }

    async getById(id: number) {
        return await this.db.query(
            'SELECT * FROM events WHERE id = ?',
            [id],
        );
    }

    async create(name: string, date: string) {
        // Convert ISO string (e.g., '2025-05-13T00:00:00.000Z') to 'YYYY-MM-DD'
        const dateOnly = new Date(date).toISOString().split('T')[0];

        return await this.db.query(
            'INSERT INTO events (name, date) VALUES (?, ?)',
            [name, dateOnly],
        );
    }
}