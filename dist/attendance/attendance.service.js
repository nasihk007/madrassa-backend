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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const dto_1 = require("../shared/dto");
const user_entity_1 = require("../entities/user.entity");
const ustads_service_1 = require("../ustads/ustads.service");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, studentRepository, ustadRepository, academicYearRepository, ustadsService) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.ustadRepository = ustadRepository;
        this.academicYearRepository = academicYearRepository;
        this.ustadsService = ustadsService;
    }
    async findAll(pageOptionsDto, userId, userRole) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause[sequelize_1.Op.or] = [
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
        const { rows, count } = await this.attendanceRepository.findAndCountAll({
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
        return new dto_1.CommonDataResponseDto(rows, true, 'Attendance records retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const attendance = await this.attendanceRepository.findOne({
            where: { id },
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance with ID ${id} not found`);
        }
        return attendance;
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
        return this.attendanceRepository.findAll({
            where: whereClause,
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
            order: pageOptionsDto?.order ? [['date', pageOptionsDto.order]] : [['date', 'DESC']],
            limit: pageOptionsDto?.takeOrLimit,
        });
    }
    async findByDate(date) {
        return this.attendanceRepository.findAll({
            where: { date: new Date(date) },
            include: [student_entity_1.Student, { model: ustad_entity_1.Ustad, as: 'markedBy' }, academic_year_entity_1.AcademicYear],
        });
    }
    async create(createAttendanceDto) {
        let markedById = createAttendanceDto.markedById;
        if (createAttendanceDto.markedByUserId && !markedById) {
            const ustad = await this.ustadsService.getUstadByUserId(createAttendanceDto.markedByUserId);
            if (ustad) {
                markedById = ustad.id;
            }
        }
        const attendanceData = {
            ...createAttendanceDto,
            date: new Date(createAttendanceDto.date),
            markedById,
        };
        delete attendanceData.markedByUserId;
        const cleanAttendanceData = Object.fromEntries(Object.entries(attendanceData).filter(([_, value]) => value !== undefined));
        const attendance = await this.attendanceRepository.create(cleanAttendanceData);
        return attendance;
    }
    async update(id, updateAttendanceDto) {
        const attendance = await this.findOne(id);
        const updateData = { ...updateAttendanceDto };
        if (updateAttendanceDto.date) {
            updateData.date = new Date(updateAttendanceDto.date);
        }
        if (updateAttendanceDto.markedByUserId && !updateAttendanceDto.markedById) {
            const ustad = await this.ustadsService.getUstadByUserId(updateAttendanceDto.markedByUserId);
            if (ustad) {
                updateData.markedById = ustad.id;
            }
        }
        delete updateData.markedByUserId;
        await attendance.update(updateData);
        return attendance;
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
            const existing = await this.attendanceRepository.findOne({
                where: { studentId: record.studentId, date },
            });
            const data = {
                studentId: record.studentId,
                date,
                status: record.status,
                markedById,
                academicYearId: record.academicYearId,
                notes: record.notes,
            };
            const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
            if (existing) {
                await existing.update(cleanData);
                results.push(existing);
            }
            else {
                const created = await this.attendanceRepository.create(cleanData);
                results.push(created);
            }
        }
        return results;
    }
    async remove(id) {
        const attendance = await this.findOne(id);
        await attendance.destroy();
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ATTENDANCE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('STUDENT_REPOSITORY')),
    __param(2, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __param(3, (0, common_1.Inject)('ACADEMIC_YEAR_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, ustads_service_1.UstadsService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map