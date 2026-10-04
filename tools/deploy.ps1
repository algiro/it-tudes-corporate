# Build the site, then upload it to the server with tools/deploy.sh (runs in WSL).
#   .\tools\deploy.ps1            build + deploy (asks before replacing the previous site)
#   .\tools\deploy.ps1 -DryRun    build + show what would change
#   .\tools\deploy.ps1 -Yes       build + deploy without the first-time confirmation
param([switch]$DryRun, [switch]$Yes)
$ErrorActionPreference = "Stop"
$project = Split-Path -Parent $PSScriptRoot

Push-Location $project
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "build failed" }
} finally { Pop-Location }

$wslPath = "/mnt/" + $project.Substring(0, 1).ToLower() + ($project.Substring(2) -replace '\\', '/')
$extra = ""
if ($DryRun) { $extra += " --dry-run" }
if ($Yes) { $extra += " --yes" }
wsl bash -c "'$wslPath/tools/deploy.sh'$extra"
exit $LASTEXITCODE
