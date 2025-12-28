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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dashboard_service_1 = require("./dashboard.service");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getStats(req) {
        const result = await this.dashboardService.getStats(req.user);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Dashboard statistics retrieved successfully');
    }
    async getStudentStats(req, studentId) {
        const result = await this.dashboardService.getStudentStats(studentId, req.user);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Student statistics retrieved successfully');
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard statistics' }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dashboard statistics retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                totalStudents: { type: 'number', example: 150 },
                totalUstads: { type: 'number', example: 12 },
                totalClasses: { type: 'number', example: 8 },
                activeAcademicYear: {
                    type: 'object',
                    nullable: true,
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        isActive: { type: 'boolean' }
                    }
                },
                recentAnnouncements: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                            createdAt: { type: 'string' }
                        }
                    }
                },
                todayAttendance: { type: 'number', example: 142 },
                todayPrayers: { type: 'number', example: 138 }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Invalid or missing token' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get student statistics' }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Student statistics retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                attendance: {
                    type: 'object',
                    properties: {
                        present: { type: 'number' },
                        absent: { type: 'number' },
                        late: { type: 'number' },
                        total: { type: 'number' },
                        rate: { type: 'number' }
                    }
                },
                results: {
                    type: 'object',
                    properties: {
                        average: { type: 'number' },
                        totalSubjects: { type: 'number' },
                        gradeDistribution: { type: 'object' }
                    }
                },
                prayers: {
                    type: 'object',
                    properties: {
                        average: { type: 'number' },
                        perfectDays: { type: 'number' },
                        totalDays: { type: 'number' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Invalid or missing token' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('student/:studentId/stats'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStudentStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map