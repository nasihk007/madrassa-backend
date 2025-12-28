import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';

@ApiTags('announcements')
@ApiBearerAuth('JWT-auth')
@Controller('announcements')
@UseGuards(JwtAuthGuard)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.announcementsService.findAll(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.announcementsService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Announcement retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createAnnouncementDto: any) {
    const result = await this.announcementsService.create(createAnnouncementDto);
    return new CommonDataResponseDto(result, true, 'Announcement created successfully');
  }

  @ApiOperation({ summary: 'Update item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAnnouncementDto: any) {
    const result = await this.announcementsService.update(id, updateAnnouncementDto);
    return new CommonDataResponseDto(result, true, 'Announcement updated successfully');
  }

  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.announcementsService.remove(id);
    return new CommonDataResponseDto(null, true, 'Announcement deleted successfully');
  }
}

