import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto, PageOptionsDto } from '../shared/dto';

@ApiTags('students')
@ApiBearerAuth('JWT-auth')
@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'List of all students retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    const result = await this.studentsService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
    return result;
  }

  @ApiOperation({ summary: 'Get student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.studentsService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Student retrieved successfully');
  }

  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const result = await this.studentsService.create(createStudentDto);
    return new CommonDataResponseDto(result, true, 'Student created successfully');
  }

  @ApiOperation({ summary: 'Update student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const result = await this.studentsService.update(id, updateStudentDto);
    return new CommonDataResponseDto(result, true, 'Student updated successfully');
  }

  @ApiOperation({ summary: 'Delete student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.studentsService.remove(id);
    return new CommonDataResponseDto(null, true, 'Student deleted successfully');
  }
}
