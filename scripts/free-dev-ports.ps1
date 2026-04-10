# ============================================================================
# FILE: scripts/free-dev-ports.ps1
# PURPOSE: Frees common ISHU local development ports before startup.
# WHY: Stale node processes on 5000/5173 can serve outdated backend/frontend
#      instances and cause confusing runtime behavior.
# ============================================================================

[CmdletBinding()]
param(
  [int[]]$Ports = @(5000, 5173, 8000)
)

$ErrorActionPreference = "Stop"

Write-Host "[dev-ports] Checking active listeners on ports: $($Ports -join ', ')"

foreach ($port in $Ports) {
  $listeners = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue

  if (-not $listeners) {
    Write-Host "[dev-ports] Port $port is free"
    continue
  }

  $processIds = $listeners | Select-Object -ExpandProperty OwningProcess -Unique

  foreach ($processId in $processIds) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue

    if (-not $process) {
      continue
    }

    Write-Host "[dev-ports] Stopping PID $processId ($($process.ProcessName)) on port $port"
    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
  }
}

Write-Host "[dev-ports] Port cleanup complete"
