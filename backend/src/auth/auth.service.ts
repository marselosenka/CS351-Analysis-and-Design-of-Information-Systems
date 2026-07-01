import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async register(body: {   name: string;lastName: string; username: string; email: string; password: string; role: string  }) {
    const { name, lastName, username, email, password, role } = body;


    // Validate role
    if (!['subscriber', 'creator'].includes(role)) {
      throw new BadRequestException('Role must be subscriber or creator');
    }


    const existingUsers = await this.db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      throw new ConflictException('Email already exists');
    }


    const result = await this.db.query(
      'INSERT INTO users (name, lastName, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, lastName, username, email, password, role]
    );
    const userId = result.insertId;


    if (role === 'subscriber') {
      await this.db.query('INSERT INTO subscribers (userId) VALUES (?)', [userId]);
    } else if (role === 'creator') {
      await this.db.query('INSERT INTO content_creators (userId) VALUES (?)', [userId]);
    }

    return { message: 'User registered successfully', userId };
  }


  async validateUser(email: string, password: string) {
    const result = await this.db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = result[0];


    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
