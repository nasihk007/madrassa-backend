"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentsProviders = void 0;
const parent_entity_1 = require("../entities/parent.entity");
const user_entity_1 = require("../entities/user.entity");
exports.parentsProviders = [
    {
        provide: 'PARENT_REPOSITORY',
        useValue: parent_entity_1.Parent,
    },
    {
        provide: 'USER_REPOSITORY',
        useValue: user_entity_1.User,
    },
];
//# sourceMappingURL=parents.providers.js.map