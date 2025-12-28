# Create Mock Users via API
Write-Host "Creating users via API..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3001/api"
$users = @(
    # Ustads (Teachers)
    @{name="Sheikh Nasih Faizy";email="nasih.faizy@nyhsm.edu";password="password123";role="ustad"},
    @{name="Maulana Ibrahim Hassan";email="ibrahim.hassan@nyhsm.edu";password="password123";role="ustad"},
    @{name="Ustadh Yusuf Rahman";email="yusuf.rahman@nyhsm.edu";password="password123";role="ustad"},
    @{name="Sheikh Omar Khalid";email="omar.khalid@nyhsm.edu";password="password123";role="ustad"},
    @{name="Maulana Bilal Mahmoud";email="bilal.mahmoud@nyhsm.edu";password="password123";role="ustad"},
    # Students
    @{name="Ahmed Ibrahim Ali";email="ahmed.ibrahim@student.nyhsm.edu";password="password123";role="student"},
    @{name="Mohammed Hassan Saleh";email="mohammed.hassan@student.nyhsm.edu";password="password123";role="student"},
    @{name="Fatima Zahra Ahmad";email="fatima.zahra@student.nyhsm.edu";password="password123";role="student"},
    @{name="Aisha Noor Abdullah";email="aisha.noor@student.nyhsm.edu";password="password123";role="student"},
    @{name="Omar Farooq Yusuf";email="omar.farooq@student.nyhsm.edu";password="password123";role="student"},
    @{name="Khadija Maryam Hussain";email="khadija.maryam@student.nyhsm.edu";password="password123";role="student"},
    @{name="Abdullah Malik Rashid";email="abdullah.malik@student.nyhsm.edu";password="password123";role="student"},
    @{name="Zainab Safiya Ibrahim";email="zainab.safiya@student.nyhsm.edu";password="password123";role="student"},
    @{name="Hamza Tariq Siddiqui";email="hamza.tariq@student.nyhsm.edu";password="password123";role="student"},
    @{name="Mariam Layla Karim";email="mariam.layla@student.nyhsm.edu";password="password123";role="student"}
)

$created = 0
$skipped = 0

foreach ($user in $users) {
    try {
        $body = $user | ConvertTo-Json
        $result = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
        Write-Host "[OK] $($user.role): $($user.email)" -ForegroundColor Green
        $created++
    } catch {
        if ($_.Exception.Message -match "already exists") {
            Write-Host "[SKIP] $($user.email) - already exists" -ForegroundColor Yellow
            $skipped++
        } else {
            Write-Host "[ERROR] $($user.email) - $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    Start-Sleep -Milliseconds 100
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Created: $created users" -ForegroundColor Green
Write-Host "  Skipped: $skipped users" -ForegroundColor Yellow
Write-Host "  Total in system: $(1 + $created + $skipped) users (including admin)" -ForegroundColor White


