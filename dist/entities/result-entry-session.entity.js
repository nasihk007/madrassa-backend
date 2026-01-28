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
exports.ResultEntrySession = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_entity_1 = require("./student.entity");
const ustad_entity_1 = require("./ustad.entity");
const academic_year_entity_1 = require("./academic-year.entity");
const exam_result_entity_1 = require("./exam-result.entity");
let ResultEntrySession = class ResultEntrySession extends sequelize_typescript_1.Model {
};
exports.ResultEntrySession = ResultEntrySession;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], ResultEntrySession.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_entity_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        field: 'student_id',
    }),
    __metadata("design:type", String)
], ResultEntrySession.prototype, "studentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('first_term', 'mid_term', 'annual'),
        allowNull: false,
        field: 'exam_type',
    }),
    __metadata("design:type", String)
], ResultEntrySession.prototype, "examType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        field: 'exam_date',
    }),
    __metadata("design:type", Date)
], ResultEntrySession.prototype, "examDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => academic_year_entity_1.AcademicYear),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        field: 'academic_year_id',
    }),
    __metadata("design:type", String)
], ResultEntrySession.prototype, "academicYearId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ustad_entity_1.Ustad),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        field: 'marked_by_id',
    }),
    __metadata("design:type", String)
], ResultEntrySession.prototype, "markedById", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('draft', 'submitted'),
        allowNull: false,
        defaultValue: 'draft',
    }),
    __metadata("design:type", String)
], ResultEntrySession.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'total_marks',
    }),
    __metadata("design:type", Number)
], ResultEntrySession.prototype, "totalMarks", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'total_possible_marks',
    }),
    __metadata("design:type", Number)
], ResultEntrySession.prototype, "totalPossibleMarks", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
        field: 'total_hajers',
    }),
    __metadata("design:type", Number)
], ResultEntrySession.prototype, "totalHajers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'class_rank',
    }),
    __metadata("design:type", Number)
], ResultEntrySession.prototype, "classRank", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], ResultEntrySession.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], ResultEntrySession.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.Student),
    __metadata("design:type", student_entity_1.Student)
], ResultEntrySession.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ustad_entity_1.Ustad),
    __metadata("design:type", ustad_entity_1.Ustad)
], ResultEntrySession.prototype, "markedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => academic_year_entity_1.AcademicYear),
    __metadata("design:type", academic_year_entity_1.AcademicYear)
], ResultEntrySession.prototype, "academicYear", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exam_result_entity_1.ExamResult, {
        foreignKey: 'result_entry_session_id',
        as: 'examResults',
    }),
    __metadata("design:type", Array)
], ResultEntrySession.prototype, "examResults", void 0);
exports.ResultEntrySession = ResultEntrySession = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'result_entry_sessions',
        timestamps: true,
        underscored: true,
    })
], ResultEntrySession);
//# sourceMappingURL=result-entry-session.entity.js.map