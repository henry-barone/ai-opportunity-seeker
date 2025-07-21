#!/bin/bash

# Webhook Tunnel Setup Script
echo "🚀 Setting up webhook tunnel for Lleverage.ai integration"
echo "======================================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if webhook server is running
echo -e "\n${YELLOW}1. Checking webhook server status...${NC}"
if pgrep -f "node server.cjs" > /dev/null; then
    echo -e "${GREEN}✅ Webhook server is running${NC}"
else
    echo -e "${RED}❌ Webhook server is not running${NC}"
    echo -e "${YELLOW}Starting webhook server...${NC}"
    nohup node server.cjs > webhook-server.log 2>&1 &
    sleep 2
    if pgrep -f "node server.cjs" > /dev/null; then
        echo -e "${GREEN}✅ Webhook server started${NC}"
    else
        echo -e "${RED}❌ Failed to start webhook server${NC}"
        exit 1
    fi
fi

# Test local webhook
echo -e "\n${YELLOW}2. Testing local webhook...${NC}"
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/webhook/status)
if [ "$STATUS_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Local webhook is responding${NC}"
else
    echo -e "${RED}❌ Local webhook is not responding${NC}"
    exit 1
fi

# Choose tunnel method
echo -e "\n${YELLOW}3. Choose tunnel method:${NC}"
echo -e "${BLUE}a) ngrok (recommended - requires free signup)${NC}"
echo -e "${BLUE}b) localtunnel (no signup required)${NC}"
echo -e "${BLUE}c) serveo (no signup required)${NC}"

echo -e "\n${YELLOW}Which method would you like to use? (a/b/c):${NC}"
read -r choice

case $choice in
    a|A)
        echo -e "\n${YELLOW}Setting up ngrok...${NC}"
        if ! command -v ngrok &> /dev/null; then
            echo -e "${RED}❌ ngrok is not installed${NC}"
            echo -e "${YELLOW}Installing ngrok...${NC}"
            if command -v brew &> /dev/null; then
                brew install ngrok
            else
                echo -e "${RED}Please install ngrok manually from https://ngrok.com/download${NC}"
                exit 1
            fi
        fi
        
        echo -e "${YELLOW}To use ngrok, you need to:${NC}"
        echo -e "${BLUE}1. Sign up at https://dashboard.ngrok.com/signup${NC}"
        echo -e "${BLUE}2. Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken${NC}"
        echo -e "${BLUE}3. Run: ngrok config add-authtoken YOUR_AUTHTOKEN${NC}"
        echo -e "${BLUE}4. Run: ngrok http 8080${NC}"
        echo -e "${BLUE}5. Copy the HTTPS URL and use: https://yoururl.ngrok.io/webhook/visualization-data${NC}"
        ;;
    b|B)
        echo -e "\n${YELLOW}Starting localtunnel...${NC}"
        if ! command -v lt &> /dev/null; then
            echo -e "${YELLOW}Installing localtunnel...${NC}"
            npm install -g localtunnel
        fi
        
        echo -e "${YELLOW}Starting tunnel...${NC}"
        echo -e "${GREEN}Your webhook URL will be: https://webhook-test.loca.lt/webhook/visualization-data${NC}"
        echo -e "${YELLOW}Starting localtunnel (press Ctrl+C to stop)...${NC}"
        lt --port 8080 --subdomain webhook-test
        ;;
    c|C)
        echo -e "\n${YELLOW}Starting serveo tunnel...${NC}"
        echo -e "${GREEN}Your webhook URL will be: https://webhook-test.serveo.net/webhook/visualization-data${NC}"
        echo -e "${YELLOW}Starting serveo tunnel (press Ctrl+C to stop)...${NC}"
        ssh -R webhook-test.serveo.net:80:localhost:8080 serveo.net
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac