import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { PrayerService } from './prayer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { BulkCreatePrayerDto } from './dto/bulk-create-prayer.dto';

@ApiTags('prayer')
@ApiBearerAuth('JWT-auth')
@Controller('prayer')
@UseGuards(JwtAuthGuard)
export class PrayerController {
  constructor(private readonly prayerService: PrayerService) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    return await this.prayerService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
  }

  @Get('student/:studentId')
  async findByStudent(@Param('studentId') studentId: string, @Query() pageOptionsDto: PageOptionsDto) {
    const result = await this.prayerService.findByStudent(studentId, pageOptionsDto);
    return new CommonDataResponseDto(result, true, 'Student prayer records retrieved successfully');
  }

  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.prayerService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Prayer record retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new prayer record' })
  @ApiBody({ type: CreatePrayerDto })
  @ApiResponse({ status: 201, description: 'Prayer record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createPrayerDto: CreatePrayerDto) {
    const result = await this.prayerService.create(createPrayerDto);
    return new CommonDataResponseDto(result, true, 'Prayer record created successfully');
  }

  @ApiOperation({ summary: 'Bulk create or update prayer records' })
  @ApiBody({ type: BulkCreatePrayerDto })
  @ApiResponse({ status: 201, description: 'Bulk prayer records saved successfully' })
  @Post('bulk')
  async bulkUpsert(@Body() bulkCreateDto: BulkCreatePrayerDto, @Request() req) {
    const result = await this.prayerService.bulkUpsert(bulkCreateDto.records, req.user?.id);
    return new CommonDataResponseDto(result, true, 'Bulk prayer records saved successfully');
  }

  @ApiOperation({ summary: 'Update prayer record by ID' })
  @ApiParam({ name: 'id', description: 'Prayer record ID' })
  @ApiBody({ type: UpdatePrayerDto })
  @ApiResponse({ status: 200, description: 'Prayer record updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Prayer record not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePrayerDto: UpdatePrayerDto) {
    const result = await this.prayerService.update(id, updatePrayerDto);
    return new CommonDataResponseDto(result, true, 'Prayer record updated successfully');
  }

  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.prayerService.remove(id);
    return new CommonDataResponseDto(null, true, 'Prayer record deleted successfully');
  }
}

