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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
const page_options_dto_1 = require("../shared/dto/page-options.dto");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
const bulk_create_attendance_dto_1 = require("./dto/bulk-create-attendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async findAll(pageOptionsDto, req) {
        return await this.attendanceService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
    }
    async findByDate(date) {
        const result = await this.attendanceService.findByDate(date);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Attendance records by date retrieved successfully');
    }
    async findByStudent(studentId, pageOptionsDto) {
        const result = await this.attendanceService.findByStudent(studentId, pageOptionsDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Student attendance records retrieved successfully');
    }
    async findOne(id) {
        const result = await this.attendanceService.findOne(id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Attendance record retrieved successfully');
    }
    async create(createAttendanceDto) {
        const result = await this.attendanceService.create(createAttendanceDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Attendance record created successfully');
    }
    async bulkUpsert(bulkCreateDto, req) {
        const result = await this.attendanceService.bulkUpsert(bulkCreateDto.records, req.user?.id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Bulk attendance saved successfully');
    }
    async update(id, updateAttendanceDto) {
        const result = await this.attendanceService.update(id, updateAttendanceDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Attendance record updated successfully');
    }
    async remove(id) {
        await this.attendanceService.remove(id);
        return new common_data_response_dto_1.CommonDataResponseDto(null, true, 'Attendance record deleted successfully');
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Items retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-date'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findByStudent", null);
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
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new attendance record' }),
    (0, swagger_1.ApiBody)({ type: create_attendance_dto_1.CreateAttendanceDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Attendance record created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Bulk create or update attendance records' }),
    (0, swagger_1.ApiBody)({ type: bulk_create_attendance_dto_1.BulkCreateAttendanceDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bulk attendance saved successfully' }),
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_create_attendance_dto_1.BulkCreateAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "bulkUpsert", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update attendance record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attendance record ID' }),
    (0, swagger_1.ApiBody)({ type: update_attendance_dto_1.UpdateAttendanceDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Attendance record not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
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
], AttendanceController.prototype, "remove", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('attendance'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map