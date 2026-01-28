"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProviders = void 0;
const user_entity_1 = require("../entities/user.entity");
exports.authProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: user_entity_1.User,
    },
];
//# sourceMappingURL=auth.providers.js.map