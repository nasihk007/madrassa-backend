import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Attendance } from '../entities/attendance.entity';
import { Prayer } from '../entities/prayer.entity';
import { Announcement } from '../entities/announcement.entity';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: typeof Student,
    @Inject('USTAD_REPOSITORY')
    private ustadRepository: typeof Ustad,
    @Inject('CLASS_DIVISION_REPOSITORY')
    private classRepository: typeof ClassDivision,
    @Inject('ACADEMIC_YEAR_REPOSITORY')
    private academicYearRepository: typeof AcademicYear,
    @Inject('ATTENDANCE_REPOSITORY')
    private attendanceRepository: typeof Attendance,
    @Inject('PRAYER_REPOSITORY')
    private prayerRepository: typeof Prayer,
    @Inject('ANNOUNCEMENT_REPOSITORY')
    private announcementRepository: typeof Announcement,
  ) {}

  async getStats(user: User) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day

    // Get counts
    const [totalStudents, totalUstads, totalClasses] = await Promise.all([
      this.studentRepository.count(),
      this.ustadRepository.count(),
      this.classRepository.count(),
    ]);

    // Get active academic year
    const activeAcademicYear = await this.academicYearRepository.findOne({
      where: { isActive: true },
    });

    // Get recent announcements (last 5)
    const recentAnnouncements = await this.announcementRepository.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    // Get today's attendance count
    const todayAttendance = await this.attendanceRepository.count({
      where: { date: today },
    });

    // Get today's prayer count
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

  async getStudentStats(studentId: string, user: User) {
    // Get student's attendance records
    const attendances = await this.attendanceRepository.findAll({
      where: { studentId },
    });

    const total = attendances.length;
    const present = attendances.filter((a) => a.status === 'present').length;
    const absent = attendances.filter((a) => a.status === 'absent').length;
    const late = attendances.filter((a) => a.status === 'late').length;

    // Get student's prayer records
    const prayers = await this.prayerRepository.findAll({
      where: { studentId },
    });

    const totalDays = prayers.length;
    const perfectDays = prayers.filter(
      (p) => p.fajr && p.dhuhr && p.asr && p.maghrib && p.isha
    ).length;

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
        average: 0, // TODO: Implement when results are available
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
}
