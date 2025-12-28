# PostgreSQL Setup Guide for Windows

## Option 1: Download and Install PostgreSQL Manually

### Step 1: Download PostgreSQL
1. Go to https://www.postgresql.org/download/windows/
2. Click on "Download the installer"
3. Choose the latest version (currently PostgreSQL 17.x)
4. Download the installer for Windows x86-64

### Step 2: Install PostgreSQL
1. Run the downloaded installer as Administrator
2. Choose installation directory (default is fine)
3. Select components:
   - PostgreSQL Server
   - pgAdmin 4 (GUI tool)
   - Command Line Tools
   - Stack Builder (optional)
4. Choose data directory (default is fine)
5. Set password for database superuser (postgres)
   - **IMPORTANT**: Remember this password!
   - Recommended: `postgres123` (for development)
6. Choose port (default 5432 is fine)
7. Choose locale (default is fine)
8. Complete installation

### Step 3: Add PostgreSQL to PATH
1. Open System Properties → Advanced → Environment Variables
2. Edit the PATH variable
3. Add: `C:\Program Files\PostgreSQL\17\bin`
4. Click OK and restart your terminal

## Option 2: Using Docker (Recommended for Development)

### Step 1: Install Docker Desktop
1. Download from: https://www.docker.com/products/docker-desktop/
2. Install and restart your computer
3. Start Docker Desktop

### Step 2: Run PostgreSQL Container
```bash
docker run --name madrassa-postgres -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=madrassa_db -p 5432:5432 -d postgres:15
```

## Option 3: Using WSL2 (Windows Subsystem for Linux)

### Step 1: Install WSL2
```powershell
wsl --install
```

### Step 2: Install PostgreSQL in WSL2
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres createuser --interactive
sudo -u postgres createdb madrassa_db
```

## Database Setup Commands

Once PostgreSQL is installed, run these commands:

### Connect to PostgreSQL
```bash
psql -U postgres -h localhost
```

### Create Database
```sql
CREATE DATABASE madrassa_db;
```

### Create User (Optional)
```sql
CREATE USER madrassa_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE madrassa_db TO madrassa_user;
```

### Exit psql
```sql
\q
```

## Environment Configuration

Update your `.env` file with these values:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres123
DB_DATABASE=madrassa_db

# JWT Configuration
JWT_SECRET=43204c52f27918151d4bc9be7f13bda224d7c244476ccf7c9c1e57f609c0332bc65b6a3cc69471d24202d78ddb6d89a77f62fecafbc16f058acf551b11d7be47
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Quick Setup Script

After installing PostgreSQL, you can run the setup script:

```bash
# Navigate to your backend directory
cd madrassa-backend

# Run the database setup script
psql -U postgres -h localhost -d madrassa_db -f scripts/setup-database.sql
```

## Troubleshooting

### Common Issues:
1. **"psql is not recognized"**: Add PostgreSQL bin directory to PATH
2. **"Connection refused"**: Make sure PostgreSQL service is running
3. **"Authentication failed"**: Check username/password in .env file

### Start PostgreSQL Service:
```bash
# Windows (if installed as service)
net start postgresql-x64-17

# Or restart the service
net stop postgresql-x64-17
net start postgresql-x64-17
```

### Check if PostgreSQL is running:
```bash
# Check if port 5432 is listening
netstat -an | findstr 5432
```

