# NOORUL YAKHEEN Madrassa Management System - Backend

A comprehensive NestJS backend API for managing an Islamic madrassa (religious school) with role-based access control.

## 🏗️ Architecture

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport.js
- **Validation**: Class-validator
- **Documentation**: OpenAPI/Swagger (planned)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd madrassa-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=madrassa_db

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h

   # Application Configuration
   PORT=3001
   NODE_ENV=development

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb madrassa_db
   
   # Run migrations (if using migrations)
   npm run migration:run
   
   # Or use synchronize for development
   # (set synchronize: true in TypeORM config)
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `POST /api/users` - Create user (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Students
- `GET /api/students` - Get all students (protected)
- `GET /api/students/my-profile` - Get current student profile (protected)
- `GET /api/students/:id` - Get student by ID (protected)
- `POST /api/students` - Create student (protected)
- `PUT /api/students/:id` - Update student (protected)
- `DELETE /api/students/:id` - Delete student (protected)

### Ustads (Teachers)
- `GET /api/ustads` - Get all ustads (protected)
- `GET /api/ustads/:id` - Get ustad by ID (protected)
- `POST /api/ustads` - Create ustad (protected)
- `PUT /api/ustads/:id` - Update ustad (protected)
- `DELETE /api/ustads/:id` - Delete ustad (protected)

### Classes
- `GET /api/classes` - Get all class divisions (protected)
- `GET /api/classes/:id` - Get class division by ID (protected)
- `POST /api/classes` - Create class division (protected)
- `PUT /api/classes/:id` - Update class division (protected)
- `DELETE /api/classes/:id` - Delete class division (protected)

### Academic Years
- `GET /api/academic-years` - Get all academic years (protected)
- `GET /api/academic-years/active` - Get active academic year (protected)
- `GET /api/academic-years/:id` - Get academic year by ID (protected)
- `POST /api/academic-years` - Create academic year (protected)
- `PUT /api/academic-years/:id` - Update academic year (protected)
- `DELETE /api/academic-years/:id` - Delete academic year (protected)

### Attendance
- `GET /api/attendance` - Get all attendance records (protected)
- `GET /api/attendance/by-date?date=YYYY-MM-DD` - Get attendance by date (protected)
- `GET /api/attendance/student/:studentId` - Get student attendance (protected)
- `GET /api/attendance/:id` - Get attendance by ID (protected)
- `POST /api/attendance` - Create attendance record (protected)
- `PUT /api/attendance/:id` - Update attendance record (protected)
- `DELETE /api/attendance/:id` - Delete attendance record (protected)

### Prayer Records
- `GET /api/prayer` - Get all prayer records (protected)
- `GET /api/prayer/student/:studentId` - Get student prayer records (protected)
- `GET /api/prayer/:id` - Get prayer record by ID (protected)
- `POST /api/prayer` - Create prayer record (protected)
- `PUT /api/prayer/:id` - Update prayer record (protected)
- `DELETE /api/prayer/:id` - Delete prayer record (protected)

### Exam Results
- `GET /api/results` - Get all exam results (protected)
- `GET /api/results/student/:studentId` - Get student results (protected)
- `GET /api/results/:id` - Get result by ID (protected)
- `POST /api/results` - Create exam result (protected)
- `PUT /api/results/:id` - Update exam result (protected)
- `DELETE /api/results/:id` - Delete exam result (protected)

### Announcements
- `GET /api/announcements` - Get all announcements (protected)
- `GET /api/announcements/:id` - Get announcement by ID (protected)
- `POST /api/announcements` - Create announcement (protected)
- `PUT /api/announcements/:id` - Update announcement (protected)
- `DELETE /api/announcements/:id` - Delete announcement (protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control

- **Admin**: Full access to all endpoints
- **Ustad (Teacher)**: Access to attendance, prayer records, results for assigned classes
- **Student**: Access to own records and results

## 🗄️ Database Schema

### Core Entities

1. **User** - Base user entity with authentication
2. **Student** - Student-specific information
3. **Ustad** - Teacher-specific information
4. **ClassDivision** - Class and division management
5. **AcademicYear** - Academic year management
6. **Attendance** - Daily attendance records
7. **Prayer** - Daily prayer completion records
8. **ExamResult** - Student exam results
9. **Announcement** - System announcements

### Relationships

- User ↔ Student (One-to-One)
- User ↔ Ustad (One-to-One)
- Student ↔ ClassDivision (Many-to-One)
- Student ↔ AcademicYear (Many-to-One)
- Ustad ↔ ClassDivision (Many-to-Many)
- Student ↔ Attendance (One-to-Many)
- Student ↔ Prayer (One-to-Many)
- Student ↔ ExamResult (One-to-Many)

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode

# Production
npm run build             # Build the application
npm run start:prod        # Start in production mode

# Testing
npm run test              # Run unit tests
npm run test:e2e          # Run end-to-end tests
npm run test:cov          # Run tests with coverage

# Code Quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```

### Project Structure

```
src/
├── entities/             # Database entities
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── guards/          # Authentication guards
│   └── strategies/      # Passport strategies
├── users/               # Users module
├── students/            # Students module
├── ustads/              # Ustads module
├── classes/             # Classes module
├── academic-years/      # Academic years module
├── attendance/          # Attendance module
├── prayer/              # Prayer records module
├── results/             # Exam results module
├── announcements/       # Announcements module
├── app.module.ts        # Main application module
└── main.ts             # Application entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | `madrassa_db` |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |
| `PORT` | Application port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | CORS origin | `http://localhost:3000` |

## 🚀 Deployment

### Docker (Recommended)

1. **Build the image**
   ```bash
   docker build -t madrassa-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 3001:3001 --env-file .env madrassa-backend
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up environment variables**
   ```bash
   export NODE_ENV=production
   export DB_HOST=your-db-host
   export DB_PASSWORD=your-db-password
   # ... other environment variables
   ```

3. **Start the application**
   ```bash
   npm run start:prod
   ```

## 📝 API Documentation

API documentation will be available at `/api` when Swagger is implemented.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team.

---

**NOORUL YAKHEEN Higher Secondary Madrassa**  
*Empowering Islamic Education Through Technology*

