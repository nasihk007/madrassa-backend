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
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const dto_1 = require("../shared/dto");
let ResultsService = class ResultsService {
    constructor(examResultRepository, ustadRepository) {
        this.examResultRepository = examResultRepository;
        this.ustadRepository = ustadRepository;
    }
    async findAll(pageOptionsDto) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause[sequelize_1.Op.or] = [
                { examType: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
                { subjectName: { [sequelize_1.Op.like]: `%${pageOptionsDto.query}%` } },
            ];
        }
        if (pageOptionsDto.studentId) {
            whereClause.studentId = pageOptionsDto.studentId;
        }
        if (pageOptionsDto.academicYearId) {
            whereClause.academicYearId = pageOptionsDto.academicYearId;
        }
        const { rows, count } = await this.examResultRepository.findAndCountAll({
            where: whereClause,
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['examDate', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Exam results retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const result = await this.examResultRepository.findOne({
            where: { id },
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
        if (!result) {
            throw new common_1.NotFoundException(`Exam result with ID ${id} not found`);
        }
        return result;
    }
    async findByStudent(studentId) {
        return this.examResultRepository.findAll({
            where: { studentId },
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
    }
    async create(createResultDto) {
        let markedById = createResultDto.markedById;
        if (createResultDto.markedByUserId && !markedById) {
            const ustad = await this.ustadRepository.findOne({
                where: { userId: createResultDto.markedByUserId }
            });
            if (ustad) {
                markedById = ustad.id;
            }
        }
        const resultData = {
            ...createResultDto,
            examDate: new Date(createResultDto.examDate),
            markedById,
            markedByUserId: undefined,
        };
        const cleanResultData = Object.fromEntries(Object.entries(resultData).filter(([_, value]) => value !== undefined));
        const result = await this.examResultRepository.create(cleanResultData);
        return result;
    }
    async update(id, updateResultDto) {
        const result = await this.findOne(id);
        const updateData = { ...updateResultDto };
        if (updateResultDto.examDate) {
            updateData.examDate = new Date(updateResultDto.examDate);
        }
        delete updateData.markedByUserId;
        await result.update(updateData);
        return result;
    }
    async remove(id) {
        const result = await this.findOne(id);
        await result.destroy();
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EXAM_RESULT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], ResultsService);
//# sourceMappingURL=results.service.js.map