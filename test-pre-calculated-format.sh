#!/bin/bash

echo "🧪 Testing SPAIK Pre-Calculated Data Format"
echo "==========================================="

API_URL="https://ai-opportunity-seeker.vercel.app"

echo ""
echo "📡 Testing Pre-Calculated Format Webhook..."
curl -X POST "$API_URL/webhook/visualization-data" \
  -H "Content-Type: application/json" \
  -H "User-Agent: SPAIK-PreCalculated/1.0" \
  -d '{
    "success": true,
    "id": "vis_1753103890931_9nf8lqj9er",
    "solutionType": "time_saving",
    "solutionTitle": "Order Processing Automation",
    "weeklyHoursSaved": 9.6,
    "yearlyCostSaved": 74880,
    "improvementPercentage": 80,
    "metrics": {
      "weeklyHoursSaved": 9.6,
      "yearlyHoursSaved": 499.2,
      "weeklyCostSaved": 1440,
      "yearlyCostSaved": 74880,
      "improvementPercentage": 80,
      "breakEvenWeeks": 4,
      "yearOneROI": 1398
    }
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "================================="
echo "✅ Pre-Calculated Format Test Complete!"
echo ""
echo "Expected Results:"
echo "- Status: 200"
echo "- Response includes: success: true"
echo "- visualizationId: vis_1753103890931_9nf8lqj9er (uses provided ID)"
echo "- solutionTitle: Order Processing Automation"
echo "- weeklyHoursSaved: 9.6 (uses provided value)"
echo "- improvementPercentage: 80"
echo "- yearlyCostSaved: 74880"
echo ""
echo "This format allows Voiceflow to send complete analysis results"
echo "with all calculations already done!"