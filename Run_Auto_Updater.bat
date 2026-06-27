@echo off
title Vardaan Comet - Auto Updater
echo Starting the Auto Updater...
echo Fetching and creating folders for any new students...
node sync_students.js
echo.
echo Leave this window open in the background!
node watch.js
pause
