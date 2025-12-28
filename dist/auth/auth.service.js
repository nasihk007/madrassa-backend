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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../entities/user.entity");
const parents_service_1 = require("../parents/parents.service");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, parentsService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.parentsService = parentsService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            console.log(`User not found with email: ${email}`);
            return null;
        }
        console.log(`Found user: ${user.email}, role: ${user.role}`);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`Password validation result: ${isPasswordValid}`);
        if (isPasswordValid) {
            const userObj = user.toJSON();
            const { password, ...result } = userObj;
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            token_type: user.role,
        };
        const userPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        if (user.role === user_entity_1.UserRole.PARENT) {
            const parent = await this.parentsService.getParentByUserId(user.id);
            payload.parent_id = parent.id;
            userPayload.parentId = parent.id;
            userPayload.activeStudentId = parent.activeStudentId;
            userPayload.students = (parent.students || []).map((student) => student.toJSON());
        }
        return {
            access_token: this.jwtService.sign(payload),
            user: userPayload,
        };
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        console.log(`Registering user: ${registerDto.email}, role: ${registerDto.role}`);
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        console.log(`Password hashed successfully for: ${registerDto.email}`);
        const role = registerDto.role ?? user_entity_1.UserRole.PARENT;
        const savedUser = await this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            role,
        });
        const { password, ...result } = savedUser.toJSON();
        console.log(`User registered successfully: ${savedUser.email}`);
        return result;
    }
    async switchStudent(parentUserId, studentId) {
        const parent = await this.parentsService.setActiveStudentForUser(parentUserId, studentId);
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const student = (parent.students || []).find((s) => s.id === studentId);
        if (!student) {
            throw new common_1.ForbiddenException('Student not associated with parent');
        }
        const payload = {
            sub: parentUserId,
            role: 'student',
            token_type: 'student',
            parent_id: parent.id,
            student_id: student.id,
            email: parent.email,
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            role: 'student',
            token_type: 'student',
            student: student.toJSON(),
            parent: {
                id: parent.id,
                activeStudentId: parent.activeStudentId,
                students: (parent.students || []).map((s) => s.toJSON()),
            },
        };
    }
    async switchParent(parentUserId) {
        const user = await this.userRepository.findByPk(parentUserId);
        if (!user || user.role !== user_entity_1.UserRole.PARENT) {
            throw new common_1.ForbiddenException('Only parents can switch back to parent context');
        }
        const parent = await this.parentsService.getParentByUserId(parentUserId);
        const payload = {
            sub: user.id,
            role: user_entity_1.UserRole.PARENT,
            token_type: 'parent',
            parent_id: parent.id,
            email: user.email,
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            role: user_entity_1.UserRole.PARENT,
            token_type: 'parent',
            parent: {
                id: parent.id,
                activeStudentId: parent.activeStudentId,
                students: (parent.students || []).map((s) => s.toJSON()),
            },
        };
    }
    async findById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        parents_service_1.ParentsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map