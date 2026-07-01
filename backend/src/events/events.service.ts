import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Event } from './event.model';

@Injectable()
export class EventsService {
    constructor(private readonly db: DatabaseService) {}

    async findAll(): Promise<Event[]> {
        return this.db.query('SELECT * FROM events');
    }

    async getById(id: number): Promise<Event> {
        const results = await this.db.query('SELECT * FROM events WHERE id = ?', [id]);
        return results[0];
    }

    async create(event: Event) {

        const dateObj = new Date(event.date);
        if (isNaN(dateObj.getTime())) {
        throw new Error(`Invalid date provided: ${event.date}`);
        }
        const dateOnly = dateObj.toISOString().split('T')[0];

        // Serialize teams and schedule arrays as JSON strings for DB storage
        const teamsJson = JSON.stringify(event.teams);
        const scheduleJson = JSON.stringify(event.schedule);

        // Wallpaper will be treated as string (file path or URL)
        // If undefined, save NULL
        const wallpaper = typeof event.wallpaper === 'string' ? event.wallpaper : null;

        const sql = `
            INSERT INTO events
            (title, game, eventType, date, startTime, timezone, price, status, wallpaper, description, teams, schedule)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            event.title,
            event.game,
            event.eventType,
            dateOnly,
            event.startTime,
            event.timezone,
            event.price,
            event.status,
            wallpaper,
            event.description,
            teamsJson,
            scheduleJson,
        ];
        return this.db.query(sql, params);
    }
}
