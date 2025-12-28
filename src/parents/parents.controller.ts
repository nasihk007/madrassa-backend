import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParentsService } from './parents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDataResponseDto, DataResponseDto, PageOptionsDto } from '../shared/dto';
import { UserRole } from '../entities/user.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@ApiTags('parents')
@ApiBearerAuth('JWT-auth')
@Controller('parents')
@UseGuards(JwtAuthGuard)
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @ApiOperation({ summary: 'Get all parents (admin only)' })
  @ApiResponse({ status: 200, description: 'Parents retrieved successfully' })
  @Get()
  async getParents(@Query() pageOptionsDto: PageOptionsDto, @Request() req) {
    this.ensureAdmin(req.user);
    const result = await this.parentsService.getAllParents(pageOptionsDto);
    return result;
  }

  @ApiOperation({ summary: 'Create a new parent (admin only)' })
  @ApiResponse({ status: 201, description: 'Parent created successfully' })
  @Post()
  async createParent(@Request() req, @Body() createParentDto: CreateParentDto) {
    this.ensureAdmin(req.user);
    const parent = await this.parentsService.createParent(createParentDto);
    return new DataResponseDto(parent, true, 'Parent created successfully');
  }

  @ApiOperation({ summary: 'Update parent (admin only)' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({ status: 200, description: 'Parent updated successfully' })
  @Put(':id')
  async updateParent(
    @Param('id') id: string,
    @Request() req,
    @Body() updateParentDto: UpdateParentDto,
  ) {
    this.ensureAdmin(req.user);
    const parent = await this.parentsService.updateParent(id, updateParentDto);
    return new DataResponseDto(parent, true, 'Parent updated successfully');
  }

  @ApiOperation({ summary: 'Delete parent (admin only)' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({ status: 200, description: 'Parent deleted successfully' })
  @Delete(':id')
  async deleteParent(@Param('id') id: string, @Request() req) {
    this.ensureAdmin(req.user);
    await this.parentsService.deleteParent(id);
    return new DataResponseDto(null, true, 'Parent deleted successfully');
  }

  @ApiOperation({ summary: 'Get students linked to the currently authenticated parent' })
  @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
  @Get('my-students')
  async getMyStudents(@Request() req) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    const isParent = req.user.role === UserRole.PARENT;
    const isParentContextStudent =
      req.user.role === 'student' &&
      req.user.token_type === 'student' &&
      !!req.user.parent_id;

    if (!isAdmin && !isParent && !isParentContextStudent) {
      throw new ForbiddenException('Only parents or administrators can access this resource');
    }

    const parentUserId = req.user.id;
    const students = await this.parentsService.getStudentsForParentUser(parentUserId);
    return new CommonDataResponseDto(students, true, 'Students retrieved successfully');
  }

  @ApiOperation({ summary: 'Get parent details (admin only)' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({ status: 200, description: 'Parent retrieved successfully' })
  @Get(':id')
  async getParent(@Param('id') id: string, @Request() req) {
    this.ensureAdmin(req.user);
    const parent = await this.parentsService.getParentById(id);
    return new DataResponseDto(parent, true, 'Parent retrieved successfully');
  }

  @ApiOperation({ summary: 'Get students for a specific parent (admin only)' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
  @Get(':id/students')
  async getParentStudents(@Param('id') id: string, @Request() req) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can access this resource');
    }

    const students = await this.parentsService.getStudentsByParentId(id);
    return new CommonDataResponseDto(students, true, 'Students retrieved successfully');
  }

  @ApiOperation({ summary: 'Activate a student for the current parent account' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Active student updated successfully' })
  @Patch('students/:studentId/activate')
  async activateMyStudent(@Param('studentId') studentId: string, @Request() req) {
    if (req.user.role !== UserRole.PARENT) {
      throw new ForbiddenException('Only parents can change their active student');
    }

    await this.parentsService.setActiveStudentForUser(req.user.id, studentId);
    return new DataResponseDto(null, true, 'Active student updated successfully');
  }

  @ApiOperation({ summary: 'Activate a student for a specific parent (admin only)' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Active student updated successfully' })
  @Patch(':id/students/:studentId/activate')
  async activateStudentForParent(
    @Param('id') parentId: string,
    @Param('studentId') studentId: string,
    @Request() req,
  ) {
    this.ensureAdmin(req.user);
    await this.parentsService.setActiveStudentForParent(parentId, studentId);
    return new DataResponseDto(null, true, 'Active student updated successfully');
  }

  private ensureAdmin(user: { role: UserRole }) {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can access this resource');
    }
  }
}

