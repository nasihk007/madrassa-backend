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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dto_1 = require("../shared/dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async findAll(pageOptionsDto, req) {
        const result = await this.studentsService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
        return result;
    }
    async findOne(id) {
        const result = await this.studentsService.findOne(id);
        return new dto_1.CommonDataResponseDto(result, true, 'Student retrieved successfully');
    }
    async create(createStudentDto) {
        const result = await this.studentsService.create(createStudentDto);
        return new dto_1.CommonDataResponseDto(result, true, 'Student created successfully');
    }
    async update(id, updateStudentDto) {
        const result = await this.studentsService.update(id, updateStudentDto);
        return new dto_1.CommonDataResponseDto(result, true, 'Student updated successfully');
    }
    async remove(id) {
        await this.studentsService.remove(id);
        return new dto_1.CommonDataResponseDto(null, true, 'Student deleted successfully');
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all students' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all students retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get student by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new student' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Student created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update student by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete student by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Student not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "remove", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('students'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('students'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map