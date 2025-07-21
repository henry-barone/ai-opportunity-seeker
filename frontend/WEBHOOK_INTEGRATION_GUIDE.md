# Webhook Integration Guide

## Overview

The AI Opportunity Seeker application receives user data via webhook requests to create personalized visualizations. This guide covers the complete webhook integration process, including security, monitoring, and testing.

## Webhook Endpoint

### Primary Webhook URL
```
POST /webhook/visualization-data
```

**Full URL:** `https://yourdomain.com/webhook/visualization-data`  
**Content-Type:** `application/json`  
**Security:** HMAC SHA256 signature verification  
**Timeout:** 30 seconds  
**Max Payload:** 10MB  

## Security

### Webhook Signature Verification

The webhook uses HMAC SHA256 signatures for security. Include the signature in the request header:

```
X-Webhook-Signature: sha256=<signature>
```

### Signature Generation

**Node.js Example:**
```javascript
const crypto = require('crypto');

const payload = JSON.stringify(data);
const secret = 'your-webhook-secret-key';
const signature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

const headers = {
  'Content-Type': 'application/json',
  'X-Webhook-Signature': `sha256=${signature}`
};
```

**Python Example:**
```python
import hmac
import hashlib
import json

def generate_signature(payload, secret):
    payload_bytes = json.dumps(payload).encode('utf-8')
    signature = hmac.new(
        secret.encode('utf-8'),
        payload_bytes,
        hashlib.sha256
    ).hexdigest()
    return f"sha256={signature}"

headers = {
    'Content-Type': 'application/json',
    'X-Webhook-Signature': generate_signature(data, 'your-webhook-secret-key')
}
```

## Request Format

### Complete Request Structure

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
        "Bottlenecks during peak periods",
        "Employee burnout from repetitive tasks"
      ],
      "metrics": {
        "timeSpent": 6,
        "errorRate": 12,
        "capacity": 100,
        "cost": 800
      }
    },
    "futureState": {
      "description": "AI-powered document processing with automated extraction and validation",
      "benefits": [
        "Automated data extraction",
        "Real-time processing",
        "Consistent accuracy",
        "Scalable to any volume"
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
    "We currently spend 6 hours daily on manual data entry from invoices and contracts.",
    "This is causing delays and errors in our workflow.",
    "Based on your needs, I recommend implementing AI-powered document processing..."
  ],
  "sessionId": "session_123456"
}
```

### Required Fields

- `recommendation.type` - Must be one of: `time_saving`, `error_reduction`, `capacity_increase`, `cost_reduction`, `response_time`, `generic`
- `recommendation.title` - Title of the recommendation
- `recommendation.description` - Description of the recommendation

### Optional Fields

All other fields are optional but recommended for better visualization quality.

## Response Format

### Success Response (200 OK)

```json
{
  "success": true,
  "id": "vis_1704067200000_abc123def",
  "message": "Visualization data received successfully",
  "processingTime": 45,
  "viewUrl": "/visualization/vis_1704067200000_abc123def"
}
```

### Error Responses

**400 Bad Request - Invalid JSON:**
```json
{
  "success": false,
  "error": "Invalid JSON",
  "message": "Request body must be valid JSON"
}
```

**400 Bad Request - Validation Error:**
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

**401 Unauthorized - Invalid Signature:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid webhook signature"
}
```

**408 Request Timeout:**
```json
{
  "success": false,
  "error": "Webhook processing timeout",
  "message": "Request processing exceeded time limit"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error details..."
}
```

## Implementation Examples

### cURL with Signature

```bash
#!/bin/bash

SECRET="your-webhook-secret-key"
PAYLOAD='{"userInfo":{"email":"test@example.com","name":"John Doe"},"recommendation":{"type":"time_saving","title":"Test Automation","description":"Test webhook integration","improvement":{"percentage":80,"absoluteValue":5,"unit":"hours","description":"Save 5 hours per day"},"implementationTimeline":"2-4 weeks","confidence":0.85}}'

SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" -binary | xxd -p -c 256)

curl -X POST https://yourdomain.com/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: sha256=$SIGNATURE" \
  -d "$PAYLOAD"
```

### JavaScript/Node.js

```javascript
const crypto = require('crypto');

async function sendWebhook(data, webhookUrl, secret) {
  const payload = JSON.stringify(data);
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': `sha256=${signature}`,
      'User-Agent': 'Your-App/1.0.0'
    },
    body: payload
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status}`);
  }

  return await response.json();
}

