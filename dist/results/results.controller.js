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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const results_service_1 = require("./results.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_data_response_dto_1 = require("../shared/dto/common-data-response.dto");
const page_options_dto_1 = require("../shared/dto/page-options.dto");
const create_exam_result_dto_1 = require("./dto/create-exam-result.dto");
const update_exam_result_dto_1 = require("./dto/update-exam-result.dto");
const create_bulk_result_entry_dto_1 = require("./dto/create-bulk-result-entry.dto");
const approve_results_dto_1 = require("./dto/approve-results.dto");
const publish_results_dto_1 = require("./dto/publish-results.dto");
const user_entity_1 = require("../entities/user.entity");
let ResultsController = class ResultsController {
    constructor(resultsService) {
        this.resultsService = resultsService;
    }
    async findAll(pageOptionsDto, req) {
        return await this.resultsService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
    }
    async findByStudent(studentId, req) {
        const user = req.user;
        const isParent = user?.role === 'parent' || user?.role === user_entity_1.UserRole.PARENT || !!user?.parent_id;
        const result = await this.resultsService.findByStudent(studentId, user?.id, isParent ? 'parent' : user?.role);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Student results retrieved successfully');
    }
    async getPendingResults(pageOptionsDto, req) {
        if (req.user?.role !== 'admin') {
            throw new Error('Only admin can view pending results');
        }
        const whereClause = { status: 'pending' };
        const result = await this.resultsService.findAll({ ...pageOptionsDto, ...whereClause }, req.user?.id, req.user?.role);
        return result;
    }
    async getPublishedResults(pageOptionsDto, req) {
        return await this.resultsService.getPublishedResults(pageOptionsDto, req.user?.id, req.user?.role);
    }
    async getByClass(classDivisionId, pageOptionsDto, req) {
        const result = await this.resultsService.findAll({ ...pageOptionsDto, classDivisionId }, req.user?.id, req.user?.role);
        return result;
    }
    async getRank(classDivisionId, examType, academicYearId) {
        await this.resultsService.calculateRank(examType, classDivisionId, academicYearId);
        const results = await this.resultsService.findAll({
            examType,
            classDivisionId,
            academicYearId,
            take: 100,
        });
        return results;
    }
    async getProgressCard(studentId, examType) {
        const results = await this.resultsService.findByStudent(studentId);
        let filteredResults = results;
        if (examType) {
            filteredResults = results.filter(r => r.examType === examType);
        }
        return new common_data_response_dto_1.CommonDataResponseDto(filteredResults, true, 'Progress card data retrieved successfully');
    }
    async findOne(id) {
        const result = await this.resultsService.findOne(id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Result retrieved successfully');
    }
    async create(createResultDto) {
        const result = await this.resultsService.create(createResultDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Exam result created successfully');
    }
    async update(id, updateResultDto) {
        const result = await this.resultsService.update(id, updateResultDto);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Exam result updated successfully');
    }
    async remove(id) {
        await this.resultsService.remove(id);
        return new common_data_response_dto_1.CommonDataResponseDto(null, true, 'Result deleted successfully');
    }
    async createBulkEntry(createBulkEntryDto, req) {
        const result = await this.resultsService.createBulkEntry(createBulkEntryDto, req.user?.id);
        return new common_data_response_dto_1.CommonDataResponseDto(result, true, 'Bulk result entry created successfully');
    }
    async approveResults(approveResultsDto, req) {
        if (req.user?.role !== 'admin') {
            throw new Error('Only admin can approve results');
        }
        const count = await this.resultsService.approveResults(approveResultsDto, req.user.id);
        return new common_data_response_dto_1.CommonDataResponseDto({ count }, true, `Successfully approved ${count} results`);
    }
    async publishResults(publishResultsDto, req) {
        if (req.user?.role !== 'admin') {
            throw new Error('Only admin can publish results');
        }
        const count = await this.resultsService.publishResults(publishResultsDto, req.user.id);
        return new common_data_response_dto_1.CommonDataResponseDto({ count }, true, `Successfully published ${count} results`);
    }
};
exports.ResultsController = ResultsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Items retrieved successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending results' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getPendingResults", null);
__decorate([
    (0, common_1.Get)('published'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published results' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getPublishedResults", null);
__decorate([
    (0, common_1.Get)('class/:classDivisionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get results by class' }),
    (0, swagger_1.ApiParam)({ name: 'classDivisionId', description: 'Class Division ID' }),
    __param(0, (0, common_1.Param)('classDivisionId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getByClass", null);
__decorate([
    (0, common_1.Get)('rank/:classDivisionId/:examType'),
    (0, swagger_1.ApiOperation)({ summary: 'Get class ranking' }),
    (0, swagger_1.ApiParam)({ name: 'classDivisionId', description: 'Class Division ID' }),
    (0, swagger_1.ApiParam)({ name: 'examType', description: 'Exam Type' }),
    __param(0, (0, common_1.Param)('classDivisionId')),
    __param(1, (0, common_1.Param)('examType')),
    __param(2, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getRank", null);
__decorate([
    (0, common_1.Get)('progress-card/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get progress card data' }),
    (0, swagger_1.ApiParam)({ name: 'studentId', description: 'Student ID' }),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Query)('examType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getProgressCard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new exam result' }),
    (0, swagger_1.ApiBody)({ type: create_exam_result_dto_1.CreateExamResultDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Exam result created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_result_dto_1.CreateExamResultDto]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update exam result by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Exam result ID' }),
    (0, swagger_1.ApiBody)({ type: update_exam_result_dto_1.UpdateExamResultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Exam result updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Exam result not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exam_result_dto_1.UpdateExamResultDto]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-entry'),
    (0, swagger_1.ApiOperation)({ summary: 'Create bulk result entry' }),
    (0, swagger_1.ApiBody)({ type: create_bulk_result_entry_dto_1.CreateBulkResultEntryDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bulk result entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bulk_result_entry_dto_1.CreateBulkResultEntryDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "createBulkEntry", null);
__decorate([
    (0, common_1.Post)('approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve results by exam type' }),
    (0, swagger_1.ApiBody)({ type: approve_results_dto_1.ApproveResultsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Results approved successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_results_dto_1.ApproveResultsDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "approveResults", null);
__decorate([
    (0, common_1.Post)('publish'),
    (0, swagger_1.ApiOperation)({ summary: 'Publish approved results' }),
    (0, swagger_1.ApiBody)({ type: publish_results_dto_1.PublishResultsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Results published successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publish_results_dto_1.PublishResultsDto, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "publishResults", null);
exports.ResultsController = ResultsController = __decorate([
    (0, swagger_1.ApiTags)('results'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('results'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [results_service_1.ResultsService])
], ResultsController);
//# sourceMappingURL=results.controller.js.map