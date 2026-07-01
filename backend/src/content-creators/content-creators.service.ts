import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { ContentCreator } from './content-creator.model';

@Injectable()
export class ContentCreatorsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<ContentCreator[]> {
    return await this.db.query(
      "SELECT * FROM users WHERE role = 'creator'"
    );
  }

  async findById(id: number): Promise<ContentCreator> {
    const results = await this.db.query(
      "SELECT * FROM users WHERE id = ? AND role = 'creator'",
      [id]
    );
    return results[0];
  }

  async create(
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    bio: string | null,
  ): Promise<any> {
    const result = await this.db.query(
      'INSERT INTO users (name, lastName, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, lastName, username, email, password, 'creator']
    );

    const userId = result.insertId;

    return await this.db.query(
      'INSERT INTO content_creators (userId, bio) VALUES (?, ?)',
      [userId, bio]
    );
  }

  async delete(id: number): Promise<any> {
    await this.db.query(
      'DELETE FROM content_creators WHERE userId = ?',
      [id]
    );

    return await this.db.query(
      `DELETE FROM users WHERE id = ? AND role = 'creator'`,
      [id]
    );
  }
}
