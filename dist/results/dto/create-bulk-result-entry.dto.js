"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBulkResultEntryDto = exports.SubjectEntryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SubjectEntryDto {
}
exports.SubjectEntryDto = SubjectEntryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubjectEntryDto.prototype, "subjectName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SubjectEntryDto.prototype, "marks", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SubjectEntryDto.prototype, "totalMarks", void 0);
class CreateBulkResultEntryDto {
}
exports.CreateBulkResultEntryDto = CreateBulkResultEntryDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBulkResultEntryDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['first_term', 'mid_term', 'annual']),
    __metadata("design:type", String)
], CreateBulkResultEntryDto.prototype, "examType", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBulkResultEntryDto.prototype, "examDate", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBulkResultEntryDto.prototype, "academicYearId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubjectEntryDto),
    __metadata("design:type", Array)
], CreateBulkResultEntryDto.prototype, "subjects", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['pass', 'fail']),
    __metadata("design:type", String)
], CreateBulkResultEntryDto.prototype, "passFailStatus", void 0);
//# sourceMappingURL=create-bulk-result-entry.dto.js.map