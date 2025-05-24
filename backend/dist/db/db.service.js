"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2");
let DatabaseService = class DatabaseService {
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
            }
            else {
                console.log('Connected to MySQL.');
                this.ensureEventsTable();
                this.ensureNotificationsTable();
                this.ensureUsersTable();
                this.ensureContentCreatorsTable();
                this.ensureSubscribersTable();
                this.ensureFavoritesTable();
            }
        });
    }
    ensureEventsTable() {
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
    ensureUsersTable() {
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
    ensureNotificationsTable() {
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
    ensureSubscribersTable() {
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
    ensureFavoritesTable() {
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
    ensureContentCreatorsTable() {
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
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=db.service.js.map