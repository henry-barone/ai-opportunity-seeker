# 🔄 New Simplified Format Configuration

## ✅ Webhook Updated to Support New Structure

I've configured the webhook to handle your simplified data structure. Here's how it works:

### **📊 Your New Data Structure:**
```json
{
  "processName": "Order Status Inquiries",
  "currentTime": 360,
  "futureTime": 60,
  "savingType": "time_saving", 
  "frequency": "weekly",
  "efficiencyGain": "83%",
  "analysisComplete": true,
  "conversationStage": "complete",
  "responseText": "Perfect! Order status inquiries are..."
}
```

### **🔧 How the Processing Works:**

1. **Detection:** Webhook detects if data contains `processName`, `currentTime`, `futureTime`
2. **Conversion:** Converts minutes to hours (360 min = 6 hours, 60 min = 1 hour)
3. **Calculation:** Computes savings (5 hours saved = 83% improvement)
4. **Enhancement:** Adds ROI calculations, cost savings, implementation details
5. **Response:** Returns Voiceflow-compatible response

### **📈 Calculations Applied:**
- **Time Conversion:** `currentTime` (360 min) → 6 hours/week
- **Future State:** `futureTime` (60 min) → 1 hour/week  
- **Hours Saved:** 6 - 1 = 5 hours/week
- **Cost Savings:** 5 hours × €150/hour = €750/week = €39,000/year
- **ROI:** (€39,000 - €5,000) ÷ €5,000 = 680% first-year ROI

## 🎯 Voiceflow Configuration

### **HTTP Request Settings:**
```
Method: POST
URL: https://ai-opportunity-seeker.vercel.app/webhook/visualization-data
Headers: Content-Type: application/json
```

### **Body Structure:**
```json
{
  "processName": "{{process_name}}",
  "currentTime": {{current_time_minutes}},
  "futureTime": {{future_time_minutes}}, 
  "savingType": "{{saving_type}}",
  "frequency": "weekly",
  "efficiencyGain": "{{efficiency_percentage}}%",
  "analysisComplete": true,
  "conversationStage": "complete",
  "responseText": "{{full_analysis_response}}"
}
```

### **Response Variables:**
The webhook returns the same Voiceflow-optimized response:

```json
{
  "success": true,
  "visualizationId": "vis_1234567890_abc123",
  "solutionTitle": "Order Status Inquiries", 
  "solutionType": "time_saving",
  "weeklyHoursSaved": 5,
  "yearlyHoursSaved": 260,
  "weeklyCostSaved": 750,
  "yearlyCostSaved": 39000,
  "improvementPercentage": 83,
  "fullUrl": "https://ai-opportunity-seeker.vercel.app/visualization/vis_1234567890_abc123"
}
```

## 🧪 Testing Your New Format

### **Test with cURL:**
```bash
curl -X POST https://ai-opportunity-seeker.vercel.app/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "processName": "Order Status Inquiries",
    "currentTime": 360,
    "futureTime": 60,
    "savingType": "time_saving",
    "frequency": "weekly", 
    "efficiencyGain": "83%",
    "analysisComplete": true,
    "responseText": "Your analysis text here..."
  }'
```

### **Expected Response:**
```json
{
  "success": true,
  "visualizationId": "vis_1234567890_abc123",
  "solutionTitle": "Order Status Inquiries",
  "weeklyHoursSaved": 5,
  "improvementPercentage": 83,
  "fullUrl": "https://ai-opportunity-seeker.vercel.app/visualization/vis_1234567890_abc123"
}
```

## 📝 Field Mapping

| Your Field | Purpose | Example |
|------------|---------|---------|
| `processName` | Title of the process | "Order Status Inquiries" |
| `currentTime` | Current time in minutes/week | 360 (6 hours) |
| `futureTime` | Future time in minutes/week | 60 (1 hour) |
| `savingType` | Type of improvement | "time_saving" |
| `frequency` | How often (weekly/monthly) | "weekly" |
| `efficiencyGain` | Improvement percentage | "83%" |
| `analysisComplete` | Analysis status | true |
| `responseText` | Full chatbot response | "Your detailed analysis..." |

## 🎭 Optional Fields

You can also include these for richer data:

```json
{
  "processName": "Order Status Inquiries",
  "currentTime": 360,
  "futureTime": 60,
  // ... required fields above
  
  // Optional enhancements:
  "userName": "John Smith",
  "userEmail": "john@company.com", 
  "company": "Bike Shop Pro",
  "industry": "E-commerce",
  "implementationComplexity": "medium",
  "confidenceLevel": 0.9
}
```

## ⚠️ Data Validation Rules

The webhook validates:
- ✅ `processName` must be a non-empty string
- ✅ `currentTime` must be positive number (minutes)
- ✅ `futureTime` must be non-negative number (minutes) 
- ✅ `futureTime` must be less than `currentTime`
- ✅ `savingType` should be: `time_saving`, `cost_reduction`, or `quality_improvement`

## 🔄 Backward Compatibility  

The webhook still supports the original format, so existing integrations continue working:

```json
{
  "userInfo": {"name": "User", "email": "user@example.com"},
  "recommendation": {
    "type": "time_saving", 
    "title": "Process Name",
    "currentState": {"metrics": {"timeSpent": 6}},
    "futureState": {"metrics": {"timeSpent": 1}}
  }
}
```

## 🚀 Next Steps

1. **Update your Voiceflow HTTP Request** with the new simplified format
2. **Test with the cURL command** above to verify it works
3. **Deploy to your chatbot** and test end-to-end
4. **Monitor the Vercel logs** to see the processing in action

Your chatbot can now send this much simpler data structure and get the same rich visualization results! 🎉

## 📞 Support

- **Main Webhook:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`
- **Test Format:** Use the cURL command above
- **View Results:** Visit the `fullUrl` returned in the response