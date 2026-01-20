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
exports.PageOptionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants/constants");
class PageOptionsDto {
    constructor() {
        this.order = constants_1.Order.ASC;
        this.page = 1;
        this.take = 10;
        this.limit = 10;
    }
    get skip() {
        return ((this.page ?? 1) - 1) * (this.limit ?? this.take ?? 10);
    }
    get takeOrLimit() {
        return this.limit ?? this.take ?? 10;
    }
}
exports.PageOptionsDto = PageOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.Order, default: constants_1.Order.ASC }),
    (0, class_validator_1.IsEnum)(constants_1.Order),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 50,
        default: 10,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 50,
        default: 10,
        description: 'Alias for take',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Search query' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Student ID filter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Class Division ID filter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "classDivisionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Academic Year ID filter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "academicYearId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Priority filter (for announcements)', enum: ['low', 'medium', 'high'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Date filter (YYYY-MM-DD) for date-based records' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Start date filter (YYYY-MM-DD) for date range filtering' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'End date filter (YYYY-MM-DD) for date range filtering' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "endDate", void 0);
//# sourceMappingURL=page-options.dto.js.map