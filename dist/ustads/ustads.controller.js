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
exports.UstadsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ustads_service_1 = require("./ustads.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
const page_options_dto_1 = require("../shared/dto/page-options.dto");
const create_ustad_dto_1 = require("./dto/create-ustad.dto");
const update_ustad_dto_1 = require("./dto/update-ustad.dto");
const update_phone_dto_1 = require("./dto/update-phone.dto");
const classes_service_1 = require("../classes/classes.service");
let UstadsController = class UstadsController {
    constructor(ustadsService, classesService) {
        this.ustadsService = ustadsService;
        this.classesService = classesService;
    }
    async findAll(pageOptionsDto) {
        return await this.ustadsService.findAll(pageOptionsDto);
    }
    async getMyProfile(req) {
        const ustad = await this.ustadsService.getUstadByUserId(req.user.id);
        if (!ustad) {
            return new common_data_response_dto_1.CommonDataResponseDto(null, false, 'Ustad profile not found');
        }
        return new common_data_response_dto_1.CommonDataResponseDto(ustad, true, 'Ustad profile retrieved successfully');
    }
    async getMyClasses(pageOptionsDto, req) {
        return await this.classesService.findAll(pageOptionsDto, req.user.id, req.user.role, true);
    }
    async findOne(id) {
        const result = await this.ustadsService.findOne(id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Ustad retrieved successfully');
    }
    async create(createUstadDto) {
        const result = await this.ustadsService.create(createUstadDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Ustad created successfully');
    }
    async update(id, updateUstadDto) {
        const result = await this.ustadsService.update(id, updateUstadDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Ustad updated successfully');
    }
    async remove(id) {
        await this.ustadsService.remove(id);
        return new common_data_response_dto_1.CommonDataResponseDto(null, true, 'Ustad deleted successfully');
    }
    async updatePhone(req, updatePhoneDto) {
        const ustad = await this.ustadsService.updatePhoneByUserId(req.user.id, updatePhoneDto.phone);
        return new common_data_response_dto_1.CommonDataResponseDto(ustad, true, 'Phone updated successfully');
    }
};
exports.UstadsController = UstadsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all ustads' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustads retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get current user ustad profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustad profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ustad profile not found' }),
    (0, common_1.Get)('my-profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "getMyProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get my assigned classes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assigned classes retrieved successfully' }),
    (0, common_1.Get)('my-classes'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "getMyClasses", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get ustad by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ustad ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustad retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ustad not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new ustad' }),
    (0, swagger_1.ApiBody)({ type: create_ustad_dto_1.CreateUstadDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ustad created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ustad_dto_1.CreateUstadDto]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update ustad by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ustad ID' }),
    (0, swagger_1.ApiBody)({ type: update_ustad_dto_1.UpdateUstadDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustad updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ustad not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ustad_dto_1.UpdateUstadDto]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete ustad by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ustad ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustad deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ustad not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update current ustad phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Phone updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ustad not found' }),
    (0, common_1.Put)('me/phone'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_phone_dto_1.UpdatePhoneDto]),
    __metadata("design:returntype", Promise)
], UstadsController.prototype, "updatePhone", null);
exports.UstadsController = UstadsController = __decorate([
    (0, swagger_1.ApiTags)('ustads'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('ustads'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ustads_service_1.UstadsService,
        classes_service_1.ClassesService])
], UstadsController);
//# sourceMappingURL=ustads.controller.js.map