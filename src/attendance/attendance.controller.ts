import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@ApiTags('attendance')
@ApiBearerAuth('JWT-auth')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    return await this.attendanceService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
  }

  @Get('by-date')
  async findByDate(@Query('date') date: string) {
    const result = await this.attendanceService.findByDate(date);
    return new CommonDataResponseDto(result, true, 'Attendance records by date retrieved successfully');
  }

  @Get('student/:studentId')
  async findByStudent(@Param('studentId') studentId: string) {
    const result = await this.attendanceService.findByStudent(studentId);
    return new CommonDataResponseDto(result, true, 'Student attendance records retrieved successfully');
  }

  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.attendanceService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Attendance record retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new attendance record' })
  @ApiBody({ type: CreateAttendanceDto })
  @ApiResponse({ status: 201, description: 'Attendance record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const result = await this.attendanceService.create(createAttendanceDto);
    return new CommonDataResponseDto(result, true, 'Attendance record created successfully');
  }

  @ApiOperation({ summary: 'Update attendance record by ID' })
  @ApiParam({ name: 'id', description: 'Attendance record ID' })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Attendance record updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Attendance record not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    const result = await this.attendanceService.update(id, updateAttendanceDto);
    return new CommonDataResponseDto(result, true, 'Attendance record updated successfully');
  }

  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.attendanceService.remove(id);
    return new CommonDataResponseDto(null, true, 'Attendance record deleted successfully');
  }
}

