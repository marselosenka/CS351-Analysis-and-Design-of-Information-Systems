import { EventsService } from './events.service';
import { Event } from './event.model';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<Event>;
    create(body: {
        title: string;
        game: string;
        eventType: string;
        date: string;
        startTime: string;
        timezone: string;
        price: number;
        status: 'Upcoming' | 'Live';
        description: string;
        teams: string | any[];
        schedule: string | any[];
        wallpaper: string | null;
    }): Promise<any>;
}
