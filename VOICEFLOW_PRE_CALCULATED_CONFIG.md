# 🎯 Voiceflow Configuration - Pre-Calculated Results Format

## ✅ New Pre-Calculated Data Structure Support

The webhook now supports receiving **complete analysis results** with all calculations already done. This is perfect for advanced Voiceflow integrations where you want to send finalized data.

### **📊 Pre-Calculated Input Format:**
```json
{
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
}
```

## 🔧 Voiceflow HTTP Request Configuration

### **Method:** POST
### **URL:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`

### **Headers:**
```
Content-Type: application/json
User-Agent: SPAIK-PreCalculated/1.0
```

### **Request Body Template:**
```json
{
  "success": true,
  "solutionType": "{{solution_type}}",
  "solutionTitle": "{{solution_title}}",
  "weeklyHoursSaved": {{weekly_hours_saved}},
  "yearlyCostSaved": {{yearly_cost_saved}},
  "improvementPercentage": {{improvement_percentage}},
  "metrics": {
    "weeklyHoursSaved": {{weekly_hours_saved}},
    "yearlyHoursSaved": {{yearly_hours_saved}},
    "weeklyCostSaved": {{weekly_cost_saved}},
    "yearlyCostSaved": {{yearly_cost_saved}},
    "improvementPercentage": {{improvement_percentage}},
    "breakEvenWeeks": {{break_even_weeks}},
    "yearOneROI": {{year_one_roi}}
  }
}
```

## 🎯 Field Descriptions

### **Required Fields:**
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `success` | boolean | Analysis success status | `true` |
| `solutionType` | string | Type of solution | `"time_saving"` |
| `solutionTitle` | string | Name of the process | `"Order Processing Automation"` |
| `weeklyHoursSaved` | number | Hours saved per week | `9.6` |
| `yearlyCostSaved` | number | Annual cost savings | `74880` |
| `improvementPercentage` | number | % improvement (0-100) | `80` |
| `metrics` | object | Complete metrics object | See below |

### **Metrics Object:**
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `weeklyHoursSaved` | number | Weekly hours saved | `9.6` |
| `yearlyHoursSaved` | number | Annual hours saved | `499.2` |
| `weeklyCostSaved` | number | Weekly cost savings | `1440` |
| `yearlyCostSaved` | number | Annual cost savings | `74880` |
| `improvementPercentage` | number | % improvement | `80` |
| `breakEvenWeeks` | number | Weeks to break even | `4` |
| `yearOneROI` | number | First year ROI % | `1398` |

### **Optional Fields:**
| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `id` | string | Custom visualization ID | Auto-generated |
| `userName` | string | User's name | `"SPAIK User"` |
| `userEmail` | string | User's email | `"user@spaik.io"` |
| `company` | string | Company name | `""` |
| `industry` | string | Industry sector | `""` |
| `description` | string | Solution description | Auto-generated |
| `implementationTimeline` | string | Timeline estimate | `"2-4 weeks"` |
| `confidence` | number | Confidence level (0-1) | `0.9` |

## 🧪 Complete Voiceflow Example

### **Step 1: Calculate Values (Code Block)**
```javascript
// Your analysis results from the conversation
var solutionType = "time_saving";
var solutionTitle = "Order Processing Automation";
var weeklyHoursSaved = 9.6;
var yearlyHoursSaved = weeklyHoursSaved * 52; // 499.2
var weeklyCostSaved = weeklyHoursSaved * 150; // €1440
var yearlyCostSaved = weeklyCostSaved * 52; // €74,880
var improvementPercentage = 80;
var implementationCost = 5000;
var breakEvenWeeks = Math.ceil(implementationCost / weeklyCostSaved); // 4 weeks
var yearOneROI = Math.round(((yearlyCostSaved - implementationCost) / implementationCost) * 100); // 1398%

// Store in Voiceflow variables
user.solution_type = solutionType;
user.solution_title = solutionTitle;
user.weekly_hours_saved = weeklyHoursSaved;
user.yearly_hours_saved = yearlyHoursSaved;
user.weekly_cost_saved = weeklyCostSaved;
user.yearly_cost_saved = yearlyCostSaved;
user.improvement_percentage = improvementPercentage;
user.break_even_weeks = breakEvenWeeks;
user.year_one_roi = yearOneROI;
```

### **Step 2: HTTP Request Block**

