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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const bcrypt = require("bcryptjs");
const dto_1 = require("../shared/dto");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(pageOptionsDto) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause[sequelize_1.Op.or] = [
                { name: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
                { email: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
            ];
        }
        const { rows, count } = await this.userRepository.findAndCountAll({
            where: whereClause,
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['createdAt', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Users retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async create(userData) {
        return this.userRepository.create(userData);
    }
    async update(id, userData) {
        const user = await this.findOne(id);
        if (!user)
            return null;
        await user.update(userData);
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user) {
            await user.destroy();
        }
    }
    async updateEmail(userId, email) {
        const user = await this.findOne(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const existingUser = await this.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
            throw new common_1.BadRequestException('Email already exists');
        }
        await user.update({ email });
        return user;
    }
    async updatePassword(userId, currentPassword, newPassword) {
        const user = await this.findOne(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map