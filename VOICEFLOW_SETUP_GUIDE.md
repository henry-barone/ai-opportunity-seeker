# 🎙️ Voiceflow Setup Guide - SPAIK Webhook Integration

## ✅ Issues Fixed in API

### **Enhanced Response Handling:**
- ✅ **Proper Content-Type headers** (`application/json; charset=utf-8`)
- ✅ **Enhanced CORS headers** for webhook compatibility
- ✅ **Cache control headers** to prevent response caching issues
- ✅ **Detailed logging** to debug what Voiceflow receives
- ✅ **Voiceflow-optimized response format** with simple field names

### **New Test Endpoint:** `/test-voiceflow`
- Simple endpoint to test Voiceflow response capture
- Logs exactly what Voiceflow sends and receives
- Returns basic JSON for troubleshooting

## 🧪 Step 1: Test Voiceflow Response Capture

### **1A. First, Test the Simple Endpoint**

**Test URL:** `https://ai-opportunity-seeker.vercel.app/test-voiceflow`

**Voiceflow HTTP Request Configuration:**
```
Method: POST
URL: https://ai-opportunity-seeker.vercel.app/test-voiceflow
Headers: Content-Type: application/json
Body: {"test": "hello from voiceflow"}
```

**Response Variable Setup:**
- Variable Name: `test_response`
- Path to extract: `message` (should capture "Hello from SPAIK API!")

### **1B. Voiceflow Configuration Steps:**

1. **Add HTTP Request Block**
   - Drag HTTP Request block to your canvas
   - Set Method to `POST`

2. **Configure URL**
   ```
   https://ai-opportunity-seeker.vercel.app/test-voiceflow
   ```

3. **Set Headers**
   - Click "Add Header"
   - Key: `Content-Type`
   - Value: `application/json`

4. **Set Request Body**
   ```json
   {
     "test": "hello from voiceflow",
     "timestamp": "{{moment().format()}}"
   }
   ```

5. **Configure Response Variable**
   - Variable Name: `test_response`
   - Leave path empty (captures entire response)

6. **Add Speak Block After HTTP Request**
   ```
   Test successful! Response: {{test_response.message}}
   Test ID: {{test_response.testId}}
   ```

### **Expected Result:**
Voiceflow should speak: *"Test successful! Response: Hello from SPAIK API! Test ID: test_1234567890"*

## 🚀 Step 2: Configure Main SPAIK Webhook

Once the test works, configure the main webhook:

### **2A. HTTP Request Configuration**

**URL:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`

**Headers:**
```
Content-Type: application/json
User-Agent: Voiceflow-Bot/1.0
```

**Request Body:** (Replace with your actual data)
```json
{
  "userInfo": {
    "name": "{{user.name}}",
    "email": "{{user.email}}"
  },
  "recommendation": {
    "type": "time_saving",
    "title": "{{recommendation_title}}",
    "description": "{{recommendation_description}}",
    "currentState": {
      "metrics": {
        "timeSpent": {{current_hours}}
      }
    },
    "futureState": {
      "metrics": {
        "timeSpent": {{future_hours}}
      }
    }
  }
}
```

### **2B. Response Variable Configuration**

**Primary Response Variable:**
- Variable Name: `webhook_response`
- Path: Leave empty (captures full response)

**Individual Field Variables** (Optional):
- `visualization_id` → Path: `visualizationId`
- `solution_title` → Path: `solutionTitle`
- `hours_saved` → Path: `weeklyHoursSaved`
- `cost_saved` → Path: `yearlyCostSaved`
- `improvement_percent` → Path: `improvementPercentage`

### **2C. Response Success Check**

Add a **Condition Block** after the HTTP Request:
```
IF {{webhook_response.success}} equals true
  THEN: Continue to success flow
  ELSE: Handle error
```

### **2D. Display Results to User**

**Success Speak Block:**
```
Great! I've analyzed your process and found a {{webhook_response.solutionType}} opportunity: 

{{webhook_response.solutionTitle}}

This could save you {{webhook_response.weeklyHoursSaved}} hours per week, 
and €{{webhook_response.yearlyCostSaved}} per year - 
that's a {{webhook_response.improvementPercentage}}% improvement!

