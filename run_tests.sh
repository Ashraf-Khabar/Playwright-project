#!/bin/bash

# --- Color Codes ---
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Exit immediately if a command exits with a non-zero status
set -e

# Default values
ENV_NAME="integration"
HEADLESS_FLAG=""
MODE_TEXT="Headless (Invisible)"

# 1. Parameter Analysis (Logic for parameter=value)
# "$@" represents all arguments passed to the script
for arg in "$@"; do
  case $arg in
    env=*)
      # Extracts the value after the '=' sign
      ENV_NAME="${arg#*=}"
      ;;
    headless=*)
      HEADLESS_VAL="${arg#*=}"
      if [[ "$HEADLESS_VAL" == "false" ]]; then
          HEADLESS_FLAG="--headed"
          MODE_TEXT="Headed (Visible)"
      fi
      ;;
  esac
done

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}          PLAYWRIGHT AUTOMATED RUNNER          ${NC}"
echo -e "${BLUE}===============================================${NC}"

# 2. Environment Verification
# Checks if the specified .env file exists in the tests-data folder
if [ ! -f "tests-data/${ENV_NAME}.env" ]; then
    echo -e "${RED}Error: The file tests-data/${ENV_NAME}.env does not exist.${NC}"
    exit 1
fi

# 3. Tools Verification
echo -e "${BLUE}Checking tools...${NC}"
if [ -d "node_modules/@playwright" ]; then
    echo -e "   [${GREEN}OK${NC}] Playwright is installed"
else
    echo -e "   [${YELLOW}..${NC}] Installing dependencies..."
    npm install
fi

# 4. Final Execution
# Constructs the command string using variables
COMMAND="ENV=$ENV_NAME npx playwright test tests/ --trace on --reporter=list,html ${HEADLESS_FLAG}"

echo -e "\n${BLUE}-----------------------------------------------${NC}"
echo -e "${GREEN}▶ Launching Tests...${NC}"
echo -e "   Environment : ${BLUE}$ENV_NAME.env${NC}"
echo -e "   Mode        : ${BLUE}$MODE_TEXT${NC}"
echo -e "${BLUE}-----------------------------------------------${NC}\n"

# Execute the command string
eval "$COMMAND"