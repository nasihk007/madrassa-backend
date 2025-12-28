Write-Host "Executing Mock Data SQL Script..." -ForegroundColor Cyan

# Set password environment variable
$env:PGPASSWORD = "root"

try {
    # Execute the SQL file
    Write-Host "Connecting to PostgreSQL and executing MOCK_DATA.sql..." -ForegroundColor Yellow

    $output = psql -U postgres -d postgres -f "MOCK_DATA.sql" 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Mock data inserted successfully!" -ForegroundColor Green
        Write-Host "`nData Summary:" -ForegroundColor Cyan
        Write-Host "  - Users: 16 (1 Admin, 5 Ustads, 10 Students)" -ForegroundColor White
        Write-Host "  - Students: 10" -ForegroundColor White
        Write-Host "  - Ustads: 5" -ForegroundColor White
        Write-Host "  - Class Divisions: 7" -ForegroundColor White
        Write-Host "  - Academic Years: 3" -ForegroundColor White
        Write-Host "  - Attendance Records: 15" -ForegroundColor White
        Write-Host "  - Prayer Records: 15" -ForegroundColor White
        Write-Host "  - Exam Results: 25" -ForegroundColor White
        Write-Host "  - Announcements: 10" -ForegroundColor White
        Write-Host "`nLogin Credentials (Password for all: password123):" -ForegroundColor Cyan
        Write-Host "  Admin: ali.faizy@nyhsm.edu" -ForegroundColor Green
        Write-Host "  Ustad: nasih.faizy@nyhsm.edu" -ForegroundColor Green
        Write-Host "  Student: ahmed.ibrahim@student.nyhsm.edu" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Error executing SQL:" -ForegroundColor Red
        Write-Host $output -ForegroundColor Red
    }
} catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
} finally {
    # Clear password
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