You can view the full analysis here: {{webhook_response.fullUrl}}
```

## 🔍 Step 3: Debugging Common Issues

### **Issue 1: Empty Response Variable**

**Symptoms:** `{{webhook_response}}` is empty or undefined

**Debug Steps:**
1. Check Vercel logs for your request
2. Try the `/test-voiceflow` endpoint first
3. Verify Content-Type header is set
4. Check Voiceflow's request logs

**Quick Fix:**
```json
// Add this to your HTTP request body for debugging
{
  "debug": true,
  "voiceflow_test": "{{moment().format()}}",
  // ... your other data
}
```

### **Issue 2: Cannot Access Response Fields**

**Symptoms:** `{{webhook_response.id}}` returns undefined

**Solutions:**
1. **Use simple field names:**
   - `{{webhook_response.visualizationId}}` instead of `{{webhook_response.id}}`
   - `{{webhook_response.solutionTitle}}` 
   - `{{webhook_response.weeklyHoursSaved}}`

2. **Debug with Speak block:**
   ```
   Raw response: {{webhook_response}}
   Success: {{webhook_response.success}}
   ID: {{webhook_response.visualizationId}}
   ```

### **Issue 3: Request Timeout**

**Symptoms:** No response after 30+ seconds

**Solutions:**
1. Check Vercel function logs
2. Verify your request payload format
3. Test with simpler data first
4. Check if webhook secret is required

## 🧪 Step 4: Test Different Scenarios

### **Test Case 1: Minimal Data**
```json
{
  "userInfo": {"name": "Test User", "email": "test@example.com"},
  "recommendation": {
    "type": "time_saving",
    "title": "Test Process",
    "currentState": {"metrics": {"timeSpent": 10}},
    "futureState": {"metrics": {"timeSpent": 3}}
  }
}
```

### **Test Case 2: Complete Data**
```json
{
  "userInfo": {
    "name": "Sarah Johnson",
    "email": "sarah@company.com",
    "company": "Tech Corp"
  },
  "recommendation": {
    "type": "cost_reduction",
    "title": "Invoice Processing Automation",
    "description": "Automate invoice data extraction and entry",
    "currentState": {
      "metrics": {"timeSpent": 20, "cost": 3000}
    },
    "futureState": {
      "metrics": {"timeSpent": 3, "cost": 450}
    },
    "implementationTimeline": "4-6 weeks",
    "confidence": 0.9
  }
}
```

## 🎯 Expected Voiceflow Response Format

When working correctly, `{{webhook_response}}` should contain:

```json
{
  "success": true,
  "id": "vis_1234567890_abcdef",
  "message": "SPAIK opportunity data processed successfully",
  "visualizationId": "vis_1234567890_abcdef",
  "solutionType": "time_saving",
  "solutionTitle": "Invoice Processing Automation",
  "weeklyHoursSaved": 17,
  "yearlyCostSaved": 132600,
  "improvementPercentage": 85,
  "fullUrl": "https://ai-opportunity-seeker.vercel.app/visualization/vis_1234567890_abcdef",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## 🛠️ Advanced Troubleshooting

### **Check Vercel Logs:**
1. Go to Vercel Dashboard
2. Select your project → Functions tab
3. View logs in real-time while testing
4. Look for `[WEBHOOK]` and `[VOICEFLOW-TEST]` entries

### **Test via cURL:**
```bash
# Test the simple endpoint
curl -X POST https://ai-opportunity-seeker.vercel.app/test-voiceflow \
  -H "Content-Type: application/json" \
  -H "User-Agent: Voiceflow-Test" \
  -d '{"test": "hello from curl"}'

# Test the main webhook
curl -X POST https://ai-opportunity-seeker.vercel.app/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -H "User-Agent: Voiceflow-Test" \
  -d '{
    "userInfo": {"name": "Test User", "email": "test@example.com"},
    "recommendation": {
      "type": "time_saving", 
      "title": "Test Process",
      "currentState": {"metrics": {"timeSpent": 10}},
      "futureState": {"metrics": {"timeSpent": 3}}
    }
  }'
```

### **Common Voiceflow Response Patterns:**

**Access Full Response:**
```
{{webhook_response}}
```

**Access Specific Fields:**
```
ID: {{webhook_response.visualizationId}}
Title: {{webhook_response.solutionTitle}}
Savings: {{webhook_response.weeklyHoursSaved}} hours/week
```

**Check Success:**
```
{{#if webhook_response.success}}
  Success! Visualization created.
{{else}}
  Error: {{webhook_response.error}}
{{/if}}
```

## 🎉 Success Checklist

- [ ] `/test-voiceflow` endpoint returns data in Voiceflow
- [ ] Response variable captures the full JSON response
- [ ] Individual fields can be accessed (e.g., `{{webhook_response.message}}`)
- [ ] Main webhook creates visualization successfully
- [ ] Voiceflow displays the analysis results to user
- [ ] Full URL works when clicked/visited

Your Voiceflow integration should now capture and display webhook responses perfectly! 🚀

## 📞 Support URLs

- **Test Endpoint:** `https://ai-opportunity-seeker.vercel.app/test-voiceflow`
- **Main Webhook:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`
- **API Status:** `https://ai-opportunity-seeker.vercel.app/health`