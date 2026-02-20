import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

// Import all entities
import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Ustad } from '../entities/ustad.entity';
import { ClassDivision } from '../entities/class-division.entity';
import { AcademicYear } from '../entities/academic-year.entity';
import { Attendance } from '../entities/attendance.entity';
import { Prayer } from '../entities/prayer.entity';
import { ExamResult } from '../entities/exam-result.entity';
import { Announcement } from '../entities/announcement.entity';
import { Parent } from '../entities/parent.entity';
import { ResultEntrySession } from '../entities/result-entry-session.entity';

/**
 * Migrate data from ustad_class_assignments junction table to ustad_id column
 * This handles the transition from many-to-many to one-to-many relationship
 */
async function migrateUstadClassAssignments(sequelize: Sequelize) {
  try {
    const queryInterface = sequelize.getQueryInterface();
    
    // Check if junction table exists
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'ustad_class_assignments'
    `);
    
    if (Array.isArray(tables) && tables.length > 0) {
      console.log('🔄 Migrating data from junction table to ustad_id column...');
      
      // Check if ustad_id column exists
      const [columns] = await sequelize.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'class_divisions' 
        AND column_name = 'ustad_id'
      `);
      
      if (Array.isArray(columns) && columns.length === 0) {
        // Add ustad_id column if it doesn't exist
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
      
      // Migrate data: For each class, assign the first ustad from junction table
      // Note: This takes the first ustad if multiple were assigned (many-to-many)
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
      
      // Drop the junction table after migration
      await sequelize.query('DROP TABLE IF EXISTS ustad_class_assignments CASCADE');
      console.log('✅ Junction table removed');
    }
  } catch (error: any) {
    // Ignore errors if table doesn't exist or migration already done
    if (!error.message?.includes('does not exist') && !error.message?.includes('already exists')) {
      console.warn('⚠️  Migration warning:', error.message);
    }
  }
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const host = configService.get<string>('DATABASE_HOST');
      const port = configService.get<number>('DATABASE_PORT');
      const username = configService.get<string>('DATABASE_USER');
      const password = configService.get<string>('DATABASE_PASSWORD');
      const database = configService.get<string>('DATABASE_NAME');

      console.log(`📊 Connecting to PostgreSQL database:`);
      console.log(`   Host: ${host}:${port}`);
      console.log(`   Database: ${database}`);
      console.log(`   User: ${username}`);

      const sequelizeOptions: any = {
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

      const sequelize = new Sequelize(sequelizeOptions);

      // Add all models
      sequelize.addModels([
        User,
        Student,
        Ustad,
        ClassDivision,
        AcademicYear,
        Attendance,
        Prayer,
        ExamResult,
        Announcement,
        Parent,
        ResultEntrySession,
      ]);

      // Database sync based on environment variable
      const skipSync = process.env.SKIP_DB_SYNC === 'true';

      if (!skipSync) {
        try {
          // Migrate data from junction table to ustad_id column if needed
          await migrateUstadClassAssignments(sequelize);
          
          await sequelize.sync({ alter: true });
          console.log('✅ Database synchronized successfully');
        } catch (error: any) {
          // Ignore column already exists errors (column might have been created manually)
          if (error?.parent?.code === '42701' && error?.parent?.message?.includes('already exists')) {
            console.log('⚠️  Column already exists, skipping...');
            console.log('✅ Database synchronized successfully (with existing columns)');
          } else {
            console.error('❌ Sequelize sync error:', error);
            throw error;
          }
        }
      } else {
        console.log('⏭️  Database sync skipped (SKIP_DB_SYNC=true)');
      }

      // Test connection
      try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');
      } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        throw error;
      }

      return sequelize;
    },
    inject: [ConfigService],
  },
];
