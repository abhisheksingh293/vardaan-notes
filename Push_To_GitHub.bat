@echo off
setlocal EnableExtensions
title Vardaan Portal - Push to GitHub
color 0B

echo ================================================================
echo             VARDAAN NOTES - ONE-CLICK GITHUB PUSH               
echo ================================================================
echo.

:: Ensure we are in the script's directory
cd /d "%~dp0"

:: This repository publishes from its main branch
set "BRANCH=main"

:: Check if git is available
where git >nul 2>nul
if errorlevel 1 goto NO_GIT

if not exist ".git" goto NO_REPOSITORY

:: Run portal page generators if Node is installed
where node >nul 2>nul
if errorlevel 1 goto SKIP_GENERATORS
echo [1/3] Updating student and subject index pages...
if exist "generate_subject_pages.js" node generate_subject_pages.js >nul 2>nul
if exist "generate_student_pages.js" node generate_student_pages.js >nul 2>nul
if exist "auto_update_index.js" node auto_update_index.js >nul 2>nul
echo       Done updating portal pages.
goto GENERATORS_DONE

:SKIP_GENERATORS
echo [1/3] Skipping portal generator (Node.js not in PATH).

:GENERATORS_DONE
echo.

:: Stage all changes
echo [2/3] Adding all files and folders (git add)...
git add -A
echo.

:: Commit changes if any exist
echo [3/3] Creating a commit when changes are present...
git diff --cached --quiet
if errorlevel 1 goto COMMIT_CHANGES
echo       No local changes to commit.
goto SYNC

:COMMIT_CHANGES
set "TIMESTAMP=%date% %time%"
git commit -m "Update notes and portal files (%TIMESTAMP%)"

:SYNC
echo.
echo Syncing with GitHub...
git pull --rebase origin "%BRANCH%"

if errorlevel 1 goto SYNC_FAILED

echo.
echo Pushing changes to GitHub (%BRANCH%)...
git push origin "%BRANCH%"

if errorlevel 1 goto PUSH_FAILED
color 0A
echo.
echo ================================================================
echo    [SUCCESS] All files are pushed and up to date on GitHub!
echo    Branch: %BRANCH%
echo ================================================================
goto END

:NO_GIT
color 0C
echo [ERROR] Git is not installed or not in your system PATH.
echo Please install Git from https://git-scm.com/
goto END

:NO_REPOSITORY
color 0C
echo [ERROR] This folder is not a Git repository.
goto END

:SYNC_FAILED
color 0C
echo.
echo ================================================================
echo    [FAILED] Could not sync local changes with GitHub.
echo    Resolve any conflict or credential problem, then run again.
echo ================================================================
goto END

:PUSH_FAILED
color 0C
echo.
echo ================================================================
echo    [FAILED] Could not push to GitHub.
echo    Please check your internet connection or GitHub credentials.
echo ================================================================

:END
echo.
echo Press any key to close this window...
pause >nul
exit /b

