#!/bin/bash

echo "🧪 Testing SPAIK Simplified Data Format"
echo "======================================"

API_URL="https://ai-opportunity-seeker.vercel.app"

echo ""
echo "📡 Testing Simplified Format Webhook..."
curl -X POST "$API_URL/webhook/visualization-data" \
  -H "Content-Type: application/json" \
  -H "User-Agent: SPAIK-Chatbot/1.0" \
  -d '{
    "processName": "Order Status Inquiries",
    "currentTime": 360,
    "futureTime": 60,
    "savingType": "time_saving",
    "frequency": "weekly",
    "efficiencyGain": "83%",
    "analysisComplete": true,
    "conversationStage": "complete",
    "responseText": "Perfect! Order status inquiries are one of the best processes to automate - customers get instant answers and you save tons of time.\n\n**AI Customer Service Assistant**: Automated system that instantly answers order status questions by connecting to your order management system\n\n**Time Saved**: From 6 hours to 1 hour per week\n\n**What Changes**: When customers ask \"Where'\''s my order?\" or \"Has my bike chain shipped?\", the AI instantly provides real-time tracking info, delivery estimates, and order details. You only handle complex issues that truly need human attention.\n\n**Your Expert Partner**: SPAIK'\''s team of AI specialists will handle all the technical complexity. They'\''ve successfully implemented similar solutions for 50+ SMEs in the Netherlands. You focus on your business while they make the AI work seamlessly.\n\n**Implementation Timeline**: 2-4 weeks from start to full automation\n\n**Ready to save 5 hours per week?**\n📅 Book a free consultation: https://spaik.io/consultation\n📊 View detailed ROI analysis: [Will be generated after our chat]"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s

echo ""
echo "================================="
echo "✅ Test Complete!"
echo ""
echo "Expected Results:"
echo "- Status: 200"
echo "- Response includes: success: true"
echo "- visualizationId: vis_[timestamp]_[random]"
echo "- solutionTitle: Order Status Inquiries"
echo "- weeklyHoursSaved: 5 (calculated from 360-60 minutes = 300 minutes = 5 hours)"
echo "- improvementPercentage: 83"
echo ""
echo "If successful, you can now use this format in your Voiceflow chatbot!"