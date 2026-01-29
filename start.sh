#!/bin/bash

# BLUEBOT-V2 Startup Script

echo "╔════════════════════════════════════════════════════════════╗"
echo "║              Starting BLUEBOT-V2...                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 16 or higher from https://nodejs.org"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo ""
    echo "⚠️  Dependencies not found. Installing..."
    
    if command -v pnpm &> /dev/null
    then
        pnpm install
    else
        npm install
    fi
    
    echo "✓ Dependencies installed!"
fi

echo ""
echo "🚀 Starting bot..."
echo ""

# Start the bot
node index.js
