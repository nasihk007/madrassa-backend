@echo off
echo ========================================
echo Madrassa Database Setup Script
echo ========================================

echo.
echo Checking if PostgreSQL is installed...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH
    echo Please install PostgreSQL first. See POSTGRESQL_SETUP.md for instructions.
    pause
    exit /b 1
)

echo PostgreSQL found! Proceeding with database setup...
echo.

echo Creating database 'madrassa_db'...
psql -U postgres -h localhost -c "CREATE DATABASE madrassa_db;" 2>nul
if %errorlevel% equ 0 (
    echo Database created successfully!
) else (
    echo Database might already exist or there was an error.
)

echo.
echo Running database schema setup...
psql -U postgres -h localhost -d madrassa_db -f scripts/setup-database.sql
if %errorlevel% equ 0 (
    echo Database schema setup completed successfully!
) else (
    echo ERROR: Failed to run database schema setup
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database setup completed!
echo ========================================
echo.
echo Next steps:
echo 1. Create a .env file with your database credentials
echo 2. Run: npm run start:dev
echo.
pause

