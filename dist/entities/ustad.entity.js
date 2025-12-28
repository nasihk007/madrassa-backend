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
exports.Ustad = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("./user.entity");
const class_division_entity_1 = require("./class-division.entity");
const attendance_entity_1 = require("./attendance.entity");
const prayer_entity_1 = require("./prayer.entity");
const exam_result_entity_1 = require("./exam-result.entity");
let Ustad = class Ustad extends sequelize_typescript_1.Model {
};
exports.Ustad = Ustad;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Ustad.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ustad.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Ustad.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Ustad.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ustad.prototype, "specialization", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ustad.prototype, "qualification", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        field: 'joining_date',
    }),
    __metadata("design:type", Date)
], Ustad.prototype, "joiningDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'user_id',
    }),
    __metadata("design:type", String)
], Ustad.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], Ustad.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], Ustad.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Ustad.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => class_division_entity_1.ClassDivision, {
        foreignKey: 'ustad_id',
        as: 'assignedClasses',
    }),
    __metadata("design:type", Array)
], Ustad.prototype, "assignedClasses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => attendance_entity_1.Attendance, {
        foreignKey: 'marked_by_id',
        as: 'markedAttendances',
    }),
    __metadata("design:type", Array)
], Ustad.prototype, "markedAttendances", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => prayer_entity_1.Prayer, {
        foreignKey: 'marked_by_id',
        as: 'markedPrayers',
    }),
    __metadata("design:type", Array)
], Ustad.prototype, "markedPrayers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => exam_result_entity_1.ExamResult, {
        foreignKey: 'marked_by_id',
        as: 'markedResults',
    }),
    __metadata("design:type", Array)
], Ustad.prototype, "markedResults", void 0);
exports.Ustad = Ustad = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'ustads',
        timestamps: true,
        underscored: true,
    })
], Ustad);
//# sourceMappingURL=ustad.entity.js.map