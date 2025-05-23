import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.eventsService.getById(parseInt(id, 10));
    }

    @Post()
    create(@Body() body: { name: string; date: string }) {
        return this.eventsService.create(body.name, body.date);
    }
}