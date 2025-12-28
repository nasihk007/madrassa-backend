import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { AcademicYearsService } from './academic-years.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';

@ApiTags('academic-years')
@ApiBearerAuth('JWT-auth')
@Controller('academic-years')
@UseGuards(JwtAuthGuard)
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @ApiOperation({ summary: 'Get all academic years' })
  @ApiResponse({ status: 200, description: 'Academic years retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.academicYearsService.findAll(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Get active academic year' })
  @ApiResponse({ status: 200, description: 'Active academic year retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No active academic year found' })
  @Get('active')
  async findActive() {
    const result = await this.academicYearsService.findActive();
    return new CommonDataResponseDto(result, true, 'Active academic year retrieved successfully');
  }

  @ApiOperation({ summary: 'Get academic year by ID' })
  @ApiParam({ name: 'id', description: 'Academic year ID' })
  @ApiResponse({ status: 200, description: 'Academic year retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Academic year not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.academicYearsService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Academic year retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new academic year' })
  @ApiBody({ type: CreateAcademicYearDto })
  @ApiResponse({ status: 201, description: 'Academic year created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createAcademicYearDto: CreateAcademicYearDto) {
    const result = await this.academicYearsService.create(createAcademicYearDto);
    return new CommonDataResponseDto(result, true, 'Academic year created successfully');
  }

  @ApiOperation({ summary: 'Update academic year by ID' })
  @ApiParam({ name: 'id', description: 'Academic year ID' })
  @ApiBody({ type: UpdateAcademicYearDto })
  @ApiResponse({ status: 200, description: 'Academic year updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Academic year not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAcademicYearDto: UpdateAcademicYearDto) {
    const result = await this.academicYearsService.update(id, updateAcademicYearDto);
    return new CommonDataResponseDto(result, true, 'Academic year updated successfully');
  }

  @ApiOperation({ summary: 'Delete academic year by ID' })
  @ApiParam({ name: 'id', description: 'Academic year ID' })
  @ApiResponse({ status: 200, description: 'Academic year deleted successfully' })
  @ApiResponse({ status: 404, description: 'Academic year not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.academicYearsService.remove(id);
    return new CommonDataResponseDto(null, true, 'Academic year deleted successfully');
  }
}

