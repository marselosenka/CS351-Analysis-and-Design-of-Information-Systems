"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCreatorsModule = void 0;
const common_1 = require("@nestjs/common");
const contentCreators_service_1 = require("./contentCreators.service");
const contentCreators_controller_1 = require("./contentCreators.controller");
const db_module_1 = require("../db/db.module");
let ContentCreatorsModule = class ContentCreatorsModule {
};
exports.ContentCreatorsModule = ContentCreatorsModule;
exports.ContentCreatorsModule = ContentCreatorsModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DatabaseModule],
        controllers: [contentCreators_controller_1.ContentCreatorsController],
        providers: [contentCreators_service_1.ContentCreatorsService],
    })
], ContentCreatorsModule);
//# sourceMappingURL=contentCreators.module.js.map