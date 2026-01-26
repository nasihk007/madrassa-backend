"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsProviders = void 0;
const exam_result_entity_1 = require("../entities/exam-result.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const result_entry_session_entity_1 = require("../entities/result-entry-session.entity");
const attendance_entity_1 = require("../entities/attendance.entity");
const student_entity_1 = require("../entities/student.entity");
const parent_entity_1 = require("../entities/parent.entity");
exports.resultsProviders = [
    {
        provide: 'EXAM_RESULT_REPOSITORY',
        useValue: exam_result_entity_1.ExamResult,
    },
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
    },
    {
        provide: 'RESULT_ENTRY_SESSION_REPOSITORY',
        useValue: result_entry_session_entity_1.ResultEntrySession,
    },
    {
        provide: 'ATTENDANCE_REPOSITORY',
        useValue: attendance_entity_1.Attendance,
    },
    {
        provide: 'STUDENT_REPOSITORY',
        useValue: student_entity_1.Student,
    },
    {
        provide: 'PARENT_REPOSITORY',
        useValue: parent_entity_1.Parent,
    },
];
//# sourceMappingURL=results.providers.js.map