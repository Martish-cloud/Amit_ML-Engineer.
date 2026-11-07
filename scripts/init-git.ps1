# Copies the .git folder from temp repo to the current workspace
$ErrorActionPreference = "SilentlyContinue"
$ws = Split-Path -Parent $PSScriptRoot
$tempGit = "C:\Users\askfo\AppData\Local\Temp\portfolio_repo\.git"
$destGit = Join-Path $ws ".git"

Write-Host "Setting up Git in $ws..." -ForegroundColor Cyan

if (Test-Path $tempGit) {
    Copy-Item -Path $tempGit -Destination $destGit -Recurse -Force
    Write-Host "✓ Synchronized .git repository from synced cache." -ForegroundColor Green
} else {
    Set-Location $ws
    git init
    git remote add origin https://github.com/Martish-cloud/Amit-Halder-Machine-Learning-Engineer-.git
    git fetch origin
    git branch -M main
    git branch --set-upstream-to=origin/main main
    Write-Host "✓ Initialized Git remote tracking origin/main." -ForegroundColor Green
}

Set-Location $ws
git status -sb

