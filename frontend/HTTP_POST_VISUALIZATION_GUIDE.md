# HTTP POST Visualization System Guide

## Overview

The AI Opportunity Seeker application now supports receiving user data via HTTP POST requests to create personalized visualizations. This system allows external applications to send recommendation data and generate beautiful before/after impact visualizations.

## API Endpoint

### POST /api/visualization-data

**Purpose:** Receive visualization data via HTTP POST request  
**URL:** `https://yourdomain.com/api/visualization-data`  
**Method:** POST  
**Content-Type:** application/json  

### Request Format

```json
{
  "userInfo": {
    "email": "user@example.com",
    "name": "John Doe",
    "company": "Tech Corp",
    "industry": "Software Development"
  },
  "recommendation": {
    "type": "time_saving",
    "title": "Automated Document Processing",
    "description": "Implement AI-powered document processing to reduce manual data entry",
    "currentState": {
      "description": "Manual document review and data entry taking 6 hours daily",
      "painPoints": [
        "Time-consuming manual work",
        "High error rates in data entry",
        "Bottlenecks during peak periods"
      ],
      "metrics": {
        "timeSpent": 6,
        "errorRate": 12,
        "capacity": 100,
        "cost": 800
      }
    },
    "futureState": {
      "description": "AI-powered document processing with automated extraction",
      "benefits": [
        "Automated data extraction",
        "Real-time processing",
        "Consistent accuracy"
      ],
      "metrics": {
        "timeSpent": 1,
        "errorRate": 2,
        "capacity": 500,
        "cost": 300
      }
    },
    "improvement": {
      "percentage": 83,
      "absoluteValue": 5,
      "unit": "hours",
      "description": "Save 5 hours per day"
    },
    "implementationTimeline": "2-4 weeks",
    "confidence": 0.85
  },
  "chatHistory": [
    "Hello! I'm looking to automate our document processing workflow.",
    "We currently spend 6 hours daily on manual data entry...",
    "Based on your needs, I recommend implementing AI-powered document processing..."
  ],
  "sessionId": "session_123456"
}
```

### Response Format

**Success Response (200 OK):**
```json
{
  "success": true,
  "id": "vis_1704067200000_abc123def",
  "message": "Visualization data received successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    "recommendation.type is required",
    "recommendation.title is required"
  ]
}
```

## Data Structure Requirements

### Required Fields

- `recommendation.type` - Must be one of:
  - `time_saving`
  - `error_reduction`
  - `capacity_increase`
  - `cost_reduction`
  - `response_time`
  - `generic`
- `recommendation.title` - Title of the recommendation
- `recommendation.description` - Description of the recommendation

### Optional Fields

- `userInfo` - User information object
- `recommendation.currentState` - Current situation details
- `recommendation.futureState` - Future state details
- `recommendation.improvement` - Improvement metrics
- `recommendation.implementationTimeline` - Implementation timeline
- `recommendation.confidence` - Confidence level (0-1)
- `chatHistory` - Array of chat messages
- `sessionId` - Session identifier

## Recommendation Types

### time_saving
- **Icon:** Clock
- **Color:** Blue
- **Focus:** Time reduction and efficiency
- **Metrics:** timeSpent (hours)

### error_reduction
- **Icon:** Star
- **Color:** Yellow/Orange
- **Focus:** Quality improvement and accuracy
- **Metrics:** errorRate (percentage)

### capacity_increase
- **Icon:** Trending Up
- **Color:** Green
- **Focus:** Scaling and volume handling
- **Metrics:** capacity (units per day)

### cost_reduction
- **Icon:** Euro
- **Color:** Purple
- **Focus:** Financial savings
- **Metrics:** cost (currency)

### response_time
- **Icon:** Zap
- **Color:** Indigo
- **Focus:** Speed and responsiveness
- **Metrics:** responseTime (hours)

### generic
- **Icon:** Check Circle
- **Color:** Gray
- **Focus:** General process improvement
- **Metrics:** Mixed

## Implementation Examples

### cURL Example

```bash
curl -X POST https://yourdomain.com/api/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "userInfo": {
      "email": "test@example.com",
      "name": "John Doe",
      "company": "Tech Corp"
    },
    "recommendation": {
      "type": "time_saving",
      "title": "Document Processing Automation",
      "description": "Automate document processing to save time",
      "improvement": {
        "percentage": 80,
        "absoluteValue": 5,
        "unit": "hours",
        "description": "Save 5 hours per day"
      },
      "implementationTimeline": "2-4 weeks",
      "confidence": 0.85
    }
  }'
```

