"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const students_module_1 = require("./students/students.module");
const ustads_module_1 = require("./ustads/ustads.module");
const classes_module_1 = require("./classes/classes.module");
const academic_years_module_1 = require("./academic-years/academic-years.module");
const attendance_module_1 = require("./attendance/attendance.module");
const prayer_module_1 = require("./prayer/prayer.module");
const results_module_1 = require("./results/results.module");
const announcements_module_1 = require("./announcements/announcements.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const parents_module_1 = require("./parents/parents.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'fallback-secret-key-for-development',
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            students_module_1.StudentsModule,
            ustads_module_1.UstadsModule,
            classes_module_1.ClassesModule,
            academic_years_module_1.AcademicYearsModule,
            attendance_module_1.AttendanceModule,
            prayer_module_1.PrayerModule,
            results_module_1.ResultsModule,
            announcements_module_1.AnnouncementsModule,
            dashboard_module_1.DashboardModule,
            parents_module_1.ParentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map