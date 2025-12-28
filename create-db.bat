@echo off
echo Creating MadrassaDb database...
set PGPASSWORD=root
psql -U postgres -c "CREATE DATABASE \"MadrassaDb\" WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;"
if %errorlevel% == 0 (
    echo Database created successfully!
) else (
    echo Note: Database might already exist or check your credentials
)
set PGPASSWORD=
pause
