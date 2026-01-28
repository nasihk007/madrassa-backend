"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../entities/user.entity");
const student_entity_1 = require("../entities/student.entity");
const ustad_entity_1 = require("../entities/ustad.entity");
const class_division_entity_1 = require("../entities/class-division.entity");
const academic_year_entity_1 = require("../entities/academic-year.entity");
const attendance_entity_1 = require("../entities/attendance.entity");
const prayer_entity_1 = require("../entities/prayer.entity");
const exam_result_entity_1 = require("../entities/exam-result.entity");
const announcement_entity_1 = require("../entities/announcement.entity");
const parent_entity_1 = require("../entities/parent.entity");
const result_entry_session_entity_1 = require("../entities/result-entry-session.entity");
async function migrateUstadClassAssignments(sequelize) {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const [tables] = await sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'ustad_class_assignments'
    `);
        if (Array.isArray(tables) && tables.length > 0) {
            console.log('🔄 Migrating ustad_class_assignments → ustad_id');
            const [columns] = await sequelize.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'class_divisions'
        AND column_name = 'ustad_id'
      `);
            if (Array.isArray(columns) && columns.length === 0) {
                await queryInterface.addColumn('class_divisions', 'ustad_id', {
                    type: sequelize_typescript_1.DataType.UUID,
                    allowNull: true,
                    references: {
                        model: 'ustads',
                        key: 'id',
                    },
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                });
            }
            await sequelize.query(`
        UPDATE class_divisions cd
        SET ustad_id = (
          SELECT uca.ustad_id
          FROM ustad_class_assignments uca
          WHERE uca.class_division_id = cd.id
          LIMIT 1
        )
        WHERE cd.ustad_id IS NULL
      `);
            await sequelize.query('DROP TABLE IF EXISTS ustad_class_assignments CASCADE');
            console.log('✅ Ustad migration completed');
        }
    }
    catch (error) {
        console.warn('⚠️ Migration skipped:', error.message);
    }
}
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService) => {
            const databaseUrl = configService.get('DATABASE_URL');
            if (!databaseUrl) {
                throw new Error('❌ DATABASE_URL is not defined');
            }
            console.log('📊 Connecting to PostgreSQL using DATABASE_URL');
            console.log('🔐 SSL enabled (self-signed certificates allowed)');
            const sequelize = new sequelize_typescript_1.Sequelize(databaseUrl, {
                dialect: 'postgres',
                logging: false,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
                define: {
                    timestamps: true,
                    freezeTableName: true,
                    underscored: true,
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 50000,
                    idle: 10000,
                },
            });
            sequelize.addModels([
                user_entity_1.User,
                student_entity_1.Student,
                ustad_entity_1.Ustad,
                class_division_entity_1.ClassDivision,
                academic_year_entity_1.AcademicYear,
                attendance_entity_1.Attendance,
                prayer_entity_1.Prayer,
                exam_result_entity_1.ExamResult,
                announcement_entity_1.Announcement,
                parent_entity_1.Parent,
                result_entry_session_entity_1.ResultEntrySession,
            ]);
            await sequelize.authenticate();
            console.log('✅ Database connection established successfully');
            const skipSync = process.env.SKIP_DB_SYNC === 'true';
            if (!skipSync) {
                try {
                    await migrateUstadClassAssignments(sequelize);
                    await sequelize.sync({ alter: true });
                    console.log('✅ Database synchronized');
                }
                catch (error) {
                    console.error('❌ Sequelize sync failed:', error);
                    throw error;
                }
            }
            else {
                console.log('⏭️ Database sync skipped (SKIP_DB_SYNC=true)');
            }
            return sequelize;
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map