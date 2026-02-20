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
exports.PrayerService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const dto_1 = require("../shared/dto");
const user_entity_1 = require("../entities/user.entity");
const ustads_service_1 = require("../ustads/ustads.service");
let PrayerService = class PrayerService {
    constructor(prayerRepository, ustadRepository, ustadsService) {
        this.prayerRepository = prayerRepository;
        this.ustadRepository = ustadRepository;
        this.ustadsService = ustadsService;
    }
    async findAll(pageOptionsDto, userId, userRole) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause[sequelize_1.Op.or] = [
                { prayerName: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
                { status: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
            ];
        }
        if (pageOptionsDto.startDate || pageOptionsDto.endDate) {
            const dateRange = {};
            if (pageOptionsDto.startDate) {
                const startDate = new Date(pageOptionsDto.startDate);
                startDate.setHours(0, 0, 0, 0);
                dateRange[sequelize_1.Op.gte] = startDate;
            }
            if (pageOptionsDto.endDate) {
                const endDate = new Date(pageOptionsDto.endDate);
                endDate.setHours(23, 59, 59, 999);
                dateRange[sequelize_1.Op.lte] = endDate;
            }
            whereClause.date = dateRange;
        }
        else if (pageOptionsDto.date) {
            whereClause.date = new Date(pageOptionsDto.date);
        }
        if (pageOptionsDto.studentId) {
            whereClause.studentId = pageOptionsDto.studentId;
        }
        if (pageOptionsDto.academicYearId) {
            whereClause.academicYearId = pageOptionsDto.academicYearId;
        }
        let studentInclude = {
            model: student_entity_1.Student,
        };
        if (userRole === user_entity_1.UserRole.USTAD && userId) {
            const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
            if (assignedClassIds.length > 0) {
                studentInclude.where = {
                    classDivisionId: { [sequelize_1.Op.in]: assignedClassIds },
                };
                studentInclude.required = true;
            }
            else {
                studentInclude.where = {
                    classDivisionId: { [sequelize_1.Op.in]: [] },
                };
                studentInclude.required = true;
            }
        }
        const { rows, count } = await this.prayerRepository.findAndCountAll({
            where: whereClause,
            include: [
                studentInclude,
                { model: ustad_entity_1.Ustad, as: 'markedBy' },
                academic_year_entity_1.AcademicYear
            ],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['date', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Prayer records retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const prayer = await this.prayerRepository.findOne({
            where: { id },
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
        if (!prayer) {
            throw new common_1.NotFoundException(`Prayer record with ID ${id} not found`);
        }
        return prayer;
    }
    async findByStudent(studentId, pageOptionsDto) {
        const whereClause = { studentId };
        if (pageOptionsDto?.startDate || pageOptionsDto?.endDate) {
            const dateRange = {};
            if (pageOptionsDto.startDate) {
                const startDate = new Date(pageOptionsDto.startDate);
                startDate.setHours(0, 0, 0, 0);
                dateRange[sequelize_1.Op.gte] = startDate;
            }
            if (pageOptionsDto.endDate) {
                const endDate = new Date(pageOptionsDto.endDate);
                endDate.setHours(23, 59, 59, 999);
                dateRange[sequelize_1.Op.lte] = endDate;
            }
            whereClause.date = dateRange;
        }
        else if (pageOptionsDto?.date) {
            whereClause.date = new Date(pageOptionsDto.date);
        }
        return this.prayerRepository.findAll({
            where: whereClause,
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
            order: pageOptionsDto?.order ? [['date', pageOptionsDto.order]] : [['date', 'DESC']],
            limit: pageOptionsDto?.takeOrLimit,
        });
    }
    async create(createPrayerDto) {
        let markedById = createPrayerDto.markedById;
        if (createPrayerDto.markedByUserId && !markedById) {
            const ustad = await this.ustadsService.getUstadByUserId(createPrayerDto.markedByUserId);
            if (ustad) {
                markedById = ustad.id;
            }
        }
        const prayerData = {
            ...createPrayerDto,
            date: new Date(createPrayerDto.date),
            markedById,
        };
        delete prayerData.markedByUserId;
        const cleanPrayerData = Object.fromEntries(Object.entries(prayerData).filter(([_, value]) => value !== undefined));
        const prayer = await this.prayerRepository.create(cleanPrayerData);
        return prayer;
    }
    async update(id, updatePrayerDto) {
        const prayer = await this.findOne(id);
        const updateData = { ...updatePrayerDto };
        if (updatePrayerDto.date) {
            updateData.date = new Date(updatePrayerDto.date);
        }
        if (updatePrayerDto.markedByUserId && !updatePrayerDto.markedById) {
            const ustad = await this.ustadsService.getUstadByUserId(updatePrayerDto.markedByUserId);
            if (ustad) {
                updateData.markedById = ustad.id;
            }
        }
        delete updateData.markedByUserId;
        await prayer.update(updateData);
        return prayer;
    }
    async bulkUpsert(records, userId) {
        let resolvedMarkedById;
        if (userId) {
            const ustad = await this.ustadsService.getUstadByUserId(userId);
            if (ustad) {
                resolvedMarkedById = ustad.id;
            }
        }
        const results = [];
        for (const record of records) {
            const markedById = record.markedById || resolvedMarkedById;
            const date = new Date(record.date);
            const existing = await this.prayerRepository.findOne({
                where: { studentId: record.studentId, date },
            });
            const data = {
                studentId: record.studentId,
                date,
                fajr: record.fajr,
                dhuhr: record.dhuhr,
                asr: record.asr,
                maghrib: record.maghrib,
                isha: record.isha,
                markedById,
                academicYearId: record.academicYearId,
            };
            const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
            if (existing) {
                await existing.update(cleanData);
                results.push(existing);
            }
            else {
                const created = await this.prayerRepository.create(cleanData);
                results.push(created);
            }
        }
        return results;
    }
    async remove(id) {
        const prayer = await this.findOne(id);
        await prayer.destroy();
    }
};
exports.PrayerService = PrayerService;
exports.PrayerService = PrayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRAYER_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, ustads_service_1.UstadsService])
], PrayerService);
//# sourceMappingURL=prayer.service.js.map