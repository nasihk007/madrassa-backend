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
exports.Student = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_division_entity_1 = require("./class-division.entity");
const academic_year_entity_1 = require("./academic-year.entity");
const attendance_entity_1 = require("./attendance.entity");
const exam_result_entity_1 = require("./exam-result.entity");
const prayer_entity_1 = require("./prayer.entity");
const parent_entity_1 = require("./parent.entity");
let Student = class Student extends sequelize_typescript_1.Model {
};
exports.Student = Student;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Student.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        unique: true,
        field: 'roll_number',
    }),
    __metadata("design:type", String)
], Student.prototype, "rollNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        field: 'admission_date',
    }),
    __metadata("design:type", Date)
], Student.prototype, "admissionDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => parent_entity_1.Parent),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        field: 'parent_id',
    }),
    __metadata("design:type", String)
], Student.prototype, "parentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => class_division_entity_1.ClassDivision),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'class_division_id',
    }),
    __metadata("design:type", String)
], Student.prototype, "classDivisionId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => academic_year_entity_1.AcademicYear),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'academic_year_id',
    }),
    __metadata("design:type", String)
], Student.prototype, "academicYearId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], Student.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => parent_entity_1.Parent),
    __metadata("design:type", parent_entity_1.Parent)
], Student.prototype, "parent", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => class_division_entity_1.ClassDivision),
    __metadata("design:type", class_division_entity_1.ClassDivision)
], Student.prototype, "classDivision", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => academic_year_entity_1.AcademicYear),
    __metadata("design:type", academic_year_entity_1.AcademicYear)
], Student.prototype, "academicYear", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => attendance_entity_1.Attendance, {
        foreignKey: 'student_id',
        as: 'attendances',
    }),
    __metadata("design:type", Array)
], Student.prototype, "attendances", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exam_result_entity_1.ExamResult, {
        foreignKey: 'student_id',
        as: 'examResults',
    }),
    __metadata("design:type", Array)
], Student.prototype, "examResults", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => prayer_entity_1.Prayer, {
        foreignKey: 'student_id',
        as: 'prayers',
    }),
    __metadata("design:type", Array)
], Student.prototype, "prayers", void 0);
exports.Student = Student = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'students',
        timestamps: true,
        underscored: true,
    })
], Student);
//# sourceMappingURL=student.entity.js.map