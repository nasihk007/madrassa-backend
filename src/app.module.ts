import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Import Database Module
import { DatabaseModule } from './database/database.module';

// Import all feature modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { UstadsModule } from './ustads/ustads.module';
import { ClassesModule } from './classes/classes.module';
import { AcademicYearsModule } from './academic-years/academic-years.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PrayerModule } from './prayer/prayer.module';
import { ResultsModule } from './results/results.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Sequelize Database Module
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'fallback-secret-key-for-development',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      },
    }),
    // Feature modules
    AuthModule,
    UsersModule,
    StudentsModule,
    UstadsModule,
    ClassesModule,
    AcademicYearsModule,
    AttendanceModule,
    PrayerModule,
    ResultsModule,
    AnnouncementsModule,
    DashboardModule,
    ParentsModule,
  ],
})
export class AppModule {}
