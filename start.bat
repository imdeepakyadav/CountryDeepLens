@echo off
echo Starting CountryDeepLens...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed. Please install npm with Node.js.
    pause
    exit /b 1
)

echo Installing API dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install API dependencies.
    pause
    exit /b 1
)

echo Installing client dependencies...
cd client
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install client dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo Starting API server on http://localhost:3000
echo Starting client on http://localhost:3001
echo API documentation available at http://localhost:3000/api-docs
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers
start "API Server" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
start "Client Server" cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting up...
echo Please wait a few seconds for them to fully load.
echo.
pause
