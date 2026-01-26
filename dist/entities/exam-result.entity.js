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
exports.ExamResult = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_entity_1 = require("./student.entity");
const ustad_entity_1 = require("./ustad.entity");
const academic_year_entity_1 = require("./academic-year.entity");
let ExamResult = class ExamResult extends sequelize_typescript_1.Model {
};
exports.ExamResult = ExamResult;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "subject", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ExamResult.prototype, "marks", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: 'total_marks',
    }),
    __metadata("design:type", Number)
], ExamResult.prototype, "totalMarks", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: 'exam_type',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "examType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        field: 'exam_date',
    }),
    __metadata("design:type", Date)
], ExamResult.prototype, "examDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(5),
        allowNull: true,
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "grade", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_entity_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'student_id',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "studentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ustad_entity_1.Ustad),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'marked_by_id',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "markedById", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => academic_year_entity_1.AcademicYear),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'academic_year_id',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "academicYearId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'approved', 'published'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ustad_entity_1.Ustad),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'approved_by_id',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "approvedById", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: 'approved_at',
    }),
    __metadata("design:type", Date)
], ExamResult.prototype, "approvedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: 'published_at',
    }),
    __metadata("design:type", Date)
], ExamResult.prototype, "publishedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_pass_fail',
    }),
    __metadata("design:type", Boolean)
], ExamResult.prototype, "isPassFail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pass', 'fail'),
        allowNull: true,
        field: 'pass_fail_status',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "passFailStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'total_marks_calculated',
    }),
    __metadata("design:type", Number)
], ExamResult.prototype, "totalMarksCalculated", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
        field: 'total_hajers',
    }),
    __metadata("design:type", Number)
], ExamResult.prototype, "totalHajers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'class_rank',
    }),
    __metadata("design:type", Number)
], ExamResult.prototype, "classRank", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'total_possible_marks',
    }),
    __metadata("design:type", Number)
], ExamResult.prototype, "totalPossibleMarks", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'result_entry_session_id',
    }),
    __metadata("design:type", String)
], ExamResult.prototype, "resultEntrySessionId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], ExamResult.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], ExamResult.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.Student),
    __metadata("design:type", student_entity_1.Student)
], ExamResult.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ustad_entity_1.Ustad),
    __metadata("design:type", ustad_entity_1.Ustad)
], ExamResult.prototype, "markedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ustad_entity_1.Ustad, { foreignKey: 'approved_by_id' }),
    __metadata("design:type", ustad_entity_1.Ustad)
], ExamResult.prototype, "approvedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => academic_year_entity_1.AcademicYear),
    __metadata("design:type", academic_year_entity_1.AcademicYear)
], ExamResult.prototype, "academicYear", void 0);
exports.ExamResult = ExamResult = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'exam_results',
        timestamps: true,
        underscored: true,
    })
], ExamResult);
//# sourceMappingURL=exam-result.entity.js.map