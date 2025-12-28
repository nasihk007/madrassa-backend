import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';

@ApiTags('classes')
@ApiBearerAuth('JWT-auth')
@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    return await this.classesService.findAll(pageOptionsDto, req.user?.id, req.user?.role);
  }

  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.classesService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Class retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createClassDto: any) {
    const result = await this.classesService.create(createClassDto);
    return new CommonDataResponseDto(result, true, 'Class created successfully');
  }

  @ApiOperation({ summary: 'Update item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClassDto: any) {
    const result = await this.classesService.update(id, updateClassDto);
    return new CommonDataResponseDto(result, true, 'Class updated successfully');
  }

  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.classesService.remove(id);
    return new CommonDataResponseDto(null, true, 'Class deleted successfully');
  }
}

