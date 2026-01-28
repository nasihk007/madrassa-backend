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
exports.Parent = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("./user.entity");
const student_entity_1 = require("./student.entity");
let Parent = class Parent extends sequelize_typescript_1.Model {
};
exports.Parent = Parent;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Parent.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Parent.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Parent.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Parent.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Parent.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        field: 'user_id',
    }),
    __metadata("design:type", String)
], Parent.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_entity_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'active_student_id',
    }),
    __metadata("design:type", String)
], Parent.prototype, "activeStudentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Parent.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.Student, {
        foreignKey: 'active_student_id',
        constraints: false,
        as: 'activeStudent',
    }),
    __metadata("design:type", student_entity_1.Student)
], Parent.prototype, "activeStudent", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_entity_1.Student, {
        foreignKey: 'parent_id',
        as: 'students',
    }),
    __metadata("design:type", Array)
], Parent.prototype, "students", void 0);
exports.Parent = Parent = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'parents',
        timestamps: true,
        underscored: true,
    })
], Parent);
//# sourceMappingURL=parent.entity.js.map