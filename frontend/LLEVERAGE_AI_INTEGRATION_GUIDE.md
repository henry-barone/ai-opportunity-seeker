# 🚀 Lleverage.ai Integration Guide

## ✅ **Webhook Successfully Configured**

Your webhook has been updated to handle the exact format from your Lleverage.ai workflow.

## 🔗 **Webhook URL for Your Lleverage.ai Workflow**

```
https://1f927e19a631.ngrok-free.app/webhook/visualization-data
```

## 📋 **HTTP Request Node Configuration**

### **Method**: POST
### **Content-Type**: application/json
### **URL**: https://1f927e19a631.ngrok-free.app/webhook/visualization-data

### **Body/Payload**:
```json
{
  "userId": "{{Chat.headers.x-request-id}}",
  "sessionId": "{{Chat._node.nodeExecutionId}}",
  "timestamp": "{{Chat.currentTime}}",
  "processName": "{{Manufacturing_Discovery_Agent.output.processName}}",
  "currentTime": "{{Manufacturing_Discovery_Agent.output.currentTime}}",
  "futureTime": "{{Manufacturing_Discovery_Agent.output.futureTime}}",
  "savingType": "{{Manufacturing_Discovery_Agent.output.frequency}}"
}
```

## 🧪 **Test Results**

✅ **All formats tested and working**:
- Full format with all fields
- Manufacturing-specific data
- Minimal required data
- Different time formats
- Large time savings scenarios

## 📊 **Field Mapping**

| Lleverage.ai Field | Webhook Processing | Description |
|-------------------|-------------------|-------------|
| `userId` | User identification | Optional - used for tracking |
| `sessionId` | Session tracking | Optional - used for correlation |
| `timestamp` | Request timestamp | Optional - defaults to current time |
| `processName` | **Required** | The name of the manufacturing process |
| `currentTime` | **Required** | Current time spent on the process |
| `futureTime` | **Required** | Projected time after optimization |
| `savingType` | Frequency/type | Optional - defaults to 'daily' |

## 🔍 **Data Processing**

The webhook automatically:
- **Parses time values** (supports "2 hours", "30 minutes", "120 minutes", etc.)
- **Calculates time savings** percentage
- **Determines recommendation type** based on savings:
  - >50% savings = `time_saving`
  - >20% savings = `capacity_increase`
  - Otherwise = `generic`
- **Generates visualization data** for the frontend
- **Creates unique IDs** for each visualization

## 🎯 **Expected Response**

**Success Response (200 OK):**
```json
{
  "success": true,
  "id": "webhook_1752843565694_5a188891",
  "message": "Visualization data received successfully",
  "processingTime": 1,
  "viewUrl": "/visualization/webhook_1752843565694_5a188891",
  "metadata": {
    "id": "webhook_1752843565694_5a188891",
    "type": "time_saving",
    "title": "Automate Assembly Line Process"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Webhook processing failed",
  "message": "processName is required for Lleverage.ai format",
  "requestId": "12345"
}
```

## 📝 **Required vs Optional Fields**

### **Required Fields:**
- `processName` - The name of the manufacturing process
- At least one of `currentTime` OR `futureTime`

### **Optional Fields:**
- `userId` - User identification
- `sessionId` - Session tracking
- `timestamp` - Request timestamp
- `savingType` - Frequency (daily, weekly, hourly, etc.)

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **400 Error "processName is required"**
   - Ensure `processName` field is included
   - Check that the field name matches exactly

2. **400 Error "At least one of currentTime or futureTime is required"**
   - Include either `currentTime` or `futureTime` (or both)
   - Ensure the values are not empty

3. **400 Error "Invalid content type"**
   - Set `Content-Type: application/json` in headers
   - Ensure you're using POST method

4. **Connection refused / fetch failed**
   - Verify the ngrok tunnel is still running
   - Check that the URL is correct

## 🧪 **Testing Your Integration**

You can test your webhook with this curl command:

```bash
curl -X POST https://1f927e19a631.ngrok-free.app/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user",
    "sessionId": "test-session",
    "timestamp": "2025-07-18T13:00:00Z",
    "processName": "Circuit Board Assembly",
    "currentTime": "3 hours",
    "futureTime": "45 minutes",
    "savingType": "daily"
  }'
```

## 📊 **Monitoring**

### **Check webhook status:**
```bash
curl https://1f927e19a631.ngrok-free.app/webhook/status
```

### **View webhook statistics:**
```bash
curl https://1f927e19a631.ngrok-free.app/webhook/stats
```

## 🚨 **Important Notes**

1. **Keep ngrok running** - The tunnel must remain active for the webhook to work
2. **URL may change** - Free ngrok URLs change when restarted
3. **Test first** - Always test with curl before implementing in Lleverage.ai
4. **Monitor logs** - Check the server logs for any processing errors

## 🎉 **Ready to Deploy**

Your webhook is now configured and ready to receive data from your Lleverage.ai workflow. The integration will:

- ✅ Accept your exact data format
- ✅ Process time values correctly
- ✅ Generate appropriate visualizations
- ✅ Return success/error responses
- ✅ Provide detailed logging

## 📞 **Support**

If you encounter any issues:
1. Check the webhook status endpoint
2. Review the server logs
3. Test with curl first
4. Verify your payload format matches exactly

Your webhook integration is complete and ready for production use! 🚀