#!/bin/bash

echo "🧪 Testing Voiceflow Webhook Fixes"
echo "================================="

API_URL="https://ai-opportunity-seeker.vercel.app"

echo ""
echo "📡 1. Testing Simple Voiceflow Test Endpoint..."
curl -X POST "$API_URL/test-voiceflow" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Voiceflow-Test/1.0" \
  -d '{"test": "hello from voiceflow", "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")'"}' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "================================="
echo "📡 2. Testing Main Webhook with Enhanced Logging..."
curl -X POST "$API_URL/webhook/visualization-data" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Voiceflow-Bot/1.0" \
  -d '{
    "userInfo": {
      "name": "Test User",
      "email": "test@voiceflow.com"
    },
    "recommendation": {
      "type": "time_saving",
      "title": "Voiceflow Integration Test",
      "description": "Testing webhook response capture",
      "currentState": {
        "metrics": {
          "timeSpent": 12
        }
      },
      "futureState": {
        "metrics": {
          "timeSpent": 3
        }
      }
    }
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "================================="
echo "📡 3. Testing Simple Webhook Endpoint..."
curl -X POST "$API_URL/webhook/simple" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Voiceflow-Simple/1.0" \
  -d '{
    "userInfo": {
      "name": "Simple Test",
      "email": "simple@test.com"
    },
    "recommendation": {
      "type": "cost_reduction",
      "title": "Simple Response Test",
      "currentState": {"metrics": {"timeSpent": 8}},
      "futureState": {"metrics": {"timeSpent": 2}}
    }
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "================================="
echo "✅ Testing Complete!"
echo ""
echo "🔍 Check Vercel logs to see detailed request/response logging"
echo "📖 Follow the Voiceflow setup guide in VOICEFLOW_SETUP_GUIDE.md"
echo ""
echo "🎯 Recommended test order in Voiceflow:"
echo "1. First try: $API_URL/test-voiceflow"
echo "2. Then try: $API_URL/webhook/simple" 
echo "3. Finally: $API_URL/webhook/visualization-data"