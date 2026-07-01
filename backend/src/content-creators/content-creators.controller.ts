import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContentCreatorsService } from './content-creators.service';
import { ContentCreator } from './content-creator.model';

@Controller('creators')
export class ContentCreatorsController {
  constructor(private readonly creatorsService: ContentCreatorsService) {}

  @Get()
  findAll(): Promise<ContentCreator[]> {
    return this.creatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContentCreator> {
    return this.creatorsService.findById(parseInt(id, 10));
  }

  @Post()
  create(@Body() body: {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
  }) {
    return this.creatorsService.create(body.name, body.lastName, body.username, body.email, body.password, body.bio ?? null);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.creatorsService.delete(parseInt(id, 10));
  }
}
