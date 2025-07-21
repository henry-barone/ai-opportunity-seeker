#!/bin/bash

# Test public webhook URL
echo "🧪 Testing Public Webhook URL"
echo "============================"

# Check if URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide the public webhook URL"
    echo "Usage: $0 <public_webhook_url>"
    echo ""
    echo "Examples:"
    echo "  $0 https://abc123.ngrok.io"
    echo "  $0 https://webhook-test.loca.lt"
    exit 1
fi

PUBLIC_URL="$1"
WEBHOOK_URL="$PUBLIC_URL/webhook/visualization-data"

echo "🔍 Testing URL: $WEBHOOK_URL"

# Test 1: Check if the tunnel is accessible
echo -e "\n1. Testing tunnel accessibility..."
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PUBLIC_URL/webhook/status")
if [ "$STATUS_CODE" -eq 200 ]; then
    echo "✅ Tunnel is accessible"
else
    echo "❌ Tunnel is not accessible (HTTP $STATUS_CODE)"
    echo "💡 Wait 30 seconds and try again, or restart your tunnel"
    exit 1
fi

# Test 2: Test webhook endpoint with JSON
echo -e "\n2. Testing webhook with JSON data..."
JSON_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"recommendation":{"type":"time_saving","title":"Public URL Test","description":"Testing webhook from public URL"}}')

if echo "$JSON_RESPONSE" | grep -q '"success":true'; then
    WEBHOOK_ID=$(echo "$JSON_RESPONSE" | jq -r '.id' 2>/dev/null)
    echo "✅ JSON webhook test successful"
    echo "   Created ID: $WEBHOOK_ID"
else
    echo "❌ JSON webhook test failed"
    echo "   Response: $JSON_RESPONSE"
fi

# Test 3: Test webhook endpoint with string format
echo -e "\n3. Testing webhook with string format..."
STRING_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: text/plain" \
  -d "task:public_url_test
current:1_hour
future:15_minutes
type:time_saving
frequency:daily")

if echo "$STRING_RESPONSE" | grep -q '"success":true'; then
    STRING_ID=$(echo "$STRING_RESPONSE" | jq -r '.id' 2>/dev/null)
    echo "✅ String webhook test successful"
    echo "   Created ID: $STRING_ID"
else
    echo "❌ String webhook test failed"
    echo "   Response: $STRING_RESPONSE"
fi

# Final summary
echo -e "\n🎉 Public webhook URL testing complete!"
echo -e "\n📋 Summary:"
echo -e "   • Public URL: $PUBLIC_URL"
echo -e "   • Webhook endpoint: $WEBHOOK_URL"
echo -e "   • Status: Working ✅"

echo -e "\n🔗 Use this URL in your Lleverage.ai workflow:"
echo -e "   $WEBHOOK_URL"

echo -e "\n💡 Tips:"
echo -e "   • Keep your tunnel running while testing"
echo -e "   • Use HTTPS URLs for production"
echo -e "   • Test with small payloads first"