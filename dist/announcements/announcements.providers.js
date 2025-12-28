"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementsProviders = void 0;
const announcement_entity_1 = require("../entities/announcement.entity");
exports.announcementsProviders = [
    {
        provide: 'ANNOUNCEMENT_REPOSITORY',
        useValue: announcement_entity_1.Announcement,
    },
];
//# sourceMappingURL=announcements.providers.js.map