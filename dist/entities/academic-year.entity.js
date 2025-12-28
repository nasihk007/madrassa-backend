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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYear = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_entity_1 = require("./student.entity");
const attendance_entity_1 = require("./attendance.entity");
const prayer_entity_1 = require("./prayer.entity");
const exam_result_entity_1 = require("./exam-result.entity");
let AcademicYear = class AcademicYear extends sequelize_typescript_1.Model {
};
exports.AcademicYear = AcademicYear;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], AcademicYear.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
    }),
    __metadata("design:type", String)
], AcademicYear.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        field: 'start_date',
    }),
    __metadata("design:type", Date)
], AcademicYear.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        field: 'end_date',
    }),
    __metadata("design:type", Date)
], AcademicYear.prototype, "endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_active',
    }),
    __metadata("design:type", Boolean)
], AcademicYear.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], AcademicYear.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], AcademicYear.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_entity_1.Student, {
        foreignKey: 'academic_year_id',
        as: 'students',
    }),
    __metadata("design:type", Array)
], AcademicYear.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => attendance_entity_1.Attendance, {
        foreignKey: 'academic_year_id',
        as: 'attendances',
    }),
    __metadata("design:type", Array)
], AcademicYear.prototype, "attendances", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => prayer_entity_1.Prayer, {
        foreignKey: 'academic_year_id',
        as: 'prayers',
    }),
    __metadata("design:type", Array)
], AcademicYear.prototype, "prayers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exam_result_entity_1.ExamResult, {
        foreignKey: 'academic_year_id',
        as: 'examResults',
    }),
    __metadata("design:type", Array)
], AcademicYear.prototype, "examResults", void 0);
exports.AcademicYear = AcademicYear = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'academic_years',
        timestamps: true,
        underscored: true,
    })
], AcademicYear);
//# sourceMappingURL=academic-year.entity.js.map