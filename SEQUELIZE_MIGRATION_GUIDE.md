# Sequelize Migration Guide - Madrassa Backend

## 🎉 Migration Completed Successfully

This document provides a comprehensive guide to the TypeORM to Sequelize migration that has been completed for the Madrassa Backend project.

---

## 📋 Overview

The Madrassa Backend has been successfully migrated from **TypeORM** to **Sequelize-TypeScript**. This migration provides:

- ✅ Better compatibility with the LMS server architecture
- ✅ Consistent ORM patterns across projects
- ✅ Improved database sync capabilities
- ✅ Enhanced PostgreSQL and SQLite support
- ✅ Provider-based repository pattern

---

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

The following Sequelize packages have been added to `package.json`:

```json
{
  "dependencies": {
    "@nestjs/sequelize": "^10.0.1",
    "sequelize": "^6.37.3",
    "sequelize-typescript": "^2.1.6",
    "pg": "^8.11.0",
    "pg-hstore": "^2.3.4",
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "@types/sequelize": "^4.28.20",
    "cross-env": "^7.0.3"
  }
}
```

TypeORM packages have been removed.

---

## 🗄️ Database Configuration

### Environment Variables

Update your `.env` file with the following variables:

```env
# Database Configuration
DATABASE_TYPE=sqlite              # Use 'postgres' for production
DATABASE_HOST=localhost           # PostgreSQL host
DATABASE_PORT=5432               # PostgreSQL port
DATABASE_USER=postgres           # PostgreSQL username
DATABASE_PASSWORD=postgres123    # PostgreSQL password
DATABASE_NAME=madrassa          # Database name

# Database Sync Configuration
SKIP_DB_SYNC=false              # false in dev, true in production

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Database Types Supported

- **SQLite** (Development): Stores data in `madrassa.db` file
- **PostgreSQL** (Production): Full production database support

---

## 📁 Project Structure Changes

### New Files Added

```
src/
├── database/
│   ├── database.module.ts        # Database module configuration
│   └── database.providers.ts     # Sequelize provider with sync
├── database-sync.ts              # Standalone database sync script
└── {module}/
    └── {module}.providers.ts     # Repository providers for each module
