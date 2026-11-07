# Sync public assets from coder-main.zip and temp cache into public/
$ErrorActionPreference = "SilentlyContinue"

$ws = Split-Path -Parent $PSScriptRoot
$zipPath = Join-Path $ws "coder-main.zip"
$tempRepoPublic = "C:\Users\askfo\AppData\Local\Temp\portfolio_repo\public"
$publicDir = Join-Path $ws "public"

Write-Host "Syncing assets to $publicDir..." -ForegroundColor Cyan

if (Test-Path $tempRepoPublic) {
    Copy-Item -Path "$tempRepoPublic\*" -Destination $publicDir -Recurse -Force
    Write-Host "✓ Copied public assets from temp cache." -ForegroundColor Green
} elseif (Test-Path $zipPath) {
    Expand-Archive -Path $zipPath -DestinationPath "$env:TEMP\coder_extract" -Force
    Copy-Item -Path "$env:TEMP\coder_extract\public\*" -Destination $publicDir -Recurse -Force
    Remove-Item -Path "$env:TEMP\coder_extract" -Recurse -Force
    Write-Host "✓ Extracted public assets from coder-main.zip." -ForegroundColor Green
}

Write-Host "Asset synchronization complete." -ForegroundColor Green

