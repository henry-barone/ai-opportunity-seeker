# ✅ **Webhook Configured for New Format**

## 🎯 **Your Webhook URL:**
```
https://1f927e19a631.ngrok-free.app/webhook/visualization-data
```

## 📋 **Exact Configuration for Your Lleverage.ai HTTP Request Node:**

### **Method**: POST
### **Content-Type**: application/json
### **URL**: https://1f927e19a631.ngrok-free.app/webhook/visualization-data

### **Body/Payload**:
```json
{
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
}
```

## ✅ **What's Been Updated:**

1. **✅ Numeric Time Values**: Now handles `120` (minutes) instead of `"120 minutes"`
2. **✅ efficiencyGain Field**: Uses this value for recommendation type determination
3. **✅ New Fields Support**: All new fields are captured and stored
4. **✅ Enhanced Processing**: Better recommendation type detection
5. **✅ Metadata Capture**: All fields stored in visualization metadata

## 🔍 **Field Processing:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Optional | User identification |
| `sessionId` | string | Optional | Session tracking |
| `processName` | string | **Required** | Name of the process |
| `currentTime` | number | **Required*** | Current time in minutes |
| `futureTime` | number | **Required*** | Future time in minutes |
| `savingType` | string | Optional | Type of saving (time_saving, cost_reduction, etc.) |
| `frequency` | string | Optional | How often (daily, weekly, etc.) |
| `efficiencyGain` | number | Optional | Efficiency percentage (0-100) |
| `analysisComplete` | boolean | Optional | Whether analysis is complete |
| `conversationStage` | string | Optional | Stage of conversation |
| `responseText` | string | Optional | Response text |

*At least one of `currentTime` or `futureTime` required

## 🧠 **Recommendation Type Logic:**

1. **If `savingType` is valid** → Uses that directly
2. **If `efficiencyGain` is provided**:
   - ≥70% → `time_saving`
   - ≥40% → `capacity_increase`
   - ≥20% → `cost_reduction`
   - <20% → `generic`
3. **Falls back to time calculation** if neither available

## 🧪 **Test Results:**

✅ **All tests passed:**
- Full format with all fields
- Different efficiencyGain values
- High efficiency scenarios
- Different savingTypes
- Minimal required fields
- Error handling

## 📊 **Example Response:**
```json
{
  "success": true,
  "id": "webhook_1752844456432_2fb98678",
  "message": "Visualization data received successfully",
  "processingTime": 0,
  "viewUrl": "/visualization/webhook_1752844456432_2fb98678",
  "metadata": {
    "id": "webhook_1752844456432_2fb98678",
    "type": "time_saving",
    "title": "Automate Quote Generation"
  }
}
```

## 🔧 **Quick Test:**
```bash
curl -X POST https://1f927e19a631.ngrok-free.app/webhook/visualization-data \
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
  }'
```

## 🎯 **Key Features:**

- **✅ Numeric Times**: Handles `120` as 120 minutes
- **✅ Efficiency Gain**: Uses `efficiencyGain` for smart type detection
- **✅ Complete Metadata**: All fields captured and stored
- **✅ Backwards Compatible**: Still works with old formats
- **✅ Robust Validation**: Proper error handling
- **✅ Performance**: Fast processing (<1ms)

## 🚀 **Ready to Use:**

Your webhook is now fully configured for the new format. Just use the URL and payload format above in your Lleverage.ai HTTP Request node.

The webhook will:
1. **Accept** your exact data format
2. **Process** numeric time values correctly
3. **Use** efficiencyGain for recommendation types
4. **Capture** all metadata fields
5. **Generate** appropriate visualizations
6. **Return** success confirmation

Your integration is complete and ready! 🎉