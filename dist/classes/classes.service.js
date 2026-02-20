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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const parent_entity_1 = require("../entities/parent.entity");
const dto_1 = require("../shared/dto");
const user_entity_1 = require("../entities/user.entity");
const ustads_service_1 = require("../ustads/ustads.service");
let ClassesService = class ClassesService {
    constructor(classDivisionRepository, ustadRepository, ustadsService) {
        this.classDivisionRepository = classDivisionRepository;
        this.ustadRepository = ustadRepository;
        this.ustadsService = ustadsService;
    }
    async findAll(pageOptionsDto, userId, userRole, filterByAssigned = false) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause[sequelize_1.Op.or] = [
                { className: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
                { division: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
            ];
        }
        if (userId && (userRole === user_entity_1.UserRole.USTAD || (userRole === user_entity_1.UserRole.ADMIN && filterByAssigned))) {
            const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
            if (assignedClassIds.length > 0) {
                whereClause.id = { [sequelize_1.Op.in]: assignedClassIds };
            }
            else {
                whereClause.id = { [sequelize_1.Op.in]: [] };
            }
        }
        const { rows, count } = await this.classDivisionRepository.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: student_entity_1.Student,
                    include: [
                        {
                            model: parent_entity_1.Parent,
                            attributes: ['id', 'name', 'phone', 'email'],
                        },
                    ],
                },
                {
                    model: ustad_entity_1.Ustad,
                    as: 'assignedUstad',
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
        return new dto_1.CommonDataResponseDto(rows, true, 'Classes retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const classDivision = await this.classDivisionRepository.findOne({
            where: { id },
            include: [
                {
                    model: student_entity_1.Student,
                    include: [
                        {
                            model: parent_entity_1.Parent,
                            attributes: ['id', 'name', 'phone', 'email'],
                        },
                    ],
                },
                {
                    model: ustad_entity_1.Ustad,
                    as: 'assignedUstad',
                },
            ],
        });
        if (!classDivision) {
            throw new common_1.NotFoundException(`Class division with ID ${id} not found`);
        }
        return classDivision;
    }
    async create(createClassDto) {
        if (!createClassDto.ustadId) {
            createClassDto.ustadId = null;
        }
        if (createClassDto.ustadId) {
            const ustad = await this.ustadRepository.findByPk(createClassDto.ustadId);
            if (!ustad) {
                throw new common_1.NotFoundException(`Ustad with ID ${createClassDto.ustadId} not found`);
            }
        }
        const classDivision = await this.classDivisionRepository.create(createClassDto);
        return classDivision;
    }
    async update(id, updateClassDto) {
        const classDivision = await this.findOne(id);
        if (updateClassDto.ustadId !== undefined) {
            if (updateClassDto.ustadId) {
                if (classDivision.ustadId && classDivision.ustadId !== updateClassDto.ustadId) {
                    const existingUstad = await this.ustadRepository.findByPk(classDivision.ustadId, {
                        attributes: ['name'],
                    });
                    const existingUstadName = existingUstad?.name || 'an ustad';
                    throw new common_1.BadRequestException(`${existingUstadName} is already assigned to ${classDivision.className} ${classDivision.division}`);
                }
                const ustad = await this.ustadRepository.findByPk(updateClassDto.ustadId);
                if (!ustad) {
                    throw new common_1.NotFoundException(`Ustad with ID ${updateClassDto.ustadId} not found`);
                }
            }
        }
        await classDivision.update(updateClassDto);
        return classDivision;
    }
    async remove(id) {
        const classDivision = await this.findOne(id);
        await classDivision.destroy();
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CLASS_DIVISION_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, ustads_service_1.UstadsService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map