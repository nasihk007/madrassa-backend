import { Injectable, UnauthorizedException, Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User, UserRole } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ParentsService } from '../parents/parents.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private jwtService: JwtService,
    private readonly parentsService: ParentsService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      console.log(`User not found with email: ${email}`);
      return null;
    }

    console.log(`Found user: ${user.email}, role: ${user.role}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Password validation result: ${isPasswordValid}`);

    if (isPasswordValid) {
      // Convert Sequelize model to plain object
      const userObj = user.toJSON();
      const { password, ...result } = userObj;
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: any = {
      email: user.email,
      sub: user.id,
      role: user.role,
      token_type: user.role,
    };

    const userPayload: any = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (user.role === UserRole.PARENT) {
      const parent = await this.parentsService.getParentByUserId(user.id);
      payload.parent_id = parent.id;
      userPayload.parentId = parent.id;
      userPayload.activeStudentId = parent.activeStudentId;
      userPayload.students = (parent.students || []).map((student) => student.toJSON());
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: userPayload,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    console.log(`Registering user: ${registerDto.email}, role: ${registerDto.role}`);
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    console.log(`Password hashed successfully for: ${registerDto.email}`);

    const role = registerDto.role ?? UserRole.PARENT;

    const savedUser = await this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role,
    });

    const { password, ...result } = savedUser.toJSON();

    console.log(`User registered successfully: ${savedUser.email}`);
    return result;
  }

  async switchStudent(parentUserId: string, studentId: string) {
    const parent = await this.parentsService.setActiveStudentForUser(parentUserId, studentId);

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    const student = (parent.students || []).find((s) => s.id === studentId);

    if (!student) {
      throw new ForbiddenException('Student not associated with parent');
    }

    const payload = {
      sub: parentUserId,
      role: 'student',
      token_type: 'student',
      parent_id: parent.id,
      student_id: student.id,
      email: parent.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      role: 'student',
      token_type: 'student',
      student: student.toJSON(),
      parent: {
        id: parent.id,
        activeStudentId: parent.activeStudentId,
        students: (parent.students || []).map((s) => s.toJSON()),
      },
    };
  }

  async switchParent(parentUserId: string) {
    const user = await this.userRepository.findByPk(parentUserId);

    if (!user || user.role !== UserRole.PARENT) {
      throw new ForbiddenException('Only parents can switch back to parent context');
    }

    const parent = await this.parentsService.getParentByUserId(parentUserId);

    const payload = {
      sub: user.id,
      role: UserRole.PARENT,
      token_type: 'parent',
      parent_id: parent.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      role: UserRole.PARENT,
      token_type: 'parent',
      parent: {
        id: parent.id,
        activeStudentId: parent.activeStudentId,
        students: (parent.students || []).map((s) => s.toJSON()),
      },
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}

