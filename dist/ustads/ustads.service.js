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
exports.UstadsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const sequelize_1 = require("sequelize");
const ustad_entity_1 = require("../entities/ustad.entity");
const user_entity_1 = require("../entities/user.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
const dto_1 = require("../shared/dto");
let UstadsService = class UstadsService {
    constructor(ustadRepository, userRepository, classDivisionRepository) {
        this.ustadRepository = ustadRepository;
        this.userRepository = userRepository;
        this.classDivisionRepository = classDivisionRepository;
    }
    async findAll(pageOptionsDto) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause['$user.name$'] = { [sequelize_1.Op.iLike]: `%${pageOptionsDto.query}%` };
        }
        const { rows, count } = await this.ustadRepository.findAndCountAll({
            where: whereClause,
            include: [
                user_entity_1.User,
                {
                    model: class_division_entity_1.ClassDivision,
                    as: 'assignedClasses',
                },
            ],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['createdAt', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Ustads retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const ustad = await this.ustadRepository.findOne({
            where: { id },
            include: [
                user_entity_1.User,
                {
                    model: class_division_entity_1.ClassDivision,
                    as: 'assignedClasses',
                },
            ],
        });
        if (!ustad) {
            throw new common_1.NotFoundException(`Ustad with ID ${id} not found`);
        }
        return ustad;
    }
    async create(createUstadDto) {
        const hashedPassword = await bcrypt.hash(createUstadDto.password, 10);
        const savedUser = await this.userRepository.create({
            name: createUstadDto.name,
            email: createUstadDto.email,
            password: hashedPassword,
            role: user_entity_1.UserRole.USTAD,
        });
        const { password, assignedClasses, ...ustadData } = createUstadDto;
        const ustad = await this.ustadRepository.create({
            ...ustadData,
            userId: savedUser.id,
            joiningDate: new Date(createUstadDto.joiningDate),
        });
        if (assignedClasses && assignedClasses.length > 0) {
            const classesToAssign = await this.classDivisionRepository.findAll({
                where: { id: assignedClasses },
                include: [
                    {
                        model: ustad_entity_1.Ustad,
                        as: 'assignedUstad',
                        attributes: ['id', 'name'],
                    },
                ],
            });
            const conflictingClasses = classesToAssign.filter((cls) => cls.ustadId !== null);
            if (conflictingClasses.length > 0) {
                const conflictMessages = conflictingClasses.map((cls) => `${cls.assignedUstad?.name || 'an ustad'} is already assigned to ${cls.className} ${cls.division}`);
                throw new common_1.BadRequestException(conflictMessages.length === 1
                    ? conflictMessages[0]
                    : `Cannot assign ustad to these classes: ${conflictMessages.join(', ')}`);
            }
            await this.classDivisionRepository.update({ ustadId: ustad.id }, { where: { id: assignedClasses } });
        }
        return ustad;
    }
    async update(id, updateUstadDto) {
        const ustad = await this.findOne(id);
        const { assignedClasses, ...updateData } = updateUstadDto;
        const updatePayload = { ...updateData };
        if (updateData.joiningDate) {
            updatePayload.joiningDate = new Date(updateData.joiningDate);
        }
        await ustad.update(updatePayload);
        if (assignedClasses !== undefined) {
            const classesToAssign = await this.classDivisionRepository.findAll({
                where: { id: assignedClasses },
                include: [
                    {
                        model: ustad_entity_1.Ustad,
                        as: 'assignedUstad',
                        attributes: ['id', 'name'],
                    },
                ],
            });
            const conflictingClasses = classesToAssign.filter((cls) => cls.ustadId && cls.ustadId !== ustad.id);
            if (conflictingClasses.length > 0) {
                const conflictMessages = conflictingClasses.map((cls) => `${cls.assignedUstad?.name || 'an ustad'} is already assigned to ${cls.className} ${cls.division}`);
                throw new common_1.BadRequestException(conflictMessages.length === 1
                    ? conflictMessages[0]
                    : `Cannot assign ustad to these classes: ${conflictMessages.join(', ')}`);
            }
            const currentClasses = await this.classDivisionRepository.findAll({
                where: { ustadId: ustad.id }
            });
            const classesToRemove = currentClasses.filter((currentClass) => !assignedClasses.includes(currentClass.id));
            if (classesToRemove.length > 0) {
                await this.classDivisionRepository.update({ ustadId: null }, { where: { id: classesToRemove.map(c => c.id) } });
            }
            if (assignedClasses.length > 0) {
                await this.classDivisionRepository.update({ ustadId: ustad.id }, { where: { id: assignedClasses } });
            }
        }
        return ustad;
    }
    async remove(id) {
        const ustad = await this.findOne(id);
        if (ustad.user) {
            await ustad.user.destroy();
        }
        await ustad.destroy();
    }
    async getAssignedClassIds(userId) {
        const ustad = await this.ustadRepository.findOne({
            where: { userId },
        });
        if (!ustad) {
            return [];
        }
        const classes = await this.classDivisionRepository.findAll({
            where: { ustadId: ustad.id },
        });
        return classes.map((classDiv) => classDiv.id);
    }
};
exports.UstadsService = UstadsService;
exports.UstadsService = UstadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('CLASS_DIVISION_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UstadsService);
//# sourceMappingURL=ustads.service.js.map