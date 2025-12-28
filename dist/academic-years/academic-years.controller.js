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
exports.AcademicYearsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const academic_years_service_1 = require("./academic-years.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
const page_options_dto_1 = require("../shared/dto/page-options.dto");
const create_academic_year_dto_1 = require("./dto/create-academic-year.dto");
const update_academic_year_dto_1 = require("./dto/update-academic-year.dto");
let AcademicYearsController = class AcademicYearsController {
    constructor(academicYearsService) {
        this.academicYearsService = academicYearsService;
    }
    async findAll(pageOptionsDto) {
        return await this.academicYearsService.findAll(pageOptionsDto);
    }
    async findActive() {
        const result = await this.academicYearsService.findActive();
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Active academic year retrieved successfully');
    }
    async findOne(id) {
        const result = await this.academicYearsService.findOne(id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Academic year retrieved successfully');
    }
    async create(createAcademicYearDto) {
        const result = await this.academicYearsService.create(createAcademicYearDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Academic year created successfully');
    }
    async update(id, updateAcademicYearDto) {
        const result = await this.academicYearsService.update(id, updateAcademicYearDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Academic year updated successfully');
    }
    async remove(id) {
        await this.academicYearsService.remove(id);
        return new common_data_response_dto_1.CommonDataResponseDto(null, true, 'Academic year deleted successfully');
    }
};
exports.AcademicYearsController = AcademicYearsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all academic years' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic years retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get active academic year' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active academic year retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No active academic year found' }),
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "findActive", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get academic year by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Academic year ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic year retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Academic year not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new academic year' }),
    (0, swagger_1.ApiBody)({ type: create_academic_year_dto_1.CreateAcademicYearDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Academic year created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_academic_year_dto_1.CreateAcademicYearDto]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update academic year by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Academic year ID' }),
    (0, swagger_1.ApiBody)({ type: update_academic_year_dto_1.UpdateAcademicYearDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic year updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Academic year not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_academic_year_dto_1.UpdateAcademicYearDto]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete academic year by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Academic year ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic year deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Academic year not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "remove", null);
exports.AcademicYearsController = AcademicYearsController = __decorate([
    (0, swagger_1.ApiTags)('academic-years'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('academic-years'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [academic_years_service_1.AcademicYearsService])
], AcademicYearsController);
//# sourceMappingURL=academic-years.controller.js.map