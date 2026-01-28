"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsProviders = void 0;
const student_entity_1 = require("../entities/student.entity");
const user_entity_1 = require("../entities/user.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const parent_entity_1 = require("../entities/parent.entity");
exports.studentsProviders = [
    {
        provide: 'STUDENT_REPOSITORY',
        useValue: student_entity_1.Student,
    },
    {
        provide: 'USER_REPOSITORY',
        useValue: user_entity_1.User,
    },
    {
        provide: 'CLASS_DIVISION_REPOSITORY',
        useValue: class_division_entity_1.ClassDivision,
    },
    {
        provide: 'ACADEMIC_YEAR_REPOSITORY',
        useValue: academic_year_entity_1.AcademicYear,
    },
    {
        provide: 'PARENT_REPOSITORY',
        useValue: parent_entity_1.Parent,
    },
];
//# sourceMappingURL=students.providers.js.map