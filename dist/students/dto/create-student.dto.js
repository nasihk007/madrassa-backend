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
exports.CreateStudentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateStudentDto {
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student full name',
        example: 'Ahmed Hassan',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student address',
        example: '123 Main Street, City, Country',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student roll number',
        example: 'STU2024001',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "rollNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Legacy guardian name (deprecated)',
        required: false,
        example: 'Hassan Ali',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Legacy guardian phone number (deprecated)',
        required: false,
        example: '+1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "guardianPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admission date',
        example: '2024-01-15',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "admissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class division ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "classDivisionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academic year ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "academicYearId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Existing parent identifier (if selecting an existing parent)',
        required: false,
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parent full name (required when creating a new parent)',
        example: 'Hassan Ali',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parent email address (required when creating a new parent)',
        example: 'parent@example.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parent phone number',
        example: '+1234567890',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parent address',
        example: '123 Main Street, City, Country',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parent account password (required when creating a new parent)',
        example: 'parentPass123',
        minLength: 6,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentPassword", void 0);
//# sourceMappingURL=create-student.dto.js.map