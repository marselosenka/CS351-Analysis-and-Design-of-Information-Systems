"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let EventsService = class EventsService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        return await this.db.query('SELECT * FROM events');
    }
    async getById(id) {
        return await this.db.query('SELECT * FROM events WHERE id = ?', [id]);
    }
    async create(name, date) {
        const dateOnly = new Date(date).toISOString().split('T')[0];
        return await this.db.query('INSERT INTO events (name, date) VALUES (?, ?)', [name, dateOnly]);
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], EventsService);
//# sourceMappingURL=events.service.js.map