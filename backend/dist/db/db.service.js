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