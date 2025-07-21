# Webhook Testing Guide

## 🎯 Webhook.site Integration

I've temporarily implemented webhook testing using **webhook.site** for easy testing and inspection of webhook data.

### 🔗 Test URL
```
https://webhook.site/9c9dd13f-b6f0-41f4-a647-cb10bd929677
```

## 🚀 How to Test

### 1. Using the Test Page
Visit: `http://localhost:8080/visualization-test`

The test page now includes:
- **External Webhook Testing** section with green background
- **"Test New Format"** button - sends the new webhook format
- **"Test Legacy Format"** button - sends the legacy JSON format
- **Link to webhook.site dashboard** to view received data
- **Real-time results** showing success/failure status

### 2. Using Console Commands
Open browser console and run:

```javascript
// Test new format
webhookTest.testNewFormat();

// Test legacy format  
webhookTest.testLegacyFormat();

// Test both formats
webhookTest.testBothFormats();

// Test custom data
webhookTest.testCustomData(yourData);
```

### 3. Using cURL
```bash
# Test new format
curl -X POST https://webhook.site/9c9dd13f-b6f0-41f4-a647-cb10bd929677 \
  -H "Content-Type: text/plain" \
  -H "X-Test-Format: new" \
  -d "task:invoice_processing
current:3_hours
future:20_minutes
type:time_saving
frequency:daily"

# Test legacy format
curl -X POST https://webhook.site/9c9dd13f-b6f0-41f4-a647-cb10bd929677 \
  -H "Content-Type: application/json" \
  -H "X-Test-Format: legacy" \
  -d '{"userInfo":{"email":"test@example.com"},"recommendation":{"type":"time_saving","title":"Test"}}'
```

## 📊 What You'll See

### In webhook.site Dashboard:
- **Request Method**: POST
- **Content-Type**: text/plain (new format) or application/json (legacy)
- **Headers**: Including test format identification
- **Body**: The exact data being sent
- **Timestamp**: When each request was received

### In Test Page:
- **Success/Failure Status**: Green/Red indicators
- **Direct Link**: Click to view webhook.site dashboard
- **Response Details**: Confirmation of data sent

## 🔧 Testing Both Formats

### New Format (text/plain):
```
task:invoice_processing
current:3_hours
future:20_minutes
type:time_saving
frequency:daily
```

### Legacy Format (application/json):
```json
{
  "userInfo": {
    "email": "test@example.com",
    "name": "John Doe",
    "company": "Tech Corp"
  },
  "recommendation": {
    "type": "time_saving",
    "title": "Automated Document Processing",
    "description": "Implement AI-powered document processing",
    "currentState": { "metrics": { "timeSpent": 6 } },
    "futureState": { "metrics": { "timeSpent": 1 } },
    "improvement": {
      "percentage": 83,
      "absoluteValue": 5,
      "unit": "hours",
      "description": "Save 5 hours per day"
    },
    "implementationTimeline": "2-4 weeks",
    "confidence": 0.85
  }
}
```

## 🎨 Integration Features

### Test Page Features:
- **Visual Status Indicators**: Success/failure badges
- **Direct Dashboard Link**: One-click access to webhook.site
- **Real-time Results**: Immediate feedback on webhook calls
- **Multiple Test Formats**: Both new and legacy format testing
- **Error Handling**: Clear error messages if tests fail

### Console Functions:
- **Global Access**: Available as `webhookTest.*` functions
- **Detailed Logging**: Console output with emojis and status
- **Custom Data Testing**: Test with your own data structures
- **Batch Testing**: Test multiple formats at once

## 🔍 Debugging Features

### Request Headers Added:
- `X-Test-Format`: Identifies format type (new/legacy/custom)
- `X-Test-Timestamp`: Request timestamp
- `User-Agent`: Identifies source application
- `Content-Type`: Proper content type for each format

### Response Inspection:
- View raw request data in webhook.site
- Check headers and payload structure
- Verify content types and formatting
- Monitor request timing and success rates

## 🎯 Quick Start

1. **Start the app**: `npm run dev`
2. **Visit test page**: `http://localhost:8080/visualization-test`
3. **Click "Test New Format"** or **"Test Legacy Format"**
4. **View results**: Click the webhook.site link to see received data
5. **Console testing**: Open browser console and run `webhookTest.testBothFormats()`

## 📝 Files Created

- `src/utils/webhook-test.ts` - Test utility functions
- `src/utils/console-webhook-test.ts` - Console testing functions
- Updated `src/pages/VisualizationTest.tsx` - Added webhook.site testing UI

## 🔗 URLs

- **Test Page**: `http://localhost:8080/visualization-test`
- **Demo Page**: `http://localhost:8080/visualization-demo`
- **Webhook.site Dashboard**: `https://webhook.site/9c9dd13f-b6f0-41f4-a647-cb10bd929677`

## ✅ Ready for Testing!

The webhook.site integration is now live and ready for testing. You can:
- Test both webhook formats visually
- Inspect all webhook data in real-time
- Debug any integration issues
- Verify data formatting and headers
- Monitor webhook performance

All webhook calls will be logged to the webhook.site dashboard for easy inspection and debugging!