#!/bin/bash

# Webhook Debug Tool
echo "🔍 Webhook Debug Tool"
echo "===================="

WEBHOOK_URL="https://1f927e19a631.ngrok-free.app/webhook/visualization-data"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing webhook URL: $WEBHOOK_URL${NC}"

# Test 1: Check if URL is accessible
echo -e "\n${YELLOW}1. Testing URL accessibility...${NC}"
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$WEBHOOK_URL")
echo -e "   Status code: $STATUS_CODE"

if [ "$STATUS_CODE" -eq 400 ]; then
    echo -e "${GREEN}✅ URL is accessible (400 is expected for GET request)${NC}"
elif [ "$STATUS_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ URL is accessible${NC}"
else
    echo -e "${RED}❌ URL accessibility issue (Status: $STATUS_CODE)${NC}"
fi

# Test 2: Test POST without Content-Type (common Lleverage.ai issue)
echo -e "\n${YELLOW}2. Testing POST without Content-Type...${NC}"
NO_CONTENT_TYPE_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" -d '{"test": "data"}')
echo -e "   Response: $NO_CONTENT_TYPE_RESPONSE"

if echo "$NO_CONTENT_TYPE_RESPONSE" | grep -q "Content-Type must be application/json"; then
    echo -e "${YELLOW}⚠️  Missing Content-Type header detected${NC}"
fi

# Test 3: Test POST with wrong Content-Type
echo -e "\n${YELLOW}3. Testing POST with wrong Content-Type...${NC}"
WRONG_CONTENT_TYPE_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" -H "Content-Type: application/x-www-form-urlencoded" -d '{"test": "data"}')
echo -e "   Response: $WRONG_CONTENT_TYPE_RESPONSE"

# Test 4: Test POST with correct Content-Type but invalid JSON
echo -e "\n${YELLOW}4. Testing POST with invalid JSON...${NC}"
INVALID_JSON_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" -H "Content-Type: application/json" -d '{invalid json}')
echo -e "   Response: $INVALID_JSON_RESPONSE"

# Test 5: Test POST with valid JSON but missing required fields
echo -e "\n${YELLOW}5. Testing POST with missing required fields...${NC}"
MISSING_FIELDS_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" -H "Content-Type: application/json" -d '{"test": "data"}')
echo -e "   Response: $MISSING_FIELDS_RESPONSE"

# Test 6: Test POST with your exact format
echo -e "\n${YELLOW}6. Testing POST with your exact format...${NC}"
CORRECT_FORMAT_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_k9m2x8n3",
    "sessionId": "session_20250718_a7b2",
    "processName": "Quote Generation",
    "currentTime": 120,
    "futureTime": 30,
    "savingType": "time_saving",
    "frequency": "daily",
    "efficiencyGain": 75,
    "analysisComplete": true,
    "conversationStage": "complete",
    "responseText": "Analysis completed successfully"
  }')

echo -e "   Response: $CORRECT_FORMAT_RESPONSE"

if echo "$CORRECT_FORMAT_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Your format works correctly!${NC}"
else
    echo -e "${RED}❌ Issue with your format${NC}"
fi

echo -e "\n${BLUE}🎯 Common Issues and Solutions:${NC}"
echo -e "\n${YELLOW}Issue 1: Missing Content-Type header${NC}"
echo -e "   Solution: Add 'Content-Type: application/json' to headers"

echo -e "\n${YELLOW}Issue 2: Wrong HTTP method${NC}"
echo -e "   Solution: Use POST method, not GET"

echo -e "\n${YELLOW}Issue 3: Invalid JSON${NC}"
echo -e "   Solution: Ensure JSON is properly formatted"

echo -e "\n${YELLOW}Issue 4: Missing required fields${NC}"
echo -e "   Solution: Include 'processName' and at least one time field"

echo -e "\n${YELLOW}Issue 5: URL not accessible${NC}"
echo -e "   Solution: Check ngrok is running and URL is correct"

echo -e "\n${BLUE}🔧 Lleverage.ai Configuration Checklist:${NC}"
echo -e "✅ Method: POST"
echo -e "✅ URL: $WEBHOOK_URL"
echo -e "✅ Headers: Content-Type: application/json"
echo -e "✅ Body: Valid JSON with required fields"

echo -e "\n${BLUE}📋 Required Fields:${NC}"
echo -e "• processName (string) - Required"
echo -e "• currentTime OR futureTime (number) - At least one required"

echo -e "\n${BLUE}📋 Optional Fields:${NC}"
echo -e "• userId, sessionId, savingType, frequency, efficiencyGain, analysisComplete, conversationStage, responseText"

echo -e "\n${GREEN}If webhook works here but not in Lleverage.ai, the issue is in your Lleverage.ai configuration!${NC}"