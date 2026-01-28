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
exports.ParentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parents_service_1 = require("./parents.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dto_1 = require("../shared/dto");
const user_entity_1 = require("../entities/user.entity");
const create_parent_dto_1 = require("./dto/create-parent.dto");
const update_parent_dto_1 = require("./dto/update-parent.dto");
const update_phone_dto_1 = require("./dto/update-phone.dto");
let ParentsController = class ParentsController {
    constructor(parentsService) {
        this.parentsService = parentsService;
    }
    async getParents(pageOptionsDto, req) {
        this.ensureAdmin(req.user);
        const result = await this.parentsService.getAllParents(pageOptionsDto);
        return result;
    }
    async createParent(req, createParentDto) {
        this.ensureAdmin(req.user);
        const parent = await this.parentsService.createParent(createParentDto);
        return new dto_1.DataResponseDto(parent, true, 'Parent created successfully');
    }
    async updateParent(id, req, updateParentDto) {
        this.ensureAdmin(req.user);
        const parent = await this.parentsService.updateParent(id, updateParentDto);
        return new dto_1.DataResponseDto(parent, true, 'Parent updated successfully');
    }
    async deleteParent(id, req) {
        this.ensureAdmin(req.user);
        await this.parentsService.deleteParent(id);
        return new dto_1.DataResponseDto(null, true, 'Parent deleted successfully');
    }
    async getMyStudents(req) {
        const isAdmin = req.user.role === user_entity_1.UserRole.ADMIN;
        const isParent = req.user.role === user_entity_1.UserRole.PARENT;
        const isParentContextStudent = req.user.role === 'student' &&
            req.user.token_type === 'student' &&
            !!req.user.parent_id;
        if (!isAdmin && !isParent && !isParentContextStudent) {
            throw new common_1.ForbiddenException('Only parents or administrators can access this resource');
        }
        const parentUserId = req.user.id;
        const students = await this.parentsService.getStudentsForParentUser(parentUserId);
        return new dto_1.CommonDataResponseDto(students, true, 'Students retrieved successfully');
    }
    async getParent(id, req) {
        this.ensureAdmin(req.user);
        const parent = await this.parentsService.getParentById(id);
        return new dto_1.DataResponseDto(parent, true, 'Parent retrieved successfully');
    }
    async getParentStudents(id, req) {
        if (req.user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only administrators can access this resource');
        }
        const students = await this.parentsService.getStudentsByParentId(id);
        return new dto_1.CommonDataResponseDto(students, true, 'Students retrieved successfully');
    }
    async activateMyStudent(studentId, req) {
        if (req.user.role !== user_entity_1.UserRole.PARENT) {
            throw new common_1.ForbiddenException('Only parents can change their active student');
        }
        await this.parentsService.setActiveStudentForUser(req.user.id, studentId);
        return new dto_1.DataResponseDto(null, true, 'Active student updated successfully');
    }
    async activateStudentForParent(parentId, studentId, req) {
        this.ensureAdmin(req.user);
        await this.parentsService.setActiveStudentForParent(parentId, studentId);
        return new dto_1.DataResponseDto(null, true, 'Active student updated successfully');
    }
    async updatePhone(req, updatePhoneDto) {
        const parent = await this.parentsService.updatePhoneByUserId(req.user.id, updatePhoneDto.phone);
        return new dto_1.DataResponseDto(parent, true, 'Phone updated successfully');
    }
    ensureAdmin(user) {
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only administrators can access this resource');
        }
    }
};
exports.ParentsController = ParentsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all parents (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Parents retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getParents", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new parent (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Parent created successfully' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_parent_dto_1.CreateParentDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "createParent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update parent (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Parent ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Parent updated successfully' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_parent_dto_1.UpdateParentDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "updateParent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete parent (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Parent ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Parent deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "deleteParent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get students linked to the currently authenticated parent' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Students retrieved successfully' }),
    (0, common_1.Get)('my-students'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getMyStudents", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get parent details (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Parent ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Parent retrieved successfully' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getParent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get students for a specific parent (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Parent ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Students retrieved successfully' }),
    (0, common_1.Get)(':id/students'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getParentStudents", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activate a student for the current parent account' }),
    (0, swagger_1.ApiParam)({ name: 'studentId', description: 'Student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active student updated successfully' }),
    (0, common_1.Patch)('students/:studentId/activate'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "activateMyStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activate a student for a specific parent (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Parent ID' }),
    (0, swagger_1.ApiParam)({ name: 'studentId', description: 'Student ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active student updated successfully' }),
    (0, common_1.Patch)(':id/students/:studentId/activate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('studentId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "activateStudentForParent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update current parent phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Phone updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Parent not found' }),
    (0, common_1.Put)('me/phone'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_phone_dto_1.UpdatePhoneDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "updatePhone", null);
exports.ParentsController = ParentsController = __decorate([
    (0, swagger_1.ApiTags)('parents'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('parents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [parents_service_1.ParentsService])
], ParentsController);
//# sourceMappingURL=parents.controller.js.map