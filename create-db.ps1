Write-Host "Creating MadrassaDb database in PostgreSQL..." -ForegroundColor Cyan

# Set password environment variable
$env:PGPASSWORD = "root"

# Try to create the database
try {
    $output = psql -U postgres -c "CREATE DATABASE `"MadrassaDb`" WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;" 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database 'MadrassaDb' created successfully!" -ForegroundColor Green
    } else {
        if ($output -like "*already exists*") {
            Write-Host "ℹ️  Database 'MadrassaDb' already exists." -ForegroundColor Yellow
        } else {
            Write-Host "❌ Error creating database: $output" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
} finally {
    # Clear password
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}

Write-Host "`nVerifying database exists..." -ForegroundColor Cyan
$env:PGPASSWORD = "root"
psql -U postgres -c "\l" | Select-String "MadrassaDb"
Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
