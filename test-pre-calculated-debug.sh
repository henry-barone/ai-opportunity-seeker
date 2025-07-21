#!/bin/bash

echo "🔍 Debug Pre-Calculated Format Detection"
echo "========================================"

API_URL="https://ai-opportunity-seeker.vercel.app"

echo ""
echo "📡 Testing format detection with debug info..."
curl -X POST "$API_URL/webhook/visualization-data" \
  -H "Content-Type: application/json" \
  -H "User-Agent: SPAIK-Debug/1.0" \
  -d '{
    "success": true,
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
echo "Expected: Pre-calculated format should be detected"
echo "Format criteria: success !== undefined AND solutionType AND solutionTitle AND metrics"