# Webhook URLs Reference

## Primary Webhook Endpoint

**URL:** `POST /webhook/visualization-data`  
**Purpose:** Receive visualization data via webhook  
**Security:** HMAC SHA256 signature verification  
**Content-Type:** `application/json`  

### Example Usage
```bash
curl -X POST https://yourdomain.com/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: sha256=<signature>" \
  -d '{"userInfo":{"email":"test@example.com"},"recommendation":{"type":"time_saving","title":"Test","description":"Test webhook"}}'
```

## Monitoring Endpoints

### Webhook Status
**URL:** `GET /webhook/status`  
**Purpose:** Check webhook configuration and statistics  

### Health Check
**URL:** `GET /api/health`  
**Purpose:** Overall system health including webhook status  

## Testing

### Test Page
**URL:** `GET /visualization-test`  
**Purpose:** Interactive webhook testing interface  

### View Visualization
**URL:** `GET /visualization/{id}`  
**Purpose:** View generated visualization by ID  

## Legacy Endpoint

**URL:** `POST /api/visualization-data`  
**Purpose:** Legacy API endpoint (still functional)  
**Security:** No signature verification  

## Quick Start

1. **Configure webhook secret:**
   ```bash
   export WEBHOOK_SECRET=your-secure-secret-key
   ```

2. **Start server:**
   ```bash
   node server.js
   ```

3. **Test webhook:**
   Visit `/visualization-test` and click "Send to Webhook"

4. **View results:**
   Check server logs and visit the returned visualization URL

## Security Notes

- Always use HTTPS in production
- Configure a strong webhook secret
- Verify signatures on all incoming webhooks
- Monitor webhook logs for security issues