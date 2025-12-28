"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UstadsModule = void 0;
const common_1 = require("@nestjs/common");
const ustads_controller_1 = require("./ustads.controller");
const ustads_service_1 = require("./ustads.service");
const ustads_providers_1 = require("./ustads.providers");
const database_module_1 = require("../database/database.module");
let UstadsModule = class UstadsModule {
};
exports.UstadsModule = UstadsModule;
exports.UstadsModule = UstadsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [ustads_controller_1.UstadsController],
        providers: [ustads_service_1.UstadsService, ...ustads_providers_1.ustadsProviders],
        exports: [ustads_service_1.UstadsService],
    })
], UstadsModule);
//# sourceMappingURL=ustads.module.js.map