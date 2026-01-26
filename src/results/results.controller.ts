import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { CreateBulkResultEntryDto } from './dto/create-bulk-result-entry.dto';
import { ApproveResultsDto } from './dto/approve-results.dto';
import { PublishResultsDto } from './dto/publish-results.dto';
import { UserRole } from '../entities/user.entity';

@ApiTags('results')
@ApiBearerAuth('JWT-auth')
@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    return await this.resultsService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
  }

  @Get('student/:studentId')
  async findByStudent(@Param('studentId') studentId: string, @Request() req) {
    // Check if user is a parent (either by role or by parent_id in token)
    // When parent logs in as student, token has role="student" but also has parent_id
    const user = req.user as any;
    const isParent = user?.role === 'parent' || user?.role === UserRole.PARENT || !!user?.parent_id;
    const result = await this.resultsService.findByStudent(studentId, user?.id, isParent ? 'parent' : user?.role);
    return new CommonDataResponseDto(result, true, 'Student results retrieved successfully');
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending results' })
  async getPendingResults(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    // Only admin can see pending results
    if (req.user?.role !== 'admin') {
      throw new Error('Only admin can view pending results');
    }
    const whereClause: any = { status: 'pending' };
    const result = await this.resultsService.findAll({ ...pageOptionsDto, ...whereClause } as PageOptionsDto, req.user?.id, req.user?.role);
    return result;
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published results' })
  async getPublishedResults(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    return await this.resultsService.getPublishedResults(pageOptionsDto, req.user?.id, req.user?.role);
  }

  @Get('class/:classDivisionId')
  @ApiOperation({ summary: 'Get results by class' })
  @ApiParam({ name: 'classDivisionId', description: 'Class Division ID' })
  async getByClass(@Param('classDivisionId') classDivisionId: string, @Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    // This will filter by class through student relationship
    const result = await this.resultsService.findAll({ ...pageOptionsDto, classDivisionId } as PageOptionsDto, req.user?.id, req.user?.role);
    return result;
  }

  @Get('rank/:classDivisionId/:examType')
  @ApiOperation({ summary: 'Get class ranking' })
  @ApiParam({ name: 'classDivisionId', description: 'Class Division ID' })
  @ApiParam({ name: 'examType', description: 'Exam Type' })
  async getRank(@Param('classDivisionId') classDivisionId: string, @Param('examType') examType: string, @Query('academicYearId') academicYearId?: string) {
    // Recalculate ranks to ensure they're up to date
    await this.resultsService.calculateRank(examType, classDivisionId, academicYearId);
    
    // Get all results for the class and exam type
    const results = await this.resultsService.findAll({
      examType,
      classDivisionId,
      academicYearId,
      take: 100,
    } as PageOptionsDto);
    
    // Group by student and return ranking
    return results;
  }

  @Get('progress-card/:studentId')
  @ApiOperation({ summary: 'Get progress card data' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  async getProgressCard(@Param('studentId') studentId: string, @Query('examType') examType?: string) {
    const results = await this.resultsService.findByStudent(studentId);
    
    // Filter by exam type if provided
    let filteredResults = results;
    if (examType) {
      filteredResults = results.filter(r => r.examType === examType);
    }
    
    return new CommonDataResponseDto(filteredResults, true, 'Progress card data retrieved successfully');
  }

  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.resultsService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Result retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new exam result' })
  @ApiBody({ type: CreateExamResultDto })
  @ApiResponse({ status: 201, description: 'Exam result created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createResultDto: CreateExamResultDto) {
    const result = await this.resultsService.create(createResultDto);
    return new CommonDataResponseDto(result, true, 'Exam result created successfully');
  }

  @ApiOperation({ summary: 'Update exam result by ID' })
  @ApiParam({ name: 'id', description: 'Exam result ID' })
  @ApiBody({ type: UpdateExamResultDto })
  @ApiResponse({ status: 200, description: 'Exam result updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Exam result not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateResultDto: UpdateExamResultDto) {
    const result = await this.resultsService.update(id, updateResultDto);
    return new CommonDataResponseDto(result, true, 'Exam result updated successfully');
  }

  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.resultsService.remove(id);
    return new CommonDataResponseDto(null, true, 'Result deleted successfully');
  }

  @Post('bulk-entry')
  @ApiOperation({ summary: 'Create bulk result entry' })
  @ApiBody({ type: CreateBulkResultEntryDto })
  @ApiResponse({ status: 201, description: 'Bulk result entry created successfully' })
  async createBulkEntry(@Body() createBulkEntryDto: CreateBulkResultEntryDto, @Request() req) {
    const result = await this.resultsService.createBulkEntry(createBulkEntryDto, req.user?.id);
    return new CommonDataResponseDto(result, true, 'Bulk result entry created successfully');
  }

  @Post('approve')
  @ApiOperation({ summary: 'Approve results by exam type' })
  @ApiBody({ type: ApproveResultsDto })
  @ApiResponse({ status: 200, description: 'Results approved successfully' })
  async approveResults(@Body() approveResultsDto: ApproveResultsDto, @Request() req) {
    // Only admin can approve
    if (req.user?.role !== 'admin') {
      throw new Error('Only admin can approve results');
    }
    const count = await this.resultsService.approveResults(approveResultsDto, req.user.id);
    return new CommonDataResponseDto({ count }, true, `Successfully approved ${count} results`);
  }

  @Post('publish')
  @ApiOperation({ summary: 'Publish approved results' })
  @ApiBody({ type: PublishResultsDto })
  @ApiResponse({ status: 200, description: 'Results published successfully' })
  async publishResults(@Body() publishResultsDto: PublishResultsDto, @Request() req) {
    // Only admin can publish
    if (req.user?.role !== 'admin') {
      throw new Error('Only admin can publish results');
    }
    const count = await this.resultsService.publishResults(publishResultsDto, req.user.id);
    return new CommonDataResponseDto({ count }, true, `Successfully published ${count} results`);
  }
}

