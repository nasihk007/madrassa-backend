import { Controller, Post, Body, UseGuards, Get, Request, Param, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DataResponseDto } from '../shared/dto';
import { UserRole } from '../entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john.doe@madrassa.com' },
            role: { type: 'string', example: 'parent' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return new DataResponseDto(result, true, 'Login successful');
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@madrassa.com' },
        role: { type: 'string', example: 'parent' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already exists' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return new DataResponseDto(result, true, 'User registered successfully');
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'User profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@madrassa.com' },
        role: { type: 'string', example: 'parent' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return new DataResponseDto(req.user, true, 'Profile retrieved successfully');
  }

  @ApiOperation({ summary: 'Switch to a student context (parent or student token required)' })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({ status: 201, description: 'Student context token issued' })
  @UseGuards(JwtAuthGuard)
  @Post('switch-student/:studentId')
  async switchStudent(@Request() req, @Param('studentId') studentId: string) {
    if (req.user.role !== UserRole.PARENT && req.user.role !== 'student') {
      throw new ForbiddenException('Only parents can switch to a student context');
    }
    const result = await this.authService.switchStudent(req.user.id, studentId);
    return new DataResponseDto(result, true, 'Student context activated');
  }

  @ApiOperation({ summary: 'Switch back to parent context' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Parent context token issued' })
  @UseGuards(JwtAuthGuard)
  @Post('switch-parent')
  async switchParent(@Request() req) {
    if (req.user.role !== UserRole.PARENT && req.user.role !== 'student') {
      throw new ForbiddenException('Only parents can switch contexts');
    }
    const result = await this.authService.switchParent(req.user.id);
    return new DataResponseDto(result, true, 'Parent context activated');
  }
}
