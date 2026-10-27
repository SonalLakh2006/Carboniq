@echo off
title CARBONIQ Production Server
cd /d "%~dp0"
echo Starting CARBONIQ Production Build and Server...
npm run build && npm run preview -- --host --port 4173
pause
