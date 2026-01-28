"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prayerProviders = void 0;
const prayer_entity_1 = require("../entities/prayer.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
exports.prayerProviders = [
    {
        provide: 'PRAYER_REPOSITORY',
        useValue: prayer_entity_1.Prayer,
    },
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
    },
];
//# sourceMappingURL=prayer.providers.js.map