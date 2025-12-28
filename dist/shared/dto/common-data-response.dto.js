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
exports.CommonDataResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const page_meta_dto_1 = require("./page-meta.dto");
class CommonDataResponseDto {
    constructor(data, status, message, meta = null) {
        this.statusCode = status ? 200 : 400;
        this.status = status;
        this.message = message;
        this.data = status ? data : null;
        this.meta = meta;
    }
}
exports.CommonDataResponseDto = CommonDataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CommonDataResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CommonDataResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CommonDataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], CommonDataResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => page_meta_dto_1.PageMetaDto, required: false }),
    __metadata("design:type", page_meta_dto_1.PageMetaDto)
], CommonDataResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=common-data-response.dto.js.map