import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.model';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): Promise<Favorite[]> {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Favorite> {
    return this.favoritesService.findById(parseInt(id, 10));
  }

  @Post()
  create(@Body() body: { contentId?: number; eventId?: number; description: string }) {
    return this.favoritesService.create(body.contentId ?? null, body.eventId ?? null, body.description);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { description: string }) {
    return this.favoritesService.update(parseInt(id, 10), body.description);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.favoritesService.delete(parseInt(id, 10));
  }
}
