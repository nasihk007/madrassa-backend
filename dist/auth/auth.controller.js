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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const dto_1 = require("../shared/dto");
const user_entity_1 = require("../entities/user.entity");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const result = await this.authService.login(loginDto);
        return new dto_1.DataResponseDto(result, true, 'Login successful');
    }
    async register(registerDto) {
        const result = await this.authService.register(registerDto);
        return new dto_1.DataResponseDto(result, true, 'User registered successfully');
    }
    getProfile(req) {
        return new dto_1.DataResponseDto(req.user, true, 'Profile retrieved successfully');
    }
    async switchStudent(req, studentId) {
        if (req.user.role !== user_entity_1.UserRole.PARENT && req.user.role !== 'student') {
            throw new common_1.ForbiddenException('Only parents can switch to a student context');
        }
        const result = await this.authService.switchStudent(req.user.id, studentId);
        return new dto_1.DataResponseDto(result, true, 'Student context activated');
    }
    async switchParent(req) {
        if (req.user.role !== user_entity_1.UserRole.PARENT && req.user.role !== 'student') {
            throw new common_1.ForbiddenException('Only parents can switch contexts');
        }
        const result = await this.authService.switchParent(req.user.id);
        return new dto_1.DataResponseDto(result, true, 'Parent context activated');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully logged in',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@madrassa.com' },
                        role: { type: 'string', example: 'parent' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Invalid credentials' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully registered',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'john.doe@madrassa.com' },
                role: { type: 'string', example: 'parent' },
                createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Email already exists' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'john.doe@madrassa.com' },
                role: { type: 'string', example: 'parent' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Invalid or missing token' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Switch to a student context (parent or student token required)' }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'studentId', description: 'Student ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Student context token issued' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('switch-student/:studentId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "switchStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Switch back to parent context' }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Parent context token issued' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('switch-parent'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "switchParent", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map