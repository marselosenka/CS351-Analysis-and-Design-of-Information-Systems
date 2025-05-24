import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { ContentCreator } from './contentCreator.model';

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
    email: string,

  ): Promise<any> {
    return await this.db.query(
      `INSERT INTO users (name, email, role,)
       VALUES (?, ?, 'creator')`,
      [name, email]
    );
  }



  async delete(id: number): Promise<any> {
    return await this.db.query(
      `DELETE FROM users WHERE id = ? AND role = 'creator'`,
      [id]
    );
  }
}
