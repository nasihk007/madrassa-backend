"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ustadsProviders = void 0;
const ustad_entity_1 = require("../entities/ustad.entity");
const user_entity_1 = require("../entities/user.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
exports.ustadsProviders = [
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
    },
    {
        provide: 'USER_REPOSITORY',
        useValue: user_entity_1.User,
    },
    {
        provide: 'CLASS_DIVISION_REPOSITORY',
        useValue: class_division_entity_1.ClassDivision,
    },
];
//# sourceMappingURL=ustads.providers.js.map