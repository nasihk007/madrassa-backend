"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
let DashboardService = class DashboardService {
    constructor(studentRepository, ustadRepository, classRepository, academicYearRepository, attendanceRepository, prayerRepository, announcementRepository) {
        this.studentRepository = studentRepository;
        this.ustadRepository = ustadRepository;
        this.classRepository = classRepository;
        this.academicYearRepository = academicYearRepository;
        this.attendanceRepository = attendanceRepository;
        this.prayerRepository = prayerRepository;
        this.announcementRepository = announcementRepository;
    }
    async getStats(user) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalStudents, totalUstads, totalClasses] = await Promise.all([
            this.studentRepository.count(),
            this.ustadRepository.count(),
            this.classRepository.count(),
        ]);
        const activeAcademicYear = await this.academicYearRepository.findOne({
            where: { isActive: true },
        });
        const recentAnnouncements = await this.announcementRepository.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
        });
        const todayAttendance = await this.attendanceRepository.count({
            where: { date: today },
        });
        const todayPrayers = await this.prayerRepository.count({
            where: { date: today },
        });
        return {
            totalStudents,
            totalUstads,
            totalClasses,
            activeAcademicYear,
            recentAnnouncements,
            todayAttendance,
            todayPrayers,
        };
    }
    async getStudentStats(studentId, user) {
        const attendances = await this.attendanceRepository.findAll({
            where: { studentId },
        });
        const total = attendances.length;
        const present = attendances.filter((a) => a.status === 'present').length;
        const absent = attendances.filter((a) => a.status === 'absent').length;
        const late = attendances.filter((a) => a.status === 'late').length;
        const prayers = await this.prayerRepository.findAll({
            where: { studentId },
        });
        const totalDays = prayers.length;
        const perfectDays = prayers.filter((p) => p.fajr && p.dhuhr && p.asr && p.maghrib && p.isha).length;
        let prayerSum = 0;
        prayers.forEach((p) => {
            prayerSum += (p.fajr ? 1 : 0) + (p.dhuhr ? 1 : 0) + (p.asr ? 1 : 0) +
                (p.maghrib ? 1 : 0) + (p.isha ? 1 : 0);
        });
        const average = totalDays > 0 ? prayerSum / totalDays : 0;
        return {
            attendance: {
                present,
                absent,
                late,
                total,
                rate: total > 0 ? Math.round((present / total) * 100) : 0,
            },
            results: {
                average: 0,
                totalSubjects: 0,
                gradeDistribution: {},
            },
            prayers: {
                average: Math.round(average * 5),
                perfectDays,
                totalDays,
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STUDENT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USTAD_REPOSITORY')),
    __param(2, (0, common_1.Inject)('CLASS_DIVISION_REPOSITORY')),
    __param(3, (0, common_1.Inject)('ACADEMIC_YEAR_REPOSITORY')),
    __param(4, (0, common_1.Inject)('ATTENDANCE_REPOSITORY')),
    __param(5, (0, common_1.Inject)('PRAYER_REPOSITORY')),
    __param(6, (0, common_1.Inject)('ANNOUNCEMENT_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map