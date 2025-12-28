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
exports.AcademicYearsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const dto_1 = require("../shared/dto");
let AcademicYearsService = class AcademicYearsService {
    constructor(academicYearRepository) {
        this.academicYearRepository = academicYearRepository;
    }
    async findAll(pageOptionsDto) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause[sequelize_1.Op.or] = [
                { year: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
            ];
        }
        const { rows, count } = await this.academicYearRepository.findAndCountAll({
            where: whereClause,
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['createdAt', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Academic years retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const academicYear = await this.academicYearRepository.findOne({
            where: { id },
        });
        if (!academicYear) {
            throw new common_1.NotFoundException(`Academic year with ID ${id} not found`);
        }
        return academicYear;
    }
    async findActive() {
        return this.academicYearRepository.findOne({
            where: { isActive: true },
        });
    }
    async create(createAcademicYearDto) {
        const academicYear = await this.academicYearRepository.create({
            ...createAcademicYearDto,
            startDate: new Date(createAcademicYearDto.startDate),
            endDate: new Date(createAcademicYearDto.endDate),
        });
        return academicYear;
    }
    async update(id, updateAcademicYearDto) {
        const academicYear = await this.findOne(id);
        const updateData = { ...updateAcademicYearDto };
        if (updateAcademicYearDto.startDate) {
            updateData.startDate = new Date(updateAcademicYearDto.startDate);
        }
        if (updateAcademicYearDto.endDate) {
            updateData.endDate = new Date(updateAcademicYearDto.endDate);
        }
        await academicYear.update(updateData);
        return academicYear;
    }
    async remove(id) {
        const academicYear = await this.findOne(id);
        await academicYear.destroy();
    }
};
exports.AcademicYearsService = AcademicYearsService;
exports.AcademicYearsService = AcademicYearsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ACADEMIC_YEAR_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], AcademicYearsService);
//# sourceMappingURL=academic-years.service.js.map