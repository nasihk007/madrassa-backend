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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const sequelize_1 = require("sequelize");
const user_entity_1 = require("../entities/user.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const dto_1 = require("../shared/dto");
const parent_entity_1 = require("../entities/parent.entity");
const ustads_service_1 = require("../ustads/ustads.service");
let StudentsService = class StudentsService {
    constructor(studentRepository, userRepository, classDivisionRepository, academicYearRepository, parentRepository, ustadsService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.classDivisionRepository = classDivisionRepository;
        this.academicYearRepository = academicYearRepository;
        this.parentRepository = parentRepository;
        this.ustadsService = ustadsService;
    }
    async findAll(pageOptionsDto, userId, userRole) {
        const where = {};
        if (pageOptionsDto.query) {
            where[sequelize_1.Op.or] = [
                { name: { [sequelize_1.Op.iLike]: `%${pageOptionsDto.query}%` } },
                { rollNumber: { [sequelize_1.Op.iLike]: `%${pageOptionsDto.query}%` } },
            ];
        }
        if (pageOptionsDto.classDivisionId) {
            where.classDivisionId = pageOptionsDto.classDivisionId;
        }
        if (pageOptionsDto.academicYearId) {
            where.academicYearId = pageOptionsDto.academicYearId;
        }
        if (pageOptionsDto.studentId) {
            where.id = pageOptionsDto.studentId;
        }
        if (userRole === user_entity_1.UserRole.USTAD && userId) {
            const assignedClassIds = await this.ustadsService.getAssignedClassIds(userId);
            if (assignedClassIds.length > 0) {
                where.classDivisionId = { [sequelize_1.Op.in]: assignedClassIds };
            }
            else {
                where.classDivisionId = { [sequelize_1.Op.in]: [] };
            }
        }
        const { count, rows } = await this.studentRepository.findAndCountAll({
            where,
            include: [parent_entity_1.Parent, class_division_entity_1.ClassDivision, academic_year_entity_1.AcademicYear],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['createdAt', pageOptionsDto.order || 'ASC']],
        });
        rows.forEach((student) => this.attachLegacyFields(student));
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Students retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const student = await this.studentRepository.findOne({
            where: { id },
            include: [parent_entity_1.Parent, class_division_entity_1.ClassDivision, academic_year_entity_1.AcademicYear],
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        this.attachLegacyFields(student);
        return student;
    }
    async create(createStudentDto) {
        const classDivision = await this.classDivisionRepository.findOne({
            where: { id: createStudentDto.classDivisionId },
        });
        if (!classDivision) {
            throw new common_1.NotFoundException('Class division not found');
        }
        const academicYear = await this.academicYearRepository.findOne({
            where: { id: createStudentDto.academicYearId },
        });
        if (!academicYear) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        const parentName = createStudentDto.parentName ?? createStudentDto.guardianName;
        const parentPhone = createStudentDto.parentPhone ?? createStudentDto.guardianPhone;
        let parentId = createStudentDto.parentId;
        if (parentId) {
            const parent = await this.parentRepository.findOne({ where: { id: parentId } });
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
        }
        else {
            if (!parentName || !createStudentDto.parentEmail || !createStudentDto.parentPassword) {
                throw new common_1.BadRequestException('Parent details are required to create a new parent account');
            }
            const existingParent = await this.parentRepository.findOne({
                where: { email: createStudentDto.parentEmail },
            });
            if (existingParent) {
                throw new common_1.BadRequestException('Parent with this email already exists. Please select the existing parent.');
            }
            const existingUser = await this.userRepository.findOne({
                where: { email: createStudentDto.parentEmail },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('User with this email already exists. Please select the existing parent.');
            }
            const hashedParentPassword = await bcrypt.hash(createStudentDto.parentPassword, 10);
            const parentUser = await this.userRepository.create({
                name: parentName,
                email: createStudentDto.parentEmail,
                password: hashedParentPassword,
                role: user_entity_1.UserRole.PARENT,
            });
            const parent = await this.parentRepository.create({
                name: parentName,
                email: createStudentDto.parentEmail,
                phone: parentPhone,
                address: createStudentDto.parentAddress,
                userId: parentUser.id,
            });
            parentId = parent.id;
        }
        const student = await this.studentRepository.create({
            name: createStudentDto.name,
            address: createStudentDto.address,
            rollNumber: createStudentDto.rollNumber,
            admissionDate: new Date(createStudentDto.admissionDate),
            classDivisionId: classDivision.id,
            academicYearId: academicYear.id,
            parentId,
        });
        this.attachLegacyFields(student);
        return student;
    }
    async update(id, updateStudentDto) {
        const student = await this.findOne(id);
        if (updateStudentDto.classDivisionId) {
            const classDivision = await this.classDivisionRepository.findOne({
                where: { id: updateStudentDto.classDivisionId },
            });
            if (!classDivision) {
                throw new common_1.NotFoundException('Class division not found');
            }
        }
        if (updateStudentDto.academicYearId) {
            const academicYear = await this.academicYearRepository.findOne({
                where: { id: updateStudentDto.academicYearId },
            });
            if (!academicYear) {
                throw new common_1.NotFoundException('Academic year not found');
            }
        }
        if (updateStudentDto.parentId) {
            const parent = await this.parentRepository.findOne({
                where: { id: updateStudentDto.parentId },
            });
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
        }
        const updateData = {
            name: updateStudentDto.name ?? student.name,
            address: updateStudentDto.address ?? student.address,
            rollNumber: updateStudentDto.rollNumber ?? student.rollNumber,
            classDivisionId: updateStudentDto.classDivisionId ?? student.classDivisionId,
            academicYearId: updateStudentDto.academicYearId ?? student.academicYearId,
        };
        if (updateStudentDto.parentId) {
            updateData.parentId = updateStudentDto.parentId;
        }
        if (updateStudentDto.admissionDate) {
            updateData.admissionDate = new Date(updateStudentDto.admissionDate);
        }
        await student.update(updateData);
        this.attachLegacyFields(student);
        return student;
    }
    async remove(id) {
        const student = await this.findOne(id);
        await student.destroy();
    }
    attachLegacyFields(student) {
        if (!student)
            return;
        const parent = student.parent;
        if (parent) {
            student.setDataValue('userId', parent.userId);
            student.setDataValue('guardianName', parent.name);
            student.setDataValue('guardianPhone', parent.phone);
        }
        else {
            student.setDataValue('userId', null);
            student.setDataValue('guardianName', null);
            student.setDataValue('guardianPhone', null);
        }
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STUDENT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('CLASS_DIVISION_REPOSITORY')),
    __param(3, (0, common_1.Inject)('ACADEMIC_YEAR_REPOSITORY')),
    __param(4, (0, common_1.Inject)('PARENT_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, ustads_service_1.UstadsService])
], StudentsService);
//# sourceMappingURL=students.service.js.map