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
exports.ParentsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const sequelize_1 = require("sequelize");
const student_entity_1 = require("../entities/student.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const user_entity_1 = require("../entities/user.entity");
const dto_1 = require("../shared/dto");
const STUDENT_WITH_ASSOCIATIONS = {
    model: student_entity_1.Student,
    as: 'students',
    include: [
        {
            model: class_division_entity_1.ClassDivision,
            as: 'classDivision',
            include: [{ model: ustad_entity_1.Ustad, as: 'assignedUstad' }],
        },
        { model: academic_year_entity_1.AcademicYear, as: 'academicYear' },
    ],
};
let ParentsService = class ParentsService {
    constructor(parentRepository, userRepository) {
        this.parentRepository = parentRepository;
        this.userRepository = userRepository;
    }
    async getAllParents(pageOptionsDto) {
        let whereClause = {};
        if (!pageOptionsDto.query) {
            const { count, rows } = await this.parentRepository.findAndCountAll({
                where: whereClause,
                include: [STUDENT_WITH_ASSOCIATIONS, { model: user_entity_1.User }],
                limit: pageOptionsDto.takeOrLimit,
                offset: pageOptionsDto.skip,
                order: [['createdAt', pageOptionsDto.order || 'DESC']],
            });
            const decoratedParents = await Promise.all(rows.map((parent) => this.decorateParent(parent)));
            const pageMetaDto = new dto_1.PageMetaDto({
                pageOptionsDto,
                itemCount: count,
            });
            return new dto_1.CommonDataResponseDto(decoratedParents, true, 'Parents retrieved successfully', pageMetaDto);
        }
        const query = pageOptionsDto.query;
        const parentsBySelf = await this.parentRepository.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.iLike]: `%${query}%` } },
                    { email: { [sequelize_1.Op.iLike]: `%${query}%` } },
                    { phone: { [sequelize_1.Op.iLike]: `%${query}%` } },
                ],
            },
            attributes: ['id'],
        });
        const parentsByStudent = await this.parentRepository.findAll({
            include: [
                {
                    ...STUDENT_WITH_ASSOCIATIONS,
                    required: true,
                    where: {
                        name: { [sequelize_1.Op.iLike]: `%${query}%` },
                    },
                },
            ],
            attributes: ['id'],
        });
        const parentIdsSet = new Set();
        parentsBySelf.forEach((p) => parentIdsSet.add(p.id));
        parentsByStudent.forEach((p) => parentIdsSet.add(p.id));
        const parentIds = Array.from(parentIdsSet);
        if (parentIds.length === 0) {
            const emptyMeta = new dto_1.PageMetaDto({
                pageOptionsDto,
                itemCount: 0,
            });
            return new dto_1.CommonDataResponseDto([], true, 'Parents retrieved successfully', emptyMeta);
        }
        whereClause = {
            id: { [sequelize_1.Op.in]: parentIds },
        };
        const { count, rows } = await this.parentRepository.findAndCountAll({
            where: whereClause,
            include: [STUDENT_WITH_ASSOCIATIONS, { model: user_entity_1.User }],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['createdAt', pageOptionsDto.order || 'DESC']],
        });
        const decoratedParents = await Promise.all(rows.map((parent) => this.decorateParent(parent)));
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(decoratedParents, true, 'Parents retrieved successfully', pageMetaDto);
    }
    async getParentById(parentId) {
        const parent = await this.parentRepository.findOne({
            where: { id: parentId },
            include: [STUDENT_WITH_ASSOCIATIONS, { model: user_entity_1.User }],
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        return this.decorateParent(parent);
    }
    async getParentByUserId(userId) {
        const parent = await this.parentRepository.findOne({
            where: { userId },
            include: [STUDENT_WITH_ASSOCIATIONS, { model: user_entity_1.User }],
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found for current user');
        }
        return this.decorateParent(parent);
    }
    async createParent(createParentDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createParentDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('A user with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(createParentDto.password, 10);
        const user = await this.userRepository.create({
            name: createParentDto.name,
            email: createParentDto.email,
            password: hashedPassword,
            role: user_entity_1.UserRole.PARENT,
        });
        const parent = await this.parentRepository.create({
            name: createParentDto.name,
            email: createParentDto.email,
            phone: createParentDto.phone,
            address: createParentDto.address,
            userId: user.id,
        });
        return this.getParentById(parent.id);
    }
    async getStudentsForParentUser(userId) {
        const parent = await this.getParentByUserId(userId);
        return parent.students || [];
    }
    async getStudentsByParentId(parentId) {
        const parent = await this.getParentById(parentId);
        return parent.students || [];
    }
    async updateParent(id, updateParentDto) {
        const parent = await this.parentRepository.findOne({
            where: { id },
            include: [{ model: user_entity_1.User }],
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        if (updateParentDto.email && updateParentDto.email !== parent.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateParentDto.email },
            });
            if (existingUser && existingUser.id !== parent.userId) {
                throw new common_1.BadRequestException('A user with this email already exists');
            }
        }
        if (updateParentDto.name || updateParentDto.email || updateParentDto.password) {
            const updates = {};
            if (updateParentDto.name) {
                updates.name = updateParentDto.name;
            }
            if (updateParentDto.email) {
                updates.email = updateParentDto.email;
            }
            if (updateParentDto.password) {
                updates.password = await bcrypt.hash(updateParentDto.password, 10);
            }
            await parent.user.update(updates);
        }
        await parent.update({
            name: updateParentDto.name ?? parent.name,
            email: updateParentDto.email ?? parent.email,
            phone: updateParentDto.phone ?? parent.phone,
            address: updateParentDto.address ?? parent.address,
        });
        return this.getParentById(parent.id);
    }
    async deleteParent(id) {
        const parent = await this.parentRepository.findOne({
            where: { id },
            include: [{ model: student_entity_1.Student, as: 'students' }],
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        if (parent.students && parent.students.length > 0) {
            throw new common_1.BadRequestException('Cannot delete parent with linked students. Reassign or remove students first.');
        }
        const userId = parent.userId;
        await parent.destroy();
        if (userId) {
            await this.userRepository.destroy({ where: { id: userId } });
        }
    }
    async setActiveStudentForUser(userId, studentId) {
        const parent = await this.getParentByUserId(userId);
        await this.setActiveStudent(parent, studentId);
        return this.getParentByUserId(userId);
    }
    async setActiveStudentForParent(parentId, studentId) {
        const parent = await this.getParentById(parentId);
        await this.setActiveStudent(parent, studentId);
        return this.getParentById(parentId);
    }
    async setActiveStudent(parent, studentId) {
        if (!parent.students || parent.students.length === 0) {
            throw new common_1.BadRequestException('Parent has no students');
        }
        const student = parent.students.find((s) => s.id === studentId);
        if (!student) {
            throw new common_1.BadRequestException('Student does not belong to this parent');
        }
        if (parent.activeStudentId !== studentId) {
            await parent.update({ activeStudentId: studentId });
            parent.activeStudentId = studentId;
        }
    }
    async decorateParent(parent) {
        if (!parent) {
            return parent;
        }
        if (parent.students && parent.students.length > 0) {
            if (!parent.activeStudentId) {
                const firstStudentId = parent.students[0].id;
                await parent.update({ activeStudentId: firstStudentId });
                parent.activeStudentId = firstStudentId;
            }
        }
        this.attachLegacyFields(parent);
        return parent;
    }
    attachLegacyFields(parent) {
        if (!parent)
            return;
        (parent.students || []).forEach((student) => {
            student.setDataValue('userId', parent.userId);
            student.setDataValue('guardianName', parent.name);
            student.setDataValue('guardianPhone', parent.phone);
            student.setDataValue('isActive', parent.activeStudentId === student.id);
        });
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PARENT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], ParentsService);
//# sourceMappingURL=parents.service.js.map