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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCreatorsController = void 0;
const common_1 = require("@nestjs/common");
const contentCreators_service_1 = require("./contentCreators.service");
let ContentCreatorsController = class ContentCreatorsController {
    constructor(creatorsService) {
        this.creatorsService = creatorsService;
    }
    findAll() {
        return this.creatorsService.findAll();
    }
    findOne(id) {
        return this.creatorsService.findById(parseInt(id, 10));
    }
    create(body) {
        return this.creatorsService.create(body.name, body.email);
    }
    delete(id) {
        return this.creatorsService.delete(parseInt(id, 10));
    }
};
exports.ContentCreatorsController = ContentCreatorsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentCreatorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentCreatorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentCreatorsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentCreatorsController.prototype, "delete", null);
exports.ContentCreatorsController = ContentCreatorsController = __decorate([
    (0, common_1.Controller)('creators'),
    __metadata("design:paramtypes", [contentCreators_service_1.ContentCreatorsService])
], ContentCreatorsController);
//# sourceMappingURL=contentCreators.controller.js.map