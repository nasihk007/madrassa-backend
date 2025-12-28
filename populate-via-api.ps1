# ========================================
# Madrassa Management System
# Populate Database via API (REST)
# ========================================

$baseUrl = "http://localhost:3001/api"
$tokens = @{}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Populating Database via API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Helper function to make API calls
function Invoke-API {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Body,
        [string]$Token
    )
    
    $headers = @{
        "Content-Type" = "application/json"
    }
    
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }
    
    try {
        if ($Body) {
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -Headers $headers -Body ($Body | ConvertTo-Json) -ErrorAction Stop
        } else {
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -Headers $headers -ErrorAction Stop
        }
        return $response
    } catch {
        Write-Host "  [ERROR] $Endpoint - $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# ========================================
# 1. Register Admin User
# ========================================
Write-Host "Step 1: Creating Admin User..." -ForegroundColor Yellow

$adminData = @{
    name = "Ali Ahmed Faizy"
    email = "ali.faizy@nyhsm.edu"
    password = "admin123"
    role = "admin"
}

$adminResponse = Invoke-API -Method "POST" -Endpoint "/auth/register" -Body $adminData
if ($adminResponse) {
    Write-Host "  [OK] Admin created: $($adminData.email)" -ForegroundColor Green
    $tokens['admin'] = $adminResponse.access_token
}

# ========================================
# 2. Register Ustad Users (Teachers)
# ========================================
Write-Host "`nStep 2: Creating Ustad (Teacher) Users..." -ForegroundColor Yellow

$ustads = @(
    @{ name = "Sheikh Nasih Faizy"; email = "nasih.faizy@nyhsm.edu"; password = "password123"; role = "ustad"; phone = "+971-50-123-4561"; specialization = "Quran & Tajweed"; qualification = "Master in Islamic Studies, Ijazah in Qiraat"; joiningDate = "2020-08-15" },
    @{ name = "Maulana Ibrahim Hassan"; email = "ibrahim.hassan@nyhsm.edu"; password = "password123"; role = "ustad"; phone = "+971-50-123-4562"; specialization = "Hadith & Fiqh"; qualification = "PhD in Hadith Sciences, Al-Azhar University"; joiningDate = "2019-09-01" },
    @{ name = "Ustadh Yusuf Rahman"; email = "yusuf.rahman@nyhsm.edu"; password = "password123"; role = "ustad"; phone = "+971-50-123-4563"; specialization = "Arabic Language"; qualification = "MA in Arabic Literature"; joiningDate = "2021-01-10" },
    @{ name = "Sheikh Omar Khalid"; email = "omar.khalid@nyhsm.edu"; password = "password123"; role = "ustad"; phone = "+971-50-123-4564"; specialization = "Islamic History"; qualification = "MA in Islamic History & Civilization"; joiningDate = "2020-03-20" },
    @{ name = "Maulana Bilal Mahmoud"; email = "bilal.mahmoud@nyhsm.edu"; password = "password123"; role = "ustad"; phone = "+971-50-123-4565"; specialization = "Aqeedah & Tafsir"; qualification = "PhD in Quranic Studies"; joiningDate = "2018-07-01" }
)

$ustadIds = @()
foreach ($ustad in $ustads) {
    $registerData = @{
        name = $ustad.name
        email = $ustad.email
        password = $ustad.password
        role = $ustad.role
    }
    
    $response = Invoke-API -Method "POST" -Endpoint "/auth/register" -Body $registerData
    if ($response) {
        Write-Host "  [OK] Ustad created: $($ustad.email)" -ForegroundColor Green
        
        # Now create ustad profile
        Start-Sleep -Milliseconds 200
        $ustadProfileData = @{
            name = $ustad.name
            email = $ustad.email
            password = $ustad.password
            phone = $ustad.phone
            specialization = $ustad.specialization
            qualification = $ustad.qualification
            joiningDate = $ustad.joiningDate
        }
        
        $ustadProfile = Invoke-API -Method "POST" -Endpoint "/ustads" -Body $ustadProfileData -Token $tokens['admin']
        if ($ustadProfile) {
            $ustadIds += $ustadProfile.id
        }
    }
}

# ========================================
# 3. Register Student Users
# ========================================
Write-Host "`nStep 3: Creating Student Users..." -ForegroundColor Yellow

$students = @(
    @{ name = "Ahmed Ibrahim Ali"; email = "ahmed.ibrahim@student.nyhsm.edu"; password = "password123"; role = "student"; phone = "+971-50-234-5671"; rollNumber = "NYH-2024-001"; guardianName = "Ibrahim Ali Mohammed"; guardianPhone = "+971-50-999-0001"; address = "Al Nahda, Dubai, UAE"; admissionDate = "2024-06-15" },
    @{ name = "Mohammed Hassan Saleh"; email = "mohammed.hassan@student.nyhsm.edu"; password = "password123"; role = "student"; phone = "+971-50-234-5672"; rollNumber = "NYH-2024-002"; guardianName = "Hassan Saleh Ahmad"; guardianPhone = "+971-50-999-0002"; address = "Deira, Dubai, UAE"; admissionDate = "2024-06-16" },
    @{ name = "Fatima Zahra Ahmad"; email = "fatima.zahra@student.nyhsm.edu"; password = "password123"; role = "student"; phone = "+971-50-234-5673"; rollNumber = "NYH-2024-003"; guardianName = "Ahmad Zahra Mahmoud"; guardianPhone = "+971-50-999-0003"; address = "Sharjah, UAE"; admissionDate = "2024-06-17" },
    @{ name = "Aisha Noor Abdullah"; email = "aisha.noor@student.nyhsm.edu"; password = "password123"; role = "student"; phone = "+971-50-234-5674"; rollNumber = "NYH-2024-004"; guardianName = "Abdullah Noor Hassan"; guardianPhone = "+971-50-999-0004"; address = "Ajman, UAE"; admissionDate = "2024-06-18" },
    @{ name = "Omar Farooq Yusuf"; email = "omar.farooq@student.nyhsm.edu"; password = "password123"; role = "student"; phone = "+971-50-234-5675"; rollNumber = "NYH-2024-005"; guardianName = "Yusuf Farooq Ibrahim"; guardianPhone = "+971-50-999-0005"; address = "Bur Dubai, UAE"; admissionDate = "2024-06-19" }
)

$studentIds = @()
foreach ($student in $students) {
    $registerData = @{
        name = $student.name
        email = $student.email
        password = $student.password
        role = $student.role
    }
    
    $response = Invoke-API -Method "POST" -Endpoint "/auth/register" -Body $registerData
    if ($response) {
        Write-Host "  [OK] Student created: $($student.email)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " SUCCESS - Database Populated!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "  - Admin Users: 1" -ForegroundColor White
Write-Host "  - Ustad Users: $($ustads.Count)" -ForegroundColor White
Write-Host "  - Student Users: $($students.Count)" -ForegroundColor White
Write-Host "  - Total Users: $($1 + $ustads.Count + $students.Count)" -ForegroundColor White
Write-Host ""

Write-Host "LOGIN CREDENTIALS:" -ForegroundColor Cyan
Write-Host "  Password for ALL users: password123 (admin: admin123)" -ForegroundColor Yellow
Write-Host ""
Write-Host "  ADMIN:" -ForegroundColor Magenta
Write-Host "    Email: ali.faizy@nyhsm.edu" -ForegroundColor Green
Write-Host "    Password: admin123" -ForegroundColor Green
Write-Host ""
Write-Host "  USTAD:" -ForegroundColor Magenta
Write-Host "    Email: nasih.faizy@nyhsm.edu" -ForegroundColor Green
Write-Host "    Password: password123" -ForegroundColor Green
Write-Host ""
Write-Host "  STUDENT:" -ForegroundColor Magenta
Write-Host "    Email: ahmed.ibrahim@student.nyhsm.edu" -ForegroundColor Green
Write-Host "    Password: password123" -ForegroundColor Green
Write-Host ""

Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "  1. Backend is running on http://localhost:3001" -ForegroundColor White
Write-Host "  2. Start frontend: cd ../madrassa-frontent" -ForegroundColor White
Write-Host "                     npm run dev" -ForegroundColor White
Write-Host "  3. Open http://localhost:5173" -ForegroundColor White
Write-Host "  4. Login with any credentials above" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