**Request Body:**
```json
{
  "success": true,
  "solutionType": "{{user.solution_type}}",
  "solutionTitle": "{{user.solution_title}}",
  "weeklyHoursSaved": {{user.weekly_hours_saved}},
  "yearlyCostSaved": {{user.yearly_cost_saved}},
  "improvementPercentage": {{user.improvement_percentage}},
  "metrics": {
    "weeklyHoursSaved": {{user.weekly_hours_saved}},
    "yearlyHoursSaved": {{user.yearly_hours_saved}},
    "weeklyCostSaved": {{user.weekly_cost_saved}},
    "yearlyCostSaved": {{user.yearly_cost_saved}},
    "improvementPercentage": {{user.improvement_percentage}},
    "breakEvenWeeks": {{user.break_even_weeks}},
    "yearOneROI": {{user.year_one_roi}}
  }
}
```

**Response Variable:** `webhook_response`

### **Step 3: Success Response (Speak Block)**
```
🎉 Excellent! Your {{user.solution_title}} analysis is complete!

**Key Results:**
• Weekly time savings: {{webhook_response.weeklyHoursSaved}} hours
• Annual cost savings: €{{webhook_response.yearlyCostSaved}}
• Efficiency improvement: {{webhook_response.improvementPercentage}}%
• Break-even time: {{webhook_response.metrics.breakEvenWeeks}} weeks
• First-year ROI: {{webhook_response.metrics.yearOneROI}}%

🔗 **View your complete analysis:** {{webhook_response.fullUrl}}

Ready to get started with this automation?
```

## 🧪 Test Your Configuration

### **Test Data:**
```json
{
  "success": true,
  "solutionType": "time_saving",
  "solutionTitle": "Customer Support Automation",
  "weeklyHoursSaved": 12.5,
  "yearlyCostSaved": 97500,
  "improvementPercentage": 75,
  "metrics": {
    "weeklyHoursSaved": 12.5,
    "yearlyHoursSaved": 650,
    "weeklyCostSaved": 1875,
    "yearlyCostSaved": 97500,
    "improvementPercentage": 75,
    "breakEvenWeeks": 3,
    "yearOneROI": 1850
  }
}
```

### **Expected Response:**
```json
{
  "success": true,
  "visualizationId": "vis_1234567890_abc123",
  "solutionTitle": "Customer Support Automation",
  "solutionType": "time_saving",
  "weeklyHoursSaved": 12.5,
  "yearlyCostSaved": 97500,
  "improvementPercentage": 75,
  "fullUrl": "https://ai-opportunity-seeker.vercel.app/visualization/vis_1234567890_abc123",
  "metrics": {
    "weeklyHoursSaved": 12.5,
    "yearlyHoursSaved": 650,
    "weeklyCostSaved": 1875,
    "yearlyCostSaved": 97500,
    "improvementPercentage": 75,
    "breakEvenWeeks": 3,
    "yearOneROI": 1850
  }
}
```

## 🔄 Format Detection Logic

The webhook automatically detects the pre-calculated format when:
1. `success` field exists (any boolean value)
2. `solutionType` field exists (non-empty string)
3. `solutionTitle` field exists (non-empty string)  
4. `metrics` field exists (object)

When all conditions are met, it uses the pre-calculated processor instead of doing its own calculations.

## ⚠️ Validation Rules

The webhook validates:
- ✅ `success` must be boolean
- ✅ `solutionType` must be non-empty string
- ✅ `solutionTitle` must be non-empty string
- ✅ `weeklyHoursSaved` must be non-negative number
- ✅ `yearlyCostSaved` must be non-negative number
- ✅ `improvementPercentage` must be number between 0-100
- ✅ `metrics` must be object

## 🎉 Benefits of Pre-Calculated Format

1. **Complete Control**: Send exactly the data you want displayed
2. **Custom Calculations**: Use your own business logic for ROI/costs
3. **Faster Processing**: No server-side calculations needed
4. **Rich Metrics**: Include detailed breakdown with custom fields
5. **ID Preservation**: Keep your own visualization IDs
6. **Full Customization**: Override all default values and descriptions

## 🚀 Ready to Deploy

Your Voiceflow chatbot can now send complete analysis results directly to create rich visualizations with all your custom calculations preserved! 

After the webhook deployment is complete, test with your pre-calculated data structure for instant visualization generation.

## 📞 Support

- **Webhook Endpoint:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`
- **Format:** Pre-calculated results with complete metrics
- **Response:** Same Voiceflow-optimized format with your exact data