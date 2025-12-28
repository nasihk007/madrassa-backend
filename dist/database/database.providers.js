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
            console.log('🔄 Migrating data from junction table to ustad_id column...');
            const [columns] = await sequelize.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'class_divisions' 
        AND column_name = 'ustad_id'
      `);
            if (Array.isArray(columns) && columns.length === 0) {
                await queryInterface.addColumn('class_divisions', 'ustad_id', {
                    type: 'UUID',
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
        WHERE EXISTS (
          SELECT 1 
          FROM ustad_class_assignments uca 
          WHERE uca.class_division_id = cd.id
        )
        AND cd.ustad_id IS NULL
      `);
            console.log('✅ Data migration completed');
            await sequelize.query('DROP TABLE IF EXISTS ustad_class_assignments CASCADE');
            console.log('✅ Junction table removed');
        }
    }
    catch (error) {
        if (!error.message?.includes('does not exist') && !error.message?.includes('already exists')) {
            console.warn('⚠️  Migration warning:', error.message);
        }
    }
}
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService) => {
            const host = configService.get('DATABASE_HOST');
            const port = configService.get('DATABASE_PORT');
            const username = configService.get('DATABASE_USER');
            const password = configService.get('DATABASE_PASSWORD');
            const database = configService.get('DATABASE_NAME');
            console.log(`📊 Connecting to PostgreSQL database:`);
            console.log(`   Host: ${host}:${port}`);
            console.log(`   Database: ${database}`);
            console.log(`   User: ${username}`);
            const sequelizeOptions = {
                dialect: 'postgres',
                host: host,
                port: port,
                username: username,
                password: password,
                database: database,
                logging: false,
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
            };
            const sequelize = new sequelize_typescript_1.Sequelize(sequelizeOptions);
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
            ]);
            const skipSync = process.env.SKIP_DB_SYNC === 'true';
            if (!skipSync) {
                try {
                    await migrateUstadClassAssignments(sequelize);
                    await sequelize.sync({ alter: true });
                    console.log('✅ Database synchronized successfully');
                }
                catch (error) {
                    if (error?.parent?.code === '42701' && error?.parent?.message?.includes('already exists')) {
                        console.log('⚠️  Column already exists, skipping...');
                        console.log('✅ Database synchronized successfully (with existing columns)');
                    }
                    else {
                        console.error('❌ Sequelize sync error:', error);
                        throw error;
                    }
                }
            }
            else {
                console.log('⏭️  Database sync skipped (SKIP_DB_SYNC=true)');
            }
            try {
                await sequelize.authenticate();
                console.log('✅ Database connection established successfully');
            }
            catch (error) {
                console.error('❌ Unable to connect to the database:', error);
                throw error;
            }
            return sequelize;
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map