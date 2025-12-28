"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesProviders = void 0;
const class_division_entity_1 = require("../entities/class-division.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
exports.classesProviders = [
    {
        provide: 'CLASS_DIVISION_REPOSITORY',
        useValue: class_division_entity_1.ClassDivision,
    },
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
    },
];
//# sourceMappingURL=classes.providers.js.map