// Usage
const data = {
  userInfo: { email: "user@example.com", name: "John Doe" },
  recommendation: {
    type: "time_saving",
    title: "Automated Processing",
    description: "Automate manual processes",
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

sendWebhook(data, 'https://yourdomain.com/webhook/visualization-data', 'your-secret-key')
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

### Python

```python
import requests
import hmac
import hashlib
import json

def send_webhook(data, webhook_url, secret):
    payload = json.dumps(data, separators=(',', ':'))
    signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    headers = {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': f'sha256={signature}',
        'User-Agent': 'Your-App/1.0.0'
    }
    
    response = requests.post(webhook_url, headers=headers, data=payload)
    response.raise_for_status()
    return response.json()

# Usage
data = {
    "userInfo": {"email": "user@example.com", "name": "John Doe"},
    "recommendation": {
        "type": "time_saving",
        "title": "Automated Processing",
        "description": "Automate manual processes",
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

try:
    result = send_webhook(data, 'https://yourdomain.com/webhook/visualization-data', 'your-secret-key')
    print(f"Success: {result}")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
```

## Monitoring and Status

### Webhook Status Endpoint

```
GET /webhook/status
```

**Response:**
```json
{
  "status": "active",
  "endpoint": "/webhook/visualization-data",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "configuration": {
    "secretConfigured": true,
    "timeout": 30000,
    "maxPayloadSize": "10MB"
  },
  "statistics": {
    "totalVisualizations": 42,
    "lastVisualization": "2024-01-01T11:30:00.000Z"
  }
}
```

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "dataCount": 42,
  "webhook": {
    "status": "active",
    "endpoint": "/webhook/visualization-data"
  }
}
```

## Server Logging

The webhook endpoint logs all requests with detailed information:

```
[WEBHOOK] 2024-01-01T12:00:00.000Z - SUCCESS: Visualization data stored successfully (45ms)
[WEBHOOK] Details: {
  "timestamp": "2024-01-01T12:00:00.000Z",
  "ip": "192.168.1.100",
  "userAgent": "Your-App/1.0.0",
  "contentType": "application/json",
  "contentLength": "1024",
  "signature": "verified",
  "status": "SUCCESS",
  "message": "Visualization data stored successfully (45ms)"
}
[WEBHOOK] Created visualization: vis_1704067200000_abc123def
[WEBHOOK] Type: time_saving
[WEBHOOK] Title: Automated Document Processing
```

## Best Practices

### Retry Logic

Implement exponential backoff for failed webhook deliveries:

```javascript
async function sendWebhookWithRetry(data, url, secret, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await sendWebhook(data, url, secret);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Webhook Validation

Always validate webhook responses:

```javascript
function validateWebhookResponse(response) {
  if (!response.success) {
    throw new Error(`Webhook failed: ${response.error}`);
  }
  
  if (!response.id) {
    throw new Error('No visualization ID returned');
  }
  
  return response;
}
```

### Error Handling

```javascript
try {
  const result = await sendWebhook(data, webhookUrl, secret);
  console.log(`Visualization created: ${result.viewUrl}`);
} catch (error) {
  if (error.response?.status === 401) {
    console.error('Webhook authentication failed');
  } else if (error.response?.status === 400) {
    console.error('Invalid webhook data:', error.response.data);
  } else {
    console.error('Webhook delivery failed:', error.message);
  }
}
```

## Testing

### Test Endpoint

Visit `/visualization-test` to test webhook functionality with sample data.

### Manual Testing

1. Configure webhook secret: `WEBHOOK_SECRET=your-secret-key`
2. Start server: `node server.js`
3. Send test webhook with signature
4. Check server logs for processing details
5. View visualization at returned URL

### Webhook Testing Tools

- **ngrok**: For local development testing
- **Postman**: For manual webhook testing
- **curl**: For command-line testing

## Deployment

### Environment Variables

```bash
# Required
WEBHOOK_SECRET=your-secure-secret-key-here

# Optional
PORT=3001
NODE_ENV=production
```

### Production Considerations

1. **Use HTTPS** - Always use HTTPS in production
2. **Set Strong Secret** - Use a cryptographically secure secret
3. **Monitor Logs** - Set up log monitoring and alerting
4. **Rate Limiting** - Implement rate limiting for webhook endpoints
5. **Database Storage** - Replace in-memory storage with database
6. **Load Balancing** - Consider load balancing for high traffic

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "server.js"]
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check webhook signature generation
2. **400 Bad Request**: Verify JSON structure and required fields
3. **408 Timeout**: Reduce payload size or check server performance
4. **500 Internal Error**: Check server logs for detailed error information

### Debug Mode

Enable debug logging:
```bash
NODE_ENV=development node server.js
```

### Webhook Testing

Use the built-in test page at `/visualization-test` to verify webhook functionality.

## Support

For webhook integration support:
- Test page: `/visualization-test`
- Status endpoint: `/webhook/status`
- Health check: `/api/health`
- Server logs: Check console output for detailed webhook processing information