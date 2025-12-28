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
exports.PrayerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prayer_service_1 = require("./prayer.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
const page_options_dto_1 = require("../shared/dto/page-options.dto");
const create_prayer_dto_1 = require("./dto/create-prayer.dto");
const update_prayer_dto_1 = require("./dto/update-prayer.dto");
let PrayerController = class PrayerController {
    constructor(prayerService) {
        this.prayerService = prayerService;
    }
    async findAll(pageOptionsDto, req) {
        return await this.prayerService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
    }
    async findByStudent(studentId) {
        const result = await this.prayerService.findByStudent(studentId);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Student prayer records retrieved successfully');
    }
    async findOne(id) {
        const result = await this.prayerService.findOne(id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Prayer record retrieved successfully');
    }
    async create(createPrayerDto) {
        const result = await this.prayerService.create(createPrayerDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Prayer record created successfully');
    }
    async update(id, updatePrayerDto) {
        const result = await this.prayerService.update(id, updatePrayerDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Prayer record updated successfully');
    }
    async remove(id) {
        await this.prayerService.remove(id);
        return new common_data_response_dto_1.CommonDataResponseDto(null, true, 'Prayer record deleted successfully');
    }
};
exports.PrayerController = PrayerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Items retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], PrayerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrayerController.prototype, "findByStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrayerController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new prayer record' }),
    (0, swagger_1.ApiBody)({ type: create_prayer_dto_1.CreatePrayerDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Prayer record created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prayer_dto_1.CreatePrayerDto]),
    __metadata("design:returntype", Promise)
], PrayerController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update prayer record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Prayer record ID' }),
    (0, swagger_1.ApiBody)({ type: update_prayer_dto_1.UpdatePrayerDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Prayer record updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Prayer record not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prayer_dto_1.UpdatePrayerDto]),
    __metadata("design:returntype", Promise)
], PrayerController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrayerController.prototype, "remove", null);
exports.PrayerController = PrayerController = __decorate([
    (0, swagger_1.ApiTags)('prayer'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('prayer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prayer_service_1.PrayerService])
], PrayerController);
//# sourceMappingURL=prayer.controller.js.map