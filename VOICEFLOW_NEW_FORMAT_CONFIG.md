# 🎙️ Voiceflow Configuration - New Simplified Format

## ✅ Working Solution for Your Data Structure

Since your webhook uses this simplified format:
```json
{
  "processName": "Order Status Inquiries",
  "currentTime": 360,
  "futureTime": 60,
  "savingType": "time_saving",
  "efficiencyGain": "83%"
}
```

I've created a **format conversion solution** that works with the current deployed webhook.

## 🔧 Voiceflow HTTP Request Configuration

### **Method:** POST
### **URL:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`

### **Headers:**
```
Content-Type: application/json
User-Agent: SPAIK-Bot/1.0
```

### **Request Body Template:**

Instead of sending your raw data, convert it to the expected format:

```json
{
  "userInfo": {
    "name": "{{user_name}}",
    "email": "{{user_email}}"
  },
  "recommendation": {
    "type": "{{saving_type}}",
    "title": "{{process_name}}",
    "description": "{{response_text}}",
    "currentState": {
      "metrics": {
        "timeSpent": {{current_hours}}
      }
    },
    "futureState": {
      "metrics": {
        "timeSpent": {{future_hours}}
      }
    },
    "improvement": {
      "percentage": {{efficiency_percentage}},
      "absoluteValue": {{hours_saved}},
      "unit": "hours"
    }
  }
}
```

## 🧮 Variable Calculations in Voiceflow

Before sending the HTTP request, calculate these variables:

### **Time Conversions:**
```javascript
// Convert minutes to hours
{{set user.current_hours to (current_time / 60)}}
{{set user.future_hours to (future_time / 60)}}  
{{set user.hours_saved to (current_hours - future_hours)}}
```

### **Percentage Extraction:**
```javascript
// Extract number from "83%" string
{{set user.efficiency_number to (efficiencyGain | replace: "%" | number)}}
```

## 🎯 Complete Voiceflow Setup Example

### **Step 1: Set Variables (Code Block)**
```javascript
// Your existing variables from the conversation
var processName = "Order Status Inquiries";
var currentTime = 360; // minutes per week
var futureTime = 60;   // minutes per week  
var efficiencyGain = "83%";
var savingType = "time_saving";

// Convert for the webhook
var currentHours = currentTime / 60;  // 6 hours
var futureHours = futureTime / 60;    // 1 hour
var hoursSaved = currentHours - futureHours; // 5 hours
var efficiencyNumber = parseInt(efficiencyGain.replace('%', '')); // 83

// Store in Voiceflow variables
user.current_hours = currentHours;
user.future_hours = futureHours;
user.hours_saved = hoursSaved; 
user.efficiency_number = efficiencyNumber;
user.process_name = processName;
user.saving_type = savingType;
```

### **Step 2: HTTP Request Block**

**Request Body:**
```json
{
  "userInfo": {
    "name": "{{user.name}}",
    "email": "{{user.email}}"
  },
  "recommendation": {
    "type": "{{user.saving_type}}",
    "title": "{{user.process_name}}",
    "description": "Automated process to improve efficiency and reduce manual work",
    "currentState": {
      "metrics": {
        "timeSpent": {{user.current_hours}}
      }
    },
    "futureState": {
      "metrics": {
        "timeSpent": {{user.future_hours}}
      }
    },
    "improvement": {
      "percentage": {{user.efficiency_number}},
      "absoluteValue": {{user.hours_saved}},
      "unit": "hours"
    }
  }
}
```

**Response Variable:** `webhook_response`

### **Step 3: Success Response (Speak Block)**
```
Excellent! I've analyzed your {{user.process_name}} process.

This automation could save you {{webhook_response.weeklyHoursSaved}} hours per week and €{{webhook_response.yearlyCostSaved}} per year - that's a {{webhook_response.improvementPercentage}}% improvement!

You can view your complete analysis here: {{webhook_response.fullUrl}}

Would you like to book a free consultation to get started?
```

## 🧪 Test Your Configuration

### **Test Data Values:**
- `processName`: "Order Status Inquiries"
- `currentTime`: 360 (minutes)
- `futureTime`: 60 (minutes)  
- `savingType`: "time_saving"
- `efficiencyGain`: "83%"

### **Expected Calculations:**
- `currentHours`: 6 (360 ÷ 60)
- `futureHours`: 1 (60 ÷ 60)
- `hoursSaved`: 5 (6 - 1)
- `efficiencyNumber`: 83

### **Expected Webhook Response:**
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

## 🔄 Alternative: Simple Direct Mapping

If you prefer a simpler approach without calculations, use fixed values:

```json
{
  "userInfo": {
    "name": "SPAIK User",
    "email": "user@spaik.io"
  },
  "recommendation": {
    "type": "time_saving",
    "title": "{{process_name}}",
    "description": "{{response_text}}",
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
}
```

## ✅ Verification Steps

1. **Test HTTP Request:** Should return `{"success": true, ...}`
2. **Check Response Variable:** `{{webhook_response.success}}` should be `true`
3. **Verify Fields:** `{{webhook_response.solutionTitle}}` should show your process name
4. **Test URL:** Visit `{{webhook_response.fullUrl}}` to see the visualization

## 🎉 Ready to Deploy

Your Voiceflow chatbot is now configured to:
- ✅ Convert your simplified data format to the required structure
- ✅ Send successful webhook requests  
- ✅ Receive rich analysis data back
- ✅ Display results to users with full visualization links

The webhook will process your data and return comprehensive metrics including ROI calculations, cost savings, and implementation timelines! 🚀