```

### Modified Files

All entity files have been converted from TypeORM to Sequelize:
- `src/entities/*.entity.ts` - All 9 entities converted
- `src/*/*.module.ts` - All modules updated to use DatabaseModule
- `src/*/*.service.ts` - All services updated to use Sequelize patterns

---

## 🚀 Running the Application

### Development Mode

```bash
# Start with auto database sync
npm run start:dev
```

The database will automatically sync when `SKIP_DB_SYNC=false` in `.env`

### Manual Database Sync

```bash
# Run database sync manually
npm run db:sync
```

This script will:
- Connect to the database
- Sync all models (create/alter tables)
- Close connection

### Production Mode

```bash
# Set SKIP_DB_SYNC=true in production
SKIP_DB_SYNC=true npm run start:prod
```

---

## 📊 Database Provider Architecture

### Overview

The database is configured using a **provider pattern** similar to the LMS server:

```typescript
// database.providers.ts
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'sqlite', // or 'postgres'
        storage: 'madrassa.db',
        logging: false,
        define: {
          timestamps: true,
          freezeTableName: true,
          underscored: true,
        },
      });

      // Add all models
      sequelize.addModels([
        User, Student, Ustad, ClassDivision,
        AcademicYear, Attendance, Prayer,
        ExamResult, Announcement
      ]);

      // Sync if not in production
      if (process.env.SKIP_DB_SYNC !== 'true') {
        await sequelize.sync({ alter: true });
      }

      return sequelize;
    },
  },
];
```

### Module Provider Pattern

Each module has its own provider file:

```typescript
// users.providers.ts
import { User } from '../entities/user.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
```

---

## 🔄 Entity Conversion

All entities have been converted from TypeORM to Sequelize-TypeScript.

### Example: User Entity

**Before (TypeORM):**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

**After (Sequelize):**
```typescript
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;
}
```

### Key Differences

| Feature | TypeORM | Sequelize |
|---------|---------|-----------|
| Decorator | `@Entity('name')` | `@Table({ tableName: 'name' })` |
| Inheritance | Plain class | `extends Model<T>` |
| Primary Key | `@PrimaryGeneratedColumn('uuid')` | `@Column({ type: DataType.UUID, primaryKey: true })` |
| Foreign Key | `@ManyToOne` + `@JoinColumn` | `@ForeignKey` + `@BelongsTo` |
| Relationships | `@OneToMany`, `@ManyToOne` | `@HasMany`, `@BelongsTo`, `@BelongsToMany` |
| Timestamps | `@CreateDateColumn()` | `timestamps: true` in Table config |
| Column Naming | Auto camelCase | `underscored: true` + `field: 'snake_case'` |

---

## 🔧 Service Pattern Changes

### Repository Injection

**Before (TypeORM):**
```typescript
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>,
) {}
```

**After (Sequelize):**
```typescript
import { Inject } from '@nestjs/common';

constructor(
  @Inject('USER_REPOSITORY')
  private userRepository: typeof User,
) {}
```

### Query Method Changes

| Operation | TypeORM | Sequelize |
|-----------|---------|-----------|
| Find All | `repository.find()` | `repository.findAll()` |
| Find One | `repository.findOne({ where: { id } })` | `repository.findOne({ where: { id } })` |
| Create | `repository.create(data); repository.save(entity)` | `repository.create(data)` |
| Update | `repository.update(id, data)` | `entity.update(data)` |
| Delete | `repository.delete(id)` | `entity.destroy()` |
| Relations | `relations: ['entity']` | `include: [Entity]` |
| Order | `order: { field: 'ASC' }` | `order: [['field', 'ASC']]` |

### Example Service

**Before (TypeORM):**
```typescript
async findAll(): Promise<User[]> {
  return this.userRepository.find({
    relations: ['students', 'ustad'],
  });
}

async create(userData: Partial<User>): Promise<User> {
  const user = this.userRepository.create(userData);
  return this.userRepository.save(user);
}

async update(id: string, userData: Partial<User>): Promise<User> {
  await this.userRepository.update(id, userData);
  return this.findOne(id);
}
```

**After (Sequelize):**
```typescript
async findAll(): Promise<User[]> {
  return this.userRepository.findAll({
    include: [Student, Ustad],
  });
}

async create(userData: Partial<User>): Promise<User> {
  return this.userRepository.create(userData);
}

async update(id: string, userData: Partial<User>): Promise<User | null> {
  const user = await this.findOne(id);
  if (!user) return null;

  await user.update(userData);
  return user;
}
```

---

## 🔗 Relationship Mapping

### One-to-Many Relationship

**User ← Students (One User has many Students)**

```typescript
// User entity
@HasMany(() => Student, {
  foreignKey: 'user_id',
  as: 'students',
})
students: Student[];

// Student entity
@ForeignKey(() => User)
@Column({
  type: DataType.UUID,
  field: 'user_id',
})
userId: string;

@BelongsTo(() => User)
user: User;
```

### Many-to-Many Relationship

**Ustad ↔ ClassDivision (Many Ustads teach many Classes)**

```typescript
// Ustad entity
@BelongsToMany(
  () => ClassDivision,
  'ustad_class_assignments',  // Join table name
  'ustadId',                   // Foreign key in join table
  'classDivisionId'            // Other foreign key
)
assignedClasses: ClassDivision[];

// ClassDivision entity
@BelongsToMany(
  () => Ustad,
  'ustad_class_assignments',
  'classDivisionId',
  'ustadId'
)
assignedUstads: Ustad[];
```

---

## 📦 Complete Entity List

All entities have been successfully migrated:

1. ✅ **User** - Base user authentication and roles
2. ✅ **Student** - Student records with relations
3. ✅ **Ustad** - Teacher records with class assignments
4. ✅ **ClassDivision** - Class and division management
5. ✅ **AcademicYear** - Academic year periods
6. ✅ **Attendance** - Daily attendance tracking
7. ✅ **Prayer** - Five daily prayer records
8. ✅ **ExamResult** - Student exam results
9. ✅ **Announcement** - System announcements

---

## 🧪 Testing the Migration

### 1. Start the Server

```bash
npm run start:dev
```

Expected output:
```
✅ Database connection established successfully
✅ Database synchronized successfully
🚀 Server is running on port 3001
```

### 2. Test API Endpoints

All existing API endpoints remain the same:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/students`
- `GET /api/ustads`
- `GET /api/dashboard/stats`
- etc.

### 3. Verify Database

**For SQLite:**
```bash
# Open the database file
sqlite3 madrassa.db

# List all tables
.tables

# Should show:
# users, students, ustads, class_divisions, academic_years,
# attendances, prayers, exam_results, announcements,
# ustad_class_assignments
```

**For PostgreSQL:**
```bash
psql -U postgres -d madrassa

\dt  # List all tables
```

---

## 🔍 Common Queries Examples

### Find with Relations

```typescript
// Find student with all relations
const student = await this.studentRepository.findOne({
  where: { id: studentId },
  include: [
    User,
    ClassDivision,
    AcademicYear,
  ],
});
```

### Find with Aliased Relations

```typescript
// Find attendance with aliased markedBy
const attendance = await this.attendanceRepository.findAll({
  include: [
    Student,
    { model: Ustad, as: 'markedBy' },
    AcademicYear,
  ],
});
```

### Complex Where Clauses

```typescript
// Find all students in a specific class
const students = await this.studentRepository.findAll({
  where: {
    classDivisionId: classId,
    academicYearId: yearId,
  },
  include: [User],
});
```

### Ordering Results

```typescript
// Find announcements ordered by creation date
const announcements = await this.announcementRepository.findAll({
  order: [['createdAt', 'DESC']],
  limit: 5,
});
```

---

## ⚠️ Important Notes

### 1. Password Hashing

Password hashing with bcrypt is **preserved** in:
- `auth.service.ts` - Login and registration
- `students.service.ts` - Student creation

### 2. Transactions

For operations requiring transactions:

```typescript
const result = await this.sequelize.transaction(async (t) => {
  const user = await this.userRepository.create(userData, { transaction: t });
  const student = await this.studentRepository.create(studentData, { transaction: t });
  return { user, student };
});
```

### 3. Bulk Operations

```typescript
// Bulk create
await this.attendanceRepository.bulkCreate(attendanceArray);

// Bulk update
await this.attendanceRepository.update(
  { status: 'present' },
  { where: { date: today } }
);
```

---

## 🎯 Migration Checklist

- ✅ All dependencies installed
- ✅ All 9 entities converted to Sequelize
- ✅ Database provider created with sync capability
- ✅ All 9 service modules updated
- ✅ All repository providers created
- ✅ app.module.ts updated to use DatabaseModule
- ✅ Environment variables configured
- ✅ Database sync script created
- ✅ Migration guide documented

---

## 📚 Additional Resources

### Sequelize Documentation
- [Sequelize Official Docs](https://sequelize.org/docs/v6/)
- [Sequelize-TypeScript](https://github.com/RobinBuschmann/sequelize-typescript)
- [NestJS Sequelize Integration](https://docs.nestjs.com/techniques/database#sequelize-integration)

### Project-Specific
- Review `src/database/database.providers.ts` for database configuration
- Review `src/database-sync.ts` for standalone sync script
- Check individual `*.providers.ts` files for repository setup

---

## 🆘 Troubleshooting

### Issue: Database tables not created

**Solution:** Ensure `SKIP_DB_SYNC=false` in `.env` file

### Issue: Cannot find module 'sequelize-typescript'

**Solution:** Run `npm install` to install all dependencies

### Issue: Relations not loading

**Solution:** Use `include` option in queries:
```typescript
repository.findAll({ include: [RelatedEntity] })
```

### Issue: Column names mismatch

**Solution:** All entities use `underscored: true`, so database columns are snake_case (e.g., `created_at`, `user_id`)

---

## 🎉 Success!

Your Madrassa Backend is now running on **Sequelize ORM** with full database sync capabilities, matching the architecture of the LMS server!

For questions or issues, review the entity files, provider files, and this guide.
