# CPAP Mask Selector - Deployment Helper Script
# This script helps you prepare your app for deployment

Write-Host "CPAP Mask Selector - Deployment Preparation" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Check if files are committed
$status = git status --porcelain
if ($status) {
    Write-Host "`nUncommitted changes detected:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host "`nWould you like to commit these changes? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq 'Y' -or $response -eq 'y') {
        git add .
        git commit -m "Prepare for deployment"
        Write-Host "Changes committed!" -ForegroundColor Green
    }
} else {
    Write-Host "All changes are committed." -ForegroundColor Green
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository" -ForegroundColor White
Write-Host "2. Push your code: git remote add origin <your-repo-url>" -ForegroundColor White
Write-Host "3. Push: git push -u origin main" -ForegroundColor White
Write-Host "4. Deploy backend to Railway (see DEPLOYMENT.md)" -ForegroundColor White
Write-Host "5. Deploy frontend to Vercel (see DEPLOYMENT.md)" -ForegroundColor White
Write-Host "`nFor detailed instructions, see DEPLOYMENT.md" -ForegroundColor Yellow

