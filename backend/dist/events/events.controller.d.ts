import { EventsService } from './events.service';
import { Event } from './event.model';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<any>;
    create(body: {
        name: string;
        date: string;
    }): Promise<any>;
}
