Write-Host "========================================" -ForegroundColor Green
Write-Host "Madrassa Database Setup Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "Checking if PostgreSQL is installed..." -ForegroundColor Yellow

try {
    $psqlVersion = psql --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "PostgreSQL found! Proceeding with database setup..." -ForegroundColor Green
    } else {
        throw "PostgreSQL not found"
    }
} catch {
    Write-Host "ERROR: PostgreSQL is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install PostgreSQL first. See POSTGRESQL_SETUP.md for instructions." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Creating database 'madrassa_db'..." -ForegroundColor Yellow

try {
    psql -U postgres -h localhost -c "CREATE DATABASE madrassa_db;" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database created successfully!" -ForegroundColor Green
    } else {
        Write-Host "Database might already exist or there was an error." -ForegroundColor Yellow
    }
} catch {
    Write-Host "Warning: Could not create database (might already exist)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Running database schema setup..." -ForegroundColor Yellow

try {
    psql -U postgres -h localhost -d madrassa_db -f scripts/setup-database.sql
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database schema setup completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Failed to run database schema setup" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} catch {
    Write-Host "ERROR: Failed to run database schema setup" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Database setup completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a .env file with your database credentials" -ForegroundColor White
Write-Host "2. Run: npm run start:dev" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"

