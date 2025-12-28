# 🚀 Quick Start Guide - Madrassa Backend (Sequelize)

## Installation & Setup (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
The `.env` file is already configured with:
```env
DATABASE_TYPE=sqlite
SKIP_DB_SYNC=false  # Auto-sync database in development
JWT_SECRET=<your-secret>
PORT=3001
```

### Step 3: Run the Server
```bash
npm run start:dev
```

✅ **That's it!** The database will automatically sync and the server will start.

---

## Expected Output

```bash
✅ Database connection established successfully
✅ Database synchronized successfully
[Nest] 12345  - 2025/01/15, 10:30:00 AM     LOG [NestApplication] Nest application successfully started
🚀 Server is running on port 3001
```

---

## Available Scripts

```bash
npm run start:dev     # Start in development mode (auto-reload)
npm run start:debug   # Start in debug mode
npm run start:prod    # Start in production mode
npm run build         # Build for production
npm run db:sync       # Manually sync database
```

---

## Test the API

### 1. Register a User
```bash
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "name": "Ali Faizy",
  "email": "ali.faizy@nyhsm.edu",
  "password": "admin123",
  "role": "admin"
}
```

### 2. Login
```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "ali.faizy@nyhsm.edu",
  "password": "admin123"
}
```

### 3. Get All Students (requires JWT token)
```bash
GET http://localhost:3001/api/students
Authorization: Bearer <your-jwt-token>
```

---

## Database Files

- **SQLite (Development)**: `madrassa.db` (auto-created)
- **PostgreSQL (Production)**: Configure in `.env`

---

## Switching to PostgreSQL

Update `.env`:
```env
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=madrassa
SKIP_DB_SYNC=false
```

Restart the server:
```bash
npm run start:dev
```

---

## Swagger API Documentation

Once the server is running, visit:
```
http://localhost:3001/documentation
```

---

## Troubleshooting

### ❌ Error: Cannot find module 'sequelize-typescript'
```bash
npm install
```

### ❌ Database tables not created
Check `.env`:
```env
SKIP_DB_SYNC=false  # Must be false to sync
```

### ❌ Port already in use
Change port in `.env`:
```env
PORT=3002
```

---

## 📚 Full Documentation

- **Complete Migration Guide**: `SEQUELIZE_MIGRATION_GUIDE.md`
- **Migration Summary**: `MIGRATION_SUMMARY.md`

---

## ✅ Ready to Go!

Your Madrassa Backend with Sequelize is ready to use! 🎉
