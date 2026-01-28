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
exports.AnnouncementsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const user_entity_1 = require("../entities/user.entity");
const dto_1 = require("../shared/dto");
let AnnouncementsService = class AnnouncementsService {
    constructor(announcementRepository) {
        this.announcementRepository = announcementRepository;
    }
    async findAll(pageOptionsDto) {
        const whereClause = {};
        if (pageOptionsDto.query) {
            whereClause.title = { [sequelize_1.Op.iLike]: `%${pageOptionsDto.query}%` };
        }
        if (pageOptionsDto.priority) {
            whereClause.priority = pageOptionsDto.priority;
        }
        const { rows, count } = await this.announcementRepository.findAndCountAll({
            where: whereClause,
            include: [{ model: user_entity_1.User, as: 'createdBy' }],
            limit: pageOptionsDto.takeOrLimit,
            offset: pageOptionsDto.skip,
            order: [['createdAt', pageOptionsDto.order]],
        });
        const pageMetaDto = new dto_1.PageMetaDto({
            pageOptionsDto,
            itemCount: count,
        });
        return new dto_1.CommonDataResponseDto(rows, true, 'Announcements retrieved successfully', pageMetaDto);
    }
    async findOne(id) {
        const announcement = await this.announcementRepository.findOne({
            where: { id },
            include: [{ model: user_entity_1.User, as: 'createdBy' }],
        });
        if (!announcement) {
            throw new common_1.NotFoundException(`Announcement with ID ${id} not found`);
        }
        return announcement;
    }
    async create(createAnnouncementDto) {
        const announcement = await this.announcementRepository.create(createAnnouncementDto);
        return announcement;
    }
    async update(id, updateAnnouncementDto) {
        const announcement = await this.findOne(id);
        await announcement.update(updateAnnouncementDto);
        return announcement;
    }
    async remove(id) {
        const announcement = await this.findOne(id);
        await announcement.destroy();
    }
};
exports.AnnouncementsService = AnnouncementsService;
exports.AnnouncementsService = AnnouncementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ANNOUNCEMENT_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], AnnouncementsService);
//# sourceMappingURL=announcements.service.js.map