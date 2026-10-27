@echo off
title CARBONIQ - Carbon Footprint Monitoring System
cd /d "%~dp0"

echo =======================================================
echo   CARBONIQ - AI Carbon Footprint Monitoring System
echo =======================================================
echo.
echo Choose an option:
echo   [1] Start Development Server (Hot-reload, port 5173/5175)
echo   [2] Build Production Bundle
echo   [3] Start Production Preview Server (Built dist, port 4173)
echo   [4] Install / Update Dependencies
echo   [5] Exit
echo.

set /p choice="Enter choice [1-5]: "

if "%choice%"=="1" goto DEV
if "%choice%"=="2" goto BUILD
if "%choice%"=="3" goto PREVIEW
if "%choice%"=="4" goto INSTALL
if "%choice%"=="5" exit /b 0

echo Invalid choice. Starting Dev Server by default...
goto DEV

:DEV
echo Starting Dev Server...
npm run dev
pause
exit /b 0

:BUILD
echo Building Production Assets...
npm run build
pause
exit /b 0

:PREVIEW
echo Building and Starting Production Preview...
npm run build && npm run preview -- --host
pause
exit /b 0

:INSTALL
echo Installing dependencies...
npm install
pause
exit /b 0
