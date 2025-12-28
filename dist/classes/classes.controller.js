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
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const classes_service_1 = require("./classes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
const page_options_dto_1 = require("../shared/dto/page-options.dto");
let ClassesController = class ClassesController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    async findAll(pageOptionsDto, req) {
        return await this.classesService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
    }
    async findOne(id) {
        const result = await this.classesService.findOne(id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Class retrieved successfully');
    }
    async create(createClassDto) {
        const result = await this.classesService.create(createClassDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Class created successfully');
    }
    async update(id, updateClassDto) {
        const result = await this.classesService.update(id, updateClassDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Class updated successfully');
    }
    async remove(id) {
        await this.classesService.remove(id);
        return new common_data_response_dto_1.CommonDataResponseDto(null, true, 'Class deleted successfully');
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Items retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findAll", null);
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
], ClassesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new item' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "update", null);
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
], ClassesController.prototype, "remove", null);
exports.ClassesController = ClassesController = __decorate([
    (0, swagger_1.ApiTags)('classes'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('classes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map