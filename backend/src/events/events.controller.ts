import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';


@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}
    @Get()
    findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Event> {
      return this.eventsService.getById(parseInt(id, 10));
    }


  @Post()
async create(
    @Body()
    body: {
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
    }
  ) {
    // Parse teams and schedule if they come as strings
    const teams = typeof body.teams === 'string' ? JSON.parse(body.teams) : body.teams || [];
    const schedule = typeof body.schedule === 'string' ? JSON.parse(body.schedule) : body.schedule || [];

    // Compose full event object
    const event = {
      ...body,
      teams,
      schedule,
      wallpaper: body.wallpaper, // just filename string
    };

    // Delegate creation to your service
    return this.eventsService.create(event);
  }
}
