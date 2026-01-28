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
exports.Prayer = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_entity_1 = require("./student.entity");
const ustad_entity_1 = require("./ustad.entity");
const academic_year_entity_1 = require("./academic-year.entity");
let Prayer = class Prayer extends sequelize_typescript_1.Model {
};
exports.Prayer = Prayer;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Prayer.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Prayer.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Prayer.prototype, "fajr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Prayer.prototype, "dhuhr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Prayer.prototype, "asr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Prayer.prototype, "maghrib", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Prayer.prototype, "isha", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_entity_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'student_id',
    }),
    __metadata("design:type", String)
], Prayer.prototype, "studentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ustad_entity_1.Ustad),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'marked_by_id',
    }),
    __metadata("design:type", String)
], Prayer.prototype, "markedById", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => academic_year_entity_1.AcademicYear),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'academic_year_id',
    }),
    __metadata("design:type", String)
], Prayer.prototype, "academicYearId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], Prayer.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], Prayer.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.Student),
    __metadata("design:type", student_entity_1.Student)
], Prayer.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ustad_entity_1.Ustad),
    __metadata("design:type", ustad_entity_1.Ustad)
], Prayer.prototype, "markedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => academic_year_entity_1.AcademicYear),
    __metadata("design:type", academic_year_entity_1.AcademicYear)
], Prayer.prototype, "academicYear", void 0);
exports.Prayer = Prayer = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'prayers',
        timestamps: true,
        underscored: true,
    })
], Prayer);
//# sourceMappingURL=prayer.entity.js.map