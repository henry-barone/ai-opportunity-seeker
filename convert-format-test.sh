#!/bin/bash

echo "🔄 Testing Format Conversion Approach"
echo "====================================="

API_URL="https://ai-opportunity-seeker.vercel.app"

echo ""
echo "📡 Converting your new format to existing format and testing..."

# Convert the simplified format to the expected format
curl -X POST "$API_URL/webhook/visualization-data" \
  -H "Content-Type: application/json" \
  -H "User-Agent: SPAIK-Converted/1.0" \
  -d '{
    "userInfo": {
      "name": "SPAIK User",
      "email": "user@spaik.io"
    },
    "recommendation": {
      "type": "time_saving",
      "title": "Order Status Inquiries", 
      "description": "Automated system that instantly answers order status questions by connecting to your order management system",
      "currentState": {
        "metrics": {
          "timeSpent": 6
        }
      },
      "futureState": {
        "metrics": {
          "timeSpent": 1
        }
      },
      "improvement": {
        "percentage": 83,
        "absoluteValue": 5,
        "unit": "hours"
      }
    }
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "================================="
echo "✅ Conversion Test Complete!"
echo ""
echo "This shows how your simplified format:"
echo '{"processName": "Order Status Inquiries", "currentTime": 360, "futureTime": 60, "efficiencyGain": "83%"}'
echo ""
echo "Gets converted to the working format:"
echo '{"userInfo": {...}, "recommendation": {"type": "time_saving", "title": "Order Status Inquiries", "currentState": {"metrics": {"timeSpent": 6}}, "futureState": {"metrics": {"timeSpent": 1}}}}'
echo ""
echo "If you see success=true above, the conversion approach works!"