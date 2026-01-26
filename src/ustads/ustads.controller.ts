import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UstadsService } from './ustads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateUstadDto } from './dto/create-ustad.dto';
import { UpdateUstadDto } from './dto/update-ustad.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { ClassesService } from '../classes/classes.service';

@ApiTags('ustads')
@ApiBearerAuth('JWT-auth')
@Controller('ustads')
@UseGuards(JwtAuthGuard)
export class UstadsController {
  constructor(
    private readonly ustadsService: UstadsService,
    private readonly classesService: ClassesService,
  ) {}

  @ApiOperation({ summary: 'Get all ustads' })
  @ApiResponse({ status: 200, description: 'Ustads retrieved successfully' })
  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.ustadsService.findAll(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Get current user ustad profile' })
  @ApiResponse({ status: 200, description: 'Ustad profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Ustad profile not found' })
  @Get('my-profile')
  async getMyProfile(@Request() req) {
    const ustad = await this.ustadsService.getUstadByUserId(req.user.id);
    if (!ustad) {
      return new CommonDataResponseDto(null, false, 'Ustad profile not found');
    }
    return new CommonDataResponseDto(ustad, true, 'Ustad profile retrieved successfully');
  }

  @ApiOperation({ summary: 'Get my assigned classes' })
  @ApiResponse({ status: 200, description: 'Assigned classes retrieved successfully' })
  @Get('my-classes')
  async getMyClasses(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    return await this.classesService.findAll(pageOptionsDto, req.user.id, req.user.role, true);
  }

  @ApiOperation({ summary: 'Get ustad by ID' })
  @ApiParam({ name: 'id', description: 'Ustad ID' })
  @ApiResponse({ status: 200, description: 'Ustad retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Ustad not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.ustadsService.findOne(id);
    return new CommonDataResponseDto(result, true, 'Ustad retrieved successfully');
  }

  @ApiOperation({ summary: 'Create new ustad' })
  @ApiBody({ type: CreateUstadDto })
  @ApiResponse({ status: 201, description: 'Ustad created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @Post()
  async create(@Body() createUstadDto: CreateUstadDto) {
    const result = await this.ustadsService.create(createUstadDto);
    return new CommonDataResponseDto(result, true, 'Ustad created successfully');
  }

  @ApiOperation({ summary: 'Update ustad by ID' })
  @ApiParam({ name: 'id', description: 'Ustad ID' })
  @ApiBody({ type: UpdateUstadDto })
  @ApiResponse({ status: 200, description: 'Ustad updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Ustad not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUstadDto: UpdateUstadDto) {
    const result = await this.ustadsService.update(id, updateUstadDto);
    return new CommonDataResponseDto(result, true, 'Ustad updated successfully');
  }

  @ApiOperation({ summary: 'Delete ustad by ID' })
  @ApiParam({ name: 'id', description: 'Ustad ID' })
  @ApiResponse({ status: 200, description: 'Ustad deleted successfully' })
  @ApiResponse({ status: 404, description: 'Ustad not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ustadsService.remove(id);
    return new CommonDataResponseDto(null, true, 'Ustad deleted successfully');
  }

  @ApiOperation({ summary: 'Update current ustad phone number' })
  @ApiResponse({ status: 200, description: 'Phone updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Ustad not found' })
  @Put('me/phone')
  async updatePhone(@Request() req, @Body() updatePhoneDto: UpdatePhoneDto) {
    const ustad = await this.ustadsService.updatePhoneByUserId(req.user.id, updatePhoneDto.phone);
    return new CommonDataResponseDto(ustad, true, 'Phone updated successfully');
  }
}

