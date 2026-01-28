"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicYearsProviders = void 0;
const academic_year_entity_1 = require("../entities/academic-year.entity");
exports.academicYearsProviders = [
    {
        provide: 'ACADEMIC_YEAR_REPOSITORY',
        useValue: academic_year_entity_1.AcademicYear,
    },
];
//# sourceMappingURL=academic-years.providers.js.map