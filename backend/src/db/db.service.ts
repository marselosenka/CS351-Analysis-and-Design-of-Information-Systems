import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private connection: mysql.Connection;

    onModuleInit() {
        this.connection = mysql.createConnection({
            host: 'mysql',
            port: 3306,
            user: 'app_user',
            password: 'app_pass_12345',
            database: 'app_db',
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err.message);
            } else {
                console.log('Connected to MySQL.');
                //creates table if it doesn't exist -- its only for demo, you don't have to use this.
                this.ensureEventsTable();
                this.ensureNotificationsTable();
                this.ensureUsersTable();
                this.ensureContentCreatorsTable();
                this.ensureSubscribersTable();
                this.ensureFavoritesTable();
            }
        });
    }

    private ensureEventsTable() {
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL
          );
        `;

        this.connection.query(createTableSQL, (err) => {
            if (err) {
                console.error('Failed to create events table:', err.message);
            }  
        });
    }
    private ensureUsersTable() {
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            role ENUM('subscriber', 'creator') NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        this.connection.query(createTableSQL, (err) => {
            if (err) {
                console.error('Failed to create events table:', err.message);
            }  
        });
    }

    private ensureNotificationsTable() {
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            message TEXT NOT NULL,
            isRead BOOLEAN DEFAULT FALSE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );
        `;

        this.connection.query(createTableSQL, (err) => {
            if (err) {
                console.error('Failed to create notifications table:', err.message);
            }  
        });
    }
    private ensureSubscribersTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS subscribers (
        userId INT PRIMARY KEY,
        favorites TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
    this.connection.query(sql, (err) => {
        if (err) {
            console.error('Failed to create subscribers table:', err.message);
        }
    });
}
private ensureFavoritesTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        contentId INT,
        eventId INT,
        description TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
    this.connection.query(sql, (err) => {
        if (err) {
            console.error('Failed to create favorites table:', err.message);
        }
    });
}

private ensureContentCreatorsTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS content_creators (
        userId INT PRIMARY KEY,
        bio TEXT,
    );
    `;
    this.connection.query(sql, (err) => {
        if (err) {
            console.error('Failed to create content_creators table:', err.message);
        }
    });
}

    


    onModuleDestroy() {
        this.connection.end();
    }

    query(sql: string, params?: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}