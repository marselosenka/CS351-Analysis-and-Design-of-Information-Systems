import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { Subscriber } from './subscriber.model';

@Controller('subscribers')
export class SubscribersController {
    constructor(private readonly subscribersService: SubscribersService) {}

    @Get()
    findAll(): Promise<Subscriber[]> {
        return this.subscribersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Subscriber> {
        return this.subscribersService.findById(parseInt(id, 10));
    }

    @Post()
    create(@Body() body: { name: string; email: string; subscriptionDate: string }) {
        return this.subscribersService.create(body.name, body.email, body.subscriptionDate);
    }
}
