"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceProviders = void 0;
const attendance_entity_1 = require("../entities/attendance.entity");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
exports.attendanceProviders = [
    {
        provide: 'ATTENDANCE_REPOSITORY',
        useValue: attendance_entity_1.Attendance,
    },
    {
        provide: 'STUDENT_REPOSITORY',
        useValue: student_entity_1.Student,
    },
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
    },
    {
        provide: 'ACADEMIC_YEAR_REPOSITORY',
        useValue: academic_year_entity_1.AcademicYear,
    },
];
//# sourceMappingURL=attendance.providers.js.map