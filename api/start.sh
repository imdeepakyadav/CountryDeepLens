#!/bin/bash

echo "Starting CountryDeepLens..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm with Node.js."
    exit 1
fi

echo "Installing API dependencies..."
if ! npm install; then
    echo "Error: Failed to install API dependencies."
    exit 1
fi

echo "Installing client dependencies..."
cd client
if ! npm install; then
    echo "Error: Failed to install client dependencies."
    cd ..
    exit 1
fi
cd ..

echo
echo "Starting API server on http://localhost:3000"
echo "Starting client on http://localhost:3001"
echo "API documentation available at http://localhost:3000/api-docs"
echo
echo "Press Ctrl+C to stop both servers"
echo

# Function to cleanup background processes
cleanup() {
    echo
    echo "Stopping servers..."
    kill 0
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start API server in background
npm run dev &
API_PID=$!

# Wait a bit for API to start
sleep 3

# Start client in background
cd client && npm run dev &
CLIENT_PID=$!

# Wait for background processes
wait
