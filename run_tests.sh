#!/bin/sh

# Set up the debuging mode
set -e
set -x 

# verification of playwright is installed, else install it
if command -v npx > /dev/null; then
    echo "npx is installed"
else
    echo "npx is not installed"
    npm install -g npm@11.12.1
fi

# Make sure that playwright is installed
if command -v npx playwright > /dev/null; then
    echo "playwright is installed"
else
    echo "playwright is not installed"
    npm install playwright@latest
fi

# Run all tests
ENV=integration npx playwright test tests/ --trace on