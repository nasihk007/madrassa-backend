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
exports.ClassDivision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_entity_1 = require("./student.entity");
const ustad_entity_1 = require("./ustad.entity");
let ClassDivision = class ClassDivision extends sequelize_typescript_1.Model {
};
exports.ClassDivision = ClassDivision;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], ClassDivision.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        field: 'class_name',
    }),
    __metadata("design:type", String)
], ClassDivision.prototype, "className", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(5),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ClassDivision.prototype, "division", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 30,
    }),
    __metadata("design:type", Number)
], ClassDivision.prototype, "capacity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ustad_entity_1.Ustad),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'ustad_id',
    }),
    __metadata("design:type", String)
], ClassDivision.prototype, "ustadId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], ClassDivision.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], ClassDivision.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_entity_1.Student, {
        foreignKey: 'class_division_id',
        as: 'students',
    }),
    __metadata("design:type", Array)
], ClassDivision.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ustad_entity_1.Ustad, {
        foreignKey: 'ustad_id',
        as: 'assignedUstad',
    }),
    __metadata("design:type", ustad_entity_1.Ustad)
], ClassDivision.prototype, "assignedUstad", void 0);
exports.ClassDivision = ClassDivision = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'class_divisions',
        timestamps: true,
        underscored: true,
    })
], ClassDivision);
//# sourceMappingURL=class-division.entity.js.map