Write-Host "Checking Database Tables..." -ForegroundColor Cyan
$env:PGPASSWORD = "root"

Write-Host "`nExecuting queries..." -ForegroundColor Yellow

psql -U postgres -d postgres -c "
SELECT
    'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'students', COUNT(*) FROM students
UNION ALL
SELECT 'ustads', COUNT(*) FROM ustads
UNION ALL
SELECT 'class_divisions', COUNT(*) FROM class_divisions
UNION ALL
SELECT 'academic_years', COUNT(*) FROM academic_years
UNION ALL
SELECT 'attendances', COUNT(*) FROM attendances
UNION ALL
SELECT 'prayers', COUNT(*) FROM prayers
UNION ALL
SELECT 'exam_results', COUNT(*) FROM exam_results
UNION ALL
SELECT 'announcements', COUNT(*) FROM announcements;
"

Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
Write-Host "`nPress any key..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
