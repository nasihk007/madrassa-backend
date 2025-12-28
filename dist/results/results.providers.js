"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsProviders = void 0;
const exam_result_entity_1 = require("../entities/exam-result.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
exports.resultsProviders = [
    {
        provide: 'EXAM_RESULT_REPOSITORY',
        useValue: exam_result_entity_1.ExamResult,
    },
    {
        provide: 'USTAD_REPOSITORY',
        useValue: ustad_entity_1.Ustad,
    },
];
//# sourceMappingURL=results.providers.js.map