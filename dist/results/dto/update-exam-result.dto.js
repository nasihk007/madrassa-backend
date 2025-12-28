"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExamResultDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_exam_result_dto_1 = require("./create-exam-result.dto");
class UpdateExamResultDto extends (0, mapped_types_1.PartialType)(create_exam_result_dto_1.CreateExamResultDto) {
}
exports.UpdateExamResultDto = UpdateExamResultDto;
//# sourceMappingURL=update-exam-result.dto.js.map