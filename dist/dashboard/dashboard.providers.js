"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardProviders = void 0;
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const attendance_entity_1 = require("../entities/attendance.entity");
const prayer_entity_1 = require("../entities/prayer.entity");
const announcement_entity_1 = require("../entities/announcement.entity");
exports.dashboardProviders = [
    {
        provide: 'STUDENT_REPOSITORY',
        useValue: student_entity_1.Student,
    },
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
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
        provide: 'ATTENDANCE_REPOSITORY',
        useValue: attendance_entity_1.Attendance,
    },
    {
        provide: 'PRAYER_REPOSITORY',
        useValue: prayer_entity_1.Prayer,
    },
    {
        provide: 'ANNOUNCEMENT_REPOSITORY',
        useValue: announcement_entity_1.Announcement,
    },
];
//# sourceMappingURL=dashboard.providers.js.map