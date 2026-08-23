@echo off
title Vardaan Portal - Push to GitHub
color 0B

echo ================================================================
echo             VARDAAN NOTES - ONE-CLICK GITHUB PUSH               
echo ================================================================
echo.

:: Ensure we are in the script's directory
cd /d "%~dp0"

:: Check if git is available
where git >nul 2>nul
if errorlevel 1 (
    color 0C
    echo [ERROR] Git is not installed or not in your system PATH.
    echo Please install Git from https://git-scm.com/
    goto END
)

:: Run portal page generators if Node is installed
where node >nul 2>nul
if not errorlevel 1 (
    echo [1/3] Updating student and subject index pages...
    if exist "generate_subject_pages.js" node generate_subject_pages.js >nul 2>nul
    if exist "generate_student_pages.js" node generate_student_pages.js >nul 2>nul
    if exist "auto_update_index.js" node auto_update_index.js >nul 2>nul
    echo       Done updating portal pages.
) else (
    echo [1/3] Skipping portal generator (Node.js not in PATH).
)
echo.

:: Stage all changes
echo [2/3] Adding all files and folders (git add)...
git add -A
echo.

:: Commit changes if any exist
echo [3/3] Syncing with GitHub...
set TIMESTAMP=%date% %time%
git commit -m "Update notes and portal files (%TIMESTAMP%)" >nul 2>nul

echo.
echo Pushing changes to GitHub (origin main)...
git push origin main

if errorlevel 1 (
    echo.
    echo Remote updates detected. Pulling with rebase and retrying push...
    git pull origin main --rebase
    git push origin main
)

if errorlevel 1 (
    color 0C
    echo.
    echo ================================================================
    echo    [FAILED] Could not push to GitHub.
    echo    Please check your internet connection or GitHub credentials.
    echo ================================================================
) else (
    color 0A
    echo.
    echo ================================================================
    echo    [SUCCESS] All files are pushed and up to date on GitHub!
    echo    Repository: abhisheksingh293/vardaan-notes
    echo ================================================================
)

:END
echo.
echo Press any key to close this window...
pause >nul

