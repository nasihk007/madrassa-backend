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
exports.Announcement = exports.AnnouncementPriority = exports.AnnouncementVisibility = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("./user.entity");
var AnnouncementVisibility;
(function (AnnouncementVisibility) {
    AnnouncementVisibility["ALL"] = "all";
    AnnouncementVisibility["ADMIN"] = "admin";
    AnnouncementVisibility["USTAD"] = "ustad";
    AnnouncementVisibility["PARENT"] = "parent";
})(AnnouncementVisibility || (exports.AnnouncementVisibility = AnnouncementVisibility = {}));
var AnnouncementPriority;
(function (AnnouncementPriority) {
    AnnouncementPriority["LOW"] = "low";
    AnnouncementPriority["MEDIUM"] = "medium";
    AnnouncementPriority["HIGH"] = "high";
})(AnnouncementPriority || (exports.AnnouncementPriority = AnnouncementPriority = {}));
let Announcement = class Announcement extends sequelize_typescript_1.Model {
};
exports.Announcement = Announcement;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('all', 'admin', 'ustad', 'parent'),
        allowNull: false,
        defaultValue: 'all',
        field: 'visible_to',
    }),
    __metadata("design:type", String)
], Announcement.prototype, "visibleTo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
    }),
    __metadata("design:type", String)
], Announcement.prototype, "priority", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
        field: 'created_by_id',
    }),
    __metadata("design:type", String)
], Announcement.prototype, "createdById", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], Announcement.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], Announcement.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Announcement.prototype, "createdBy", void 0);
exports.Announcement = Announcement = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'announcements',
        timestamps: true,
        underscored: true,
    })
], Announcement);
//# sourceMappingURL=announcement.entity.js.map