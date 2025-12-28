# ========================================
# Populate Database Using CURL
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Populating Database via API (CURL)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3001/api"

# Step 1: Register Admin
Write-Host "Step 1: Creating Admin User..." -ForegroundColor Yellow
$adminJson = '{"name":"Ali Ahmed Faizy","email":"ali.faizy@nyhsm.edu","password":"admin123","role":"admin"}'
$adminResult = curl -X POST "$baseUrl/auth/register" -H "Content-Type: application/json" -d $adminJson 2>&1

if ($adminResult -match "access_token") {
    Write-Host "  [OK] Admin created successfully" -ForegroundColor Green
    # Extract token
    $adminToken = ($adminResult | ConvertFrom-Json).access_token
} else {
    Write-Host "  [INFO] $adminResult" -ForegroundColor Yellow
}

# Step 2: Register Ustads
Write-Host "`nStep 2: Creating Ustad (Teacher) Users..." -ForegroundColor Yellow

$ustads = @(
    '{"name":"Sheikh Nasih Faizy","email":"nasih.faizy@nyhsm.edu","password":"password123","role":"ustad"}',
    '{"name":"Maulana Ibrahim Hassan","email":"ibrahim.hassan@nyhsm.edu","password":"password123","role":"ustad"}',
    '{"name":"Ustadh Yusuf Rahman","email":"yusuf.rahman@nyhsm.edu","password":"password123","role":"ustad"}',
    '{"name":"Sheikh Omar Khalid","email":"omar.khalid@nyhsm.edu","password":"password123","role":"ustad"}',
    '{"name":"Maulana Bilal Mahmoud","email":"bilal.mahmoud@nyhsm.edu","password":"password123","role":"ustad"}'
)

foreach ($ustad in $ustads) {
    $result = curl -X POST "$baseUrl/auth/register" -H "Content-Type: application/json" -d $ustad 2>&1
    if ($result -match "access_token" -or $result -match "email") {
        $email = ($ustad | ConvertFrom-Json).email
        Write-Host "  [OK] Ustad: $email" -ForegroundColor Green
    } else {
        Write-Host "  [INFO] $result" -ForegroundColor Yellow
    }
    Start-Sleep -Milliseconds 100
}

# Step 3: Register Students
Write-Host "`nStep 3: Creating Student Users..." -ForegroundColor Yellow

$students = @(
    '{"name":"Ahmed Ibrahim Ali","email":"ahmed.ibrahim@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Mohammed Hassan Saleh","email":"mohammed.hassan@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Fatima Zahra Ahmad","email":"fatima.zahra@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Aisha Noor Abdullah","email":"aisha.noor@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Omar Farooq Yusuf","email":"omar.farooq@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Khadija Maryam Hussain","email":"khadija.maryam@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Abdullah Malik Rashid","email":"abdullah.malik@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Zainab Safiya Ibrahim","email":"zainab.safiya@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Hamza Tariq Siddiqui","email":"hamza.tariq@student.nyhsm.edu","password":"password123","role":"student"}',
    '{"name":"Mariam Layla Karim","email":"mariam.layla@student.nyhsm.edu","password":"password123","role":"student"}'
)

foreach ($student in $students) {
    $result = curl -X POST "$baseUrl/auth/register" -H "Content-Type: application/json" -d $student 2>&1
    if ($result -match "access_token" -or $result -match "email") {
        $email = ($student | ConvertFrom-Json).email
        Write-Host "  [OK] Student: $email" -ForegroundColor Green
    } else {
        Write-Host "  [INFO] $result" -ForegroundColor Yellow
    }
    Start-Sleep -Milliseconds 100
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " COMPLETED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "  - Admin: 1 user" -ForegroundColor White
Write-Host "  - Ustads: 5 users" -ForegroundColor White
Write-Host "  - Students: 10 users" -ForegroundColor White
Write-Host "  - Total: 16 users created" -ForegroundColor White
Write-Host ""

Write-Host "LOGIN CREDENTIALS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ADMIN:" -ForegroundColor Magenta
Write-Host "    Email: ali.faizy@nyhsm.edu" -ForegroundColor Green
Write-Host "    Password: admin123" -ForegroundColor Green
Write-Host ""
Write-Host "  USTAD (Teacher):" -ForegroundColor Magenta
Write-Host "    Email: nasih.faizy@nyhsm.edu" -ForegroundColor Green
Write-Host "    Password: password123" -ForegroundColor Green
Write-Host ""
Write-Host "  STUDENT:" -ForegroundColor Magenta
Write-Host "    Email: ahmed.ibrahim@student.nyhsm.edu" -ForegroundColor Green
Write-Host "    Password: password123" -ForegroundColor Green
Write-Host ""

Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "  1. Start frontend: cd ../madrassa-frontent" -ForegroundColor White
Write-Host "                     npm run dev" -ForegroundColor White
Write-Host "  2. Open: http://localhost:5173" -ForegroundColor White
Write-Host "  3. Login with any credentials above" -ForegroundColor White
Write-Host ""


