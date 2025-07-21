# 🔧 Lleverage.ai HTTP Request Node - Fix Guide

## 🚨 **Issue Identified**
Your webhook URL is working perfectly, but your Lleverage.ai HTTP Request node configuration has an issue.

## ✅ **Your Webhook URL is Working**
- **URL**: `https://1f927e19a631.ngrok-free.app/webhook/visualization-data`
- **Status**: ✅ Active and responding correctly
- **Test Result**: ✅ Your exact data format works perfectly

## 🔍 **Root Cause Analysis**
The 400 error you're getting is likely due to one of these configuration issues in your Lleverage.ai HTTP Request node:

### **Most Common Issues:**

1. **❌ Missing Content-Type Header**
2. **❌ Wrong HTTP Method (GET instead of POST)**
3. **❌ Invalid JSON in body**
4. **❌ Missing required fields**

## 🔧 **Step-by-Step Fix**

### **Step 1: HTTP Method**
- **Set Method**: `POST`
- **NOT**: GET, PUT, or any other method

### **Step 2: URL**
- **Use exactly**: `https://1f927e19a631.ngrok-free.app/webhook/visualization-data`
- **Double-check**: No typos, no extra spaces, no missing characters

### **Step 3: Headers (CRITICAL)**
Add this header:
```
Content-Type: application/json
```

**In Lleverage.ai:**
- Find "Headers" section
- Add new header
- **Key**: `Content-Type`
- **Value**: `application/json`

### **Step 4: Body/Payload**
Use this **exact format**:
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

### **Step 5: Body Type**
- **Set Body Type**: `JSON` or `Raw`
- **NOT**: Form data or URL encoded

## 🎯 **Lleverage.ai Configuration Checklist**

### **HTTP Request Node Settings:**
- [ ] **Method**: POST
- [ ] **URL**: `https://1f927e19a631.ngrok-free.app/webhook/visualization-data`
- [ ] **Headers**: `Content-Type: application/json`
- [ ] **Body Type**: JSON/Raw
- [ ] **Body Content**: Valid JSON with required fields

### **Required Fields Check:**
- [ ] **processName**: Must be present
- [ ] **currentTime OR futureTime**: At least one must be present
- [ ] **JSON Format**: Must be valid JSON (no trailing commas, proper quotes)

## 🔍 **Common Lleverage.ai Issues**

### **Issue 1: Missing Content-Type Header**
**Error**: `HTTP request returned non-OK status code: 400`
**Fix**: Add `Content-Type: application/json` to headers

### **Issue 2: Wrong Body Type**
**Error**: `HTTP request returned non-OK status code: 400`
**Fix**: Set body type to "JSON" or "Raw", not "Form"

### **Issue 3: Invalid JSON**
**Error**: `HTTP request returned non-OK status code: 400`
**Fix**: Check JSON formatting (no trailing commas, proper quotes)

### **Issue 4: GET Method**
**Error**: `HTTP request returned non-OK status code: 400`
**Fix**: Change method from GET to POST

## 🧪 **Test Your Configuration**

After making changes, test with this minimal payload:
```json
{
  "processName": "Test Process",
  "currentTime": 60,
  "futureTime": 30
}
```

**Expected Response:**
```json
{
  "success": true,
  "id": "webhook_...",
  "message": "Visualization data received successfully"
}
```

## 🎯 **Quick Verification Steps**

1. **Check Method**: Must be POST
2. **Check Headers**: Must include `Content-Type: application/json`
3. **Check Body**: Must be valid JSON
4. **Check URL**: Must be exactly `https://1f927e19a631.ngrok-free.app/webhook/visualization-data`

## 📋 **Complete Configuration Summary**

```
Method: POST
URL: https://1f927e19a631.ngrok-free.app/webhook/visualization-data
Headers: 
  Content-Type: application/json
Body: {
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

## 🚀 **After Fixing**

Once you've made these changes, your webhook should work perfectly. You'll get a success response with a visualization ID.

## 💡 **Still Having Issues?**

If you're still getting 400 errors after following this guide:

1. **Double-check each setting** against this guide
2. **Try with minimal payload** first
3. **Verify JSON formatting** using a JSON validator
4. **Check that you're using POST method**
5. **Ensure Content-Type header is set**

Your webhook is working perfectly - the issue is 100% in the Lleverage.ai configuration! 🎯