import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';

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
  async findByStudent(@Param('studentId') studentId: string) {
    const result = await this.resultsService.findByStudent(studentId);
    return new CommonDataResponseDto(result, true, 'Student results retrieved successfully');
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
}

