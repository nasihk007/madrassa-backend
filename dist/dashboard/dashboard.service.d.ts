import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Attendance } from '../entities/attendance.entity';
import { Prayer } from '../entities/prayer.entity';
import { Announcement } from '../entities/announcement.entity';
export declare class DashboardService {
    private studentRepository;
    private ustadRepository;
    private classRepository;
    private academicYearRepository;
    private attendanceRepository;
    private prayerRepository;
    private announcementRepository;
    constructor(studentRepository: typeof Student, ustadRepository: typeof Ustad, classRepository: typeof ClassDivision, academicYearRepository: typeof AcademicYear, attendanceRepository: typeof Attendance, prayerRepository: typeof Prayer, announcementRepository: typeof Announcement);
    getStats(user: User): Promise<{
        totalStudents: number;
        totalUstads: number;
        totalClasses: number;
        activeAcademicYear: AcademicYear;
        recentAnnouncements: Announcement[];
        todayAttendance: number;
        todayPrayers: number;
    }>;
    getStudentStats(studentId: string, user: User): Promise<{
        attendance: {
            present: number;
            absent: number;
            late: number;
            total: number;
            rate: number;
        };
        results: {
            average: number;
            totalSubjects: number;
            gradeDistribution: {};
        };
        prayers: {
            average: number;
            perfectDays: number;
            totalDays: number;
        };
    }>;
}
