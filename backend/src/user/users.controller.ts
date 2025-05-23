import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(parseInt(id, 10));
    }

    @Post()
    create(@Body() body: { name: string; email: string; role: string }) {
        return this.usersService.create(body.name, body.email, body.role);
    }
}
