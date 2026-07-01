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
    async onModuleInit() {
        const host = process.env.DB_HOST || 'mysql';
        const port = Number(process.env.DB_PORT || 3306);
        const user = process.env.DB_USER || 'app_user';
        const password = process.env.DB_PASSWORD || 'app_pass_12345';
        const database = process.env.DB_NAME || 'app_db';
        this.pool = mysql.createPool({
            host,
            port,
            user,
            password,
            database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        await this.waitForDatabase();
        console.log('Connected to MySQL.');
        await this.ensureUsersTable();
        await this.ensureContentCreatorsTable();
        await this.ensureSubscribersTable();
        await this.ensureNotificationsTable();
        await this.ensureFavoritesTable();
        await this.ensureEventsTable();
    }
    async waitForDatabase(retries = 10, delayMs = 3000) {
        let lastError;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await this.query('SELECT 1');
                return;
            }
            catch (error) {
                lastError = error;
                const message = error instanceof Error ? error.message : String(error);
                console.error(`Error connecting to MySQL (attempt ${attempt}/${retries}): ${message}`);
                if (attempt < retries) {
                    await new Promise((resolve) => setTimeout(resolve, delayMs));
                }
            }
        }
        throw lastError instanceof Error ? lastError : new Error(String(lastError));
    }
    async ensureEventsTable() {
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS events (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            game VARCHAR(100) NOT NULL,
            eventType VARCHAR(100) NOT NULL,
            date DATE NOT NULL,
            startTime TIME NOT NULL,
            timezone VARCHAR(10) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            status ENUM('Upcoming', 'Live') NOT NULL,
            wallpaper VARCHAR(255),
            description TEXT NOT NULL,
            teams TEXT NOT NULL,    
            schedule TEXT NOT NULL   
        );
        `;
        await this.query(createTableSQL);
    }
    async ensureUsersTable() {
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('subscriber', 'creator') NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await this.query(createTableSQL);
    }
    async ensureNotificationsTable() {
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
        await this.query(createTableSQL);
    }
    async ensureSubscribersTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS subscribers (
        userId INT PRIMARY KEY,
        favorites TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
        await this.query(sql);
    }
    async ensureFavoritesTable() {
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
        await this.query(sql);
    }
    async ensureContentCreatorsTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS content_creators (
        userId INT PRIMARY KEY,
        bio TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
        await this.query(sql);
    }
    onModuleDestroy() {
        if (!this.pool) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (error, results) => {
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