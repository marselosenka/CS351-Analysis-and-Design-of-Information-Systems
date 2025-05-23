import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Favorite } from './favorite.model';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Favorite[]> {
    return await this.db.query('SELECT * FROM favorites');
  }

  async findById(id: number): Promise<Favorite> {
    const results = await this.db.query('SELECT * FROM favorites WHERE id = ?', [id]);
    return results[0];
  }

  async create(contentId: number | null, eventId: number | null, description: string): Promise<any> {
    return await this.db.query(
      'INSERT INTO favorites (contentId, eventId, description) VALUES (?, ?, ?)',
      [contentId, eventId, description],
    );
  }

  async update(id: number, description: string): Promise<any> {
    return await this.db.query(
      'UPDATE favorites SET description = ? WHERE id = ?',
      [description, id],
    );
  }

  async delete(id: number): Promise<any> {
    return await this.db.query(
      'DELETE FROM favorites WHERE id = ?',
      [id],
    );
  }
}
