@echo off
title CARBONIQ Development Server
cd /d "%~dp0"
echo Starting CARBONIQ Development Server with Hot-Reload...
npm run dev -- --host
pause
