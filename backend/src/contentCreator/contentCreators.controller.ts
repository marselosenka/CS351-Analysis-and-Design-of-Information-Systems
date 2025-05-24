import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ContentCreatorsService } from './contentCreators.service';
import { ContentCreator } from './contentCreator.model';

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
    email: string;
  }) {
    return this.creatorsService.create(body.name, body.email);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.creatorsService.delete(parseInt(id, 10));
  }
}
