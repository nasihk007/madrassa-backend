Write-Host "Checking Database Tables..." -ForegroundColor Cyan
$env:PGPASSWORD = "root"

Write-Host "`nTable Counts:" -ForegroundColor Yellow

$tables = @(
    "users",
    "students",
    "ustads",
    "class_divisions",
    "academic_years",
    "attendances",
    "prayers",
    "exam_results",
    "announcements"
)

foreach ($table in $tables) {
    $count = psql -U postgres -d postgres -t -c "SELECT COUNT(*) FROM $table;" 2>&1
    if ($count -match '\d+') {
        Write-Host "  $table : $($matches[0])" -ForegroundColor White
    } else {
        Write-Host "  $table : ERROR - $count" -ForegroundColor Red
    }
}

Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
Write-Host "`nPress any key..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