### JavaScript Example

```javascript
const visualizationData = {
  userInfo: {
    email: "user@example.com",
    name: "John Doe",
    company: "Tech Corp"
  },
  recommendation: {
    type: "time_saving",
    title: "Document Processing Automation",
    description: "Automate document processing to save time",
    improvement: {
      percentage: 80,
      absoluteValue: 5,
      unit: "hours",
      description: "Save 5 hours per day"
    },
    implementationTimeline: "2-4 weeks",
    confidence: 0.85
  }
};

fetch('/api/visualization-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(visualizationData)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  // Redirect user to visualization
  window.location.href = `/visualization/${data.id}`;
});
```

### Python Example

```python
import requests
import json

data = {
    "userInfo": {
        "email": "user@example.com",
        "name": "John Doe",
        "company": "Tech Corp"
    },
    "recommendation": {
        "type": "time_saving",
        "title": "Document Processing Automation",
        "description": "Automate document processing to save time",
        "improvement": {
            "percentage": 80,
            "absoluteValue": 5,
            "unit": "hours",
            "description": "Save 5 hours per day"
        },
        "implementationTimeline": "2-4 weeks",
        "confidence": 0.85
    }
}

response = requests.post(
    'https://yourdomain.com/api/visualization-data',
    headers={'Content-Type': 'application/json'},
    data=json.dumps(data)
)

result = response.json()
print(f"Visualization ID: {result['id']}")
print(f"View at: https://yourdomain.com/visualization/{result['id']}")
```

## User Flow

1. **Data Submission:** External system sends POST request with user data
2. **Data Validation:** System validates required fields and data structure
3. **ID Generation:** System generates unique ID for the visualization
4. **Data Storage:** Data is stored (in-memory for demo, database for production)
5. **Response:** System returns success response with generated ID
6. **Visualization Access:** Users can view visualization at `/visualization/{id}`

## Visualization Features

### Interactive Elements
- **Scale Slider:** Users can adjust business scale (0.5x to 5x)
- **Responsive Design:** Works on mobile and desktop
- **Professional Branding:** SPAIK purple color scheme

### Content Sections
- **Header:** Title, description, and user info
- **Before/After Comparison:** Side-by-side current vs future state
- **Key Metrics:** Highlighted improvement statistics
- **Implementation Timeline:** Progress bar with confidence level
- **Call to Action:** Consultation booking buttons

### Visual Elements
- **Type-specific Icons:** Different icons for each recommendation type
- **Color Coding:** Consistent color scheme based on recommendation type
- **Animations:** Smooth transitions and hover effects
- **Data Display:** Formatted metrics and percentages

## Testing

### Test Page
Visit `/visualization-test` to test the POST functionality with sample data.

### Manual Testing
1. Go to `/visualization-test`
2. Click "Test with Local Storage" or "Send to API"
3. View the generated visualization
4. Test different recommendation types

### Sample Data
The system includes comprehensive sample data for all recommendation types, making it easy to test different scenarios.

## Security Considerations

- **Data Validation:** All incoming data is validated before processing
- **Content Security:** Input sanitization prevents XSS attacks
- **Rate Limiting:** Should be implemented for production use
- **Authentication:** Consider adding API key authentication for production

## Production Deployment

### Server Setup
1. Install dependencies: `npm install express cors`
2. Run server: `node server.js`
3. Set up reverse proxy (nginx/Apache) for production
4. Configure HTTPS and security headers

### Database Integration
For production, replace in-memory storage with:
- PostgreSQL
- MongoDB
- Redis (for caching)

### Monitoring
- Log all POST requests
- Monitor response times
- Track visualization creation rates
- Set up alerts for errors

## Troubleshooting

### Common Issues

**400 Bad Request:** Check required fields are present
**404 Not Found:** Verify API endpoint URL is correct
**500 Internal Server Error:** Check server logs for details

### Debug Mode
Set `NODE_ENV=development` to enable detailed logging of all incoming requests.

## Support

For integration support or questions, refer to the test page at `/visualization-test` which includes:
- Sample data structures
- Live testing functionality
- Integration examples
- Error handling demonstrations