import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Dashboard statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        totalStudents: { type: 'number', example: 150 },
        totalUstads: { type: 'number', example: 12 },
        totalClasses: { type: 'number', example: 8 },
        activeAcademicYear: { 
          type: 'object', 
          nullable: true,
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        recentAnnouncements: { 
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        },
        todayAttendance: { type: 'number', example: 142 },
        todayPrayers: { type: 'number', example: 138 }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Request() req) {
    const result = await this.dashboardService.getStats(req.user);
    return new CommonDataResponseDto(result, true, 'Dashboard statistics retrieved successfully');
  }

  @ApiOperation({ summary: 'Get student statistics' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Student statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        attendance: {
          type: 'object',
          properties: {
            present: { type: 'number' },
            absent: { type: 'number' },
            late: { type: 'number' },
            total: { type: 'number' },
            rate: { type: 'number' }
          }
        },
        results: {
          type: 'object',
          properties: {
            average: { type: 'number' },
            totalSubjects: { type: 'number' },
            gradeDistribution: { type: 'object' }
          }
        },
        prayers: {
          type: 'object',
          properties: {
            average: { type: 'number' },
            perfectDays: { type: 'number' },
            totalDays: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @UseGuards(JwtAuthGuard)
  @Get('student/:studentId/stats')
  async getStudentStats(@Request() req, @Param('studentId') studentId: string) {
    const result = await this.dashboardService.getStudentStats(studentId, req.user);
    return new CommonDataResponseDto(result, true, 'Student statistics retrieved successfully');
  }
}
