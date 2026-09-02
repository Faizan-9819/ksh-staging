#!/usr/bin/env bash
# Runs after `npm run build`. If pm2 is installed, (re)start the app under it
# so the process survives crashes and server reboots; otherwise no-op so
# `npm run build` still succeeds on machines without pm2 (e.g. local dev).
set -euo pipefail

if ! command -v pm2 >/dev/null 2>&1; then
  echo "[pm2-deploy] pm2 not found on PATH — skipping pm2 start (build still succeeded)."
  exit 0
fi

cd "$(dirname "$0")/.."

mkdir -p logs

# One-time setup, safe to re-run — pm2-logrotate keeps ecosystem.config.js's
# out_file/error_file from growing unbounded across months of uptime, which
# on a small disk eventually slows every process on the box, this one
# included. `pm2 install` is idempotent: a no-op if it's already installed.
if ! pm2 list 2>/dev/null | grep -q "pm2-logrotate"; then
  echo "[pm2-deploy] Installing pm2-logrotate (one-time)."
  pm2 install pm2-logrotate || echo "[pm2-deploy] pm2-logrotate install failed — continuing anyway."
fi

if pm2 describe ksh-2026-infra >/dev/null 2>&1; then
  echo "[pm2-deploy] ksh-2026-infra already running under pm2 — reloading with latest build."
  pm2 reload ecosystem.config.js --update-env
else
  echo "[pm2-deploy] Starting ksh-2026-infra under pm2."
  pm2 start ecosystem.config.js
fi

pm2 save

echo "[pm2-deploy] Done. Current pm2 status:"
pm2 status ksh-2026-infra
