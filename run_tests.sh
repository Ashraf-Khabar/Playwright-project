#!/bin/bash

# --- Color Codes ---
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

set -e

ENV_NAME="integration"
HEADLESS_FLAG=""
MODE_TEXT="Headless (Invisible)"

for arg in "$@"; do
  case $arg in
    env=*)
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
echo -e "${BLUE}           PLAYWRIGHT AUTOMATED RUNNER          ${NC}"
echo -e "${BLUE}===============================================${NC}"

if [ ! -f "tests-data/${ENV_NAME}.env" ]; then
    echo -e "${RED}Error: The file tests-data/${ENV_NAME}.env does not exist.${NC}"
    exit 1
fi

echo -e "${BLUE}Checking tools...${NC}"
if [ -d "node_modules/@playwright" ]; then
    echo -e "   [${GREEN}OK${NC}] Playwright is installed"
else
    echo -e "   [${YELLOW}..${NC}] Installing dependencies..."
    npm install
fi

COMMAND="ENV=$ENV_NAME npx playwright test tests/ --trace on --reporter=list,html,./utils/influx-reporter.ts ${HEADLESS_FLAG}"

echo -e "\n${BLUE}-----------------------------------------------${NC}"
echo -e "${GREEN}▶ Launching Tests...${NC}"
echo -e "   Environment : ${BLUE}$ENV_NAME.env${NC}"
echo -e "   Mode        : ${BLUE}$MODE_TEXT${NC}"
echo -e "${BLUE}-----------------------------------------------${NC}\n"

eval "$COMMAND"