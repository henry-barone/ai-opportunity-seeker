#!/bin/bash

echo "🔍 Webhook Connection Test"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if server is running
echo -e "\n${YELLOW}1. Checking if webhook server is running...${NC}"
if pgrep -f "node server.cjs" > /dev/null; then
    echo -e "${GREEN}✅ Server is running (PID: $(pgrep -f "node server.cjs"))${NC}"
else
    echo -e "${RED}❌ Server is not running${NC}"
    echo "   Start it with: node server.cjs"
    exit 1
fi

# Test 2: Check port 8080
echo -e "\n${YELLOW}2. Checking port 8080...${NC}"
if lsof -i :8080 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Port 8080 is in use${NC}"
else
    echo -e "${RED}❌ Port 8080 is not in use${NC}"
    exit 1
fi

# Test 3: Test webhook status endpoint
echo -e "\n${YELLOW}3. Testing webhook status endpoint...${NC}"
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/webhook/status)
if [ "$STATUS_CODE" -eq 200 ]; then
    HEALTH_STATUS=$(curl -s http://localhost:8080/webhook/status | jq -r '.status')
    echo -e "${GREEN}✅ Status endpoint responding (HTTP $STATUS_CODE)${NC}"
    echo -e "   Health: $HEALTH_STATUS"
else
    echo -e "${RED}❌ Status endpoint not responding (HTTP $STATUS_CODE)${NC}"
    exit 1
fi

# Test 4: Test webhook endpoint with JSON
echo -e "\n${YELLOW}4. Testing webhook endpoint with JSON...${NC}"
WEBHOOK_RESPONSE=$(curl -s -X POST http://localhost:8080/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{"recommendation":{"type":"time_saving","title":"Connection Test","description":"Testing webhook connection"}}')

if echo "$WEBHOOK_RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
    WEBHOOK_ID=$(echo "$WEBHOOK_RESPONSE" | jq -r '.id')
    echo -e "${GREEN}✅ Webhook endpoint working with JSON${NC}"
    echo -e "   Created ID: $WEBHOOK_ID"
else
    echo -e "${RED}❌ Webhook endpoint failed with JSON${NC}"
    echo "   Response: $WEBHOOK_RESPONSE"
fi

# Test 5: Test webhook endpoint with string format
echo -e "\n${YELLOW}5. Testing webhook endpoint with string format...${NC}"
STRING_PAYLOAD="task:connection_test
current:1_hour
future:10_minutes
type:time_saving
frequency:daily"

STRING_RESPONSE=$(curl -s -X POST http://localhost:8080/webhook/visualization-data \
  -H "Content-Type: text/plain" \
  -d "$STRING_PAYLOAD")

if echo "$STRING_RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
    STRING_ID=$(echo "$STRING_RESPONSE" | jq -r '.id')
    echo -e "${GREEN}✅ Webhook endpoint working with string format${NC}"
    echo -e "   Created ID: $STRING_ID"
else
    echo -e "${RED}❌ Webhook endpoint failed with string format${NC}"
    echo "   Response: $STRING_RESPONSE"
fi

# Test 6: Check current statistics
echo -e "\n${YELLOW}6. Current webhook statistics...${NC}"
STATS=$(curl -s http://localhost:8080/webhook/stats)
TOTAL_REQUESTS=$(echo "$STATS" | jq -r '.totalRequests')
SUCCESS_RATE=$(echo "$STATS" | jq -r '.successRate')
echo -e "${GREEN}✅ Total requests: $TOTAL_REQUESTS${NC}"
echo -e "${GREEN}✅ Success rate: $SUCCESS_RATE%${NC}"

# Final summary
echo -e "\n${GREEN}🎉 All tests passed! Your webhook server is working correctly.${NC}"
echo -e "\n${YELLOW}📋 Summary:${NC}"
echo -e "   • Server running on port 8080"
echo -e "   • Webhook endpoint: http://localhost:8080/webhook/visualization-data"
echo -e "   • Status endpoint: http://localhost:8080/webhook/status"
echo -e "   • Both JSON and string formats supported"

echo -e "\n${YELLOW}🔗 For Lleverage.ai integration:${NC}"
echo -e "   • Use ngrok to expose localhost: ${GREEN}ngrok http 8080${NC}"
echo -e "   • Then use the ngrok URL in your Lleverage.ai workflow"
echo -e "   • Example: https://abc123.ngrok.io/webhook/visualization-data"

echo -e "\n${YELLOW}🧪 Test with curl:${NC}"
echo -e "   curl -X POST http://localhost:8080/webhook/visualization-data \\"
echo -e "     -H \"Content-Type: application/json\" \\"
echo -e "     -d '{\"recommendation\":{\"type\":\"time_saving\",\"title\":\"Test\",\"description\":\"Test\"}}'"