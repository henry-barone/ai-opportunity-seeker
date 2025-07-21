# 🌐 Webhook Public URL Setup Guide

## 🎯 **Quick Solution: Use ngrok (Recommended)**

### Step 1: Set up ngrok (One-time setup)
1. **Sign up for free**: https://dashboard.ngrok.com/signup
2. **Get your authtoken**: https://dashboard.ngrok.com/get-started/your-authtoken
3. **Install the authtoken**:
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
   ```

### Step 2: Start the tunnel
```bash
ngrok http 8080
```

### Step 3: Copy your webhook URL
Look for this in the ngrok output:
```
https://abc123.ngrok.io -> http://localhost:8080
```

### Step 4: Your Lleverage.ai webhook URL
```
https://abc123.ngrok.io/webhook/visualization-data
```

## 🔄 **Alternative: localtunnel (No signup required)**

### Step 1: Install localtunnel
```bash
npm install -g localtunnel
```

### Step 2: Start the tunnel
```bash
lt --port 8080 --subdomain webhook-test
```

### Step 3: Your webhook URL
```
https://webhook-test.loca.lt/webhook/visualization-data
```

**Note**: First-time visitors to localtunnel URLs see a warning page. Click "Click to continue" to proceed.

## ⚡ **Alternative: Using your local IP (Same network only)**

If Lleverage.ai is on your local network:
```
http://192.168.100.135:8080/webhook/visualization-data
```

## 🧪 **Test Your Public URL**

Once you have your public URL, test it:

```bash
# Replace YOUR_PUBLIC_URL with your actual URL
curl -X POST YOUR_PUBLIC_URL/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{"recommendation":{"type":"time_saving","title":"Test from public URL","description":"Testing public webhook access"}}'
```

Expected response:
```json
{
  "success": true,
  "id": "webhook_...",
  "message": "Visualization data received successfully"
}
```

## 📋 **Current Server Status**

Your webhook server is running at:
- **Local URL**: `http://localhost:8080/webhook/visualization-data`
- **Status Check**: `http://localhost:8080/webhook/status`
- **Health Check**: `http://localhost:8080/webhook/health`

## 🔧 **Server Management Commands**

### Check server status
```bash
./webhook-status.sh
```

### Start server (if needed)
```bash
node server.cjs
```

### Stop server
```bash
pkill -f "node server.cjs"
```

## 🎯 **For Your Lleverage.ai Workflow**

### Webhook Configuration
- **Method**: POST
- **URL**: `https://your-tunnel-url/webhook/visualization-data`
- **Content-Type**: `application/json` or `text/plain`
- **Body**: Your workflow data

### Supported Data Formats

#### JSON Format (Recommended):
```json
{
  "userInfo": {
    "email": "user@example.com",
    "name": "John Doe"
  },
  "recommendation": {
    "type": "time_saving",
    "title": "Process Automation",
    "description": "Automate manual processes",
    "improvement": {
      "percentage": 75,
      "absoluteValue": 3,
      "unit": "hours"
    }
  }
}
```

#### String Format:
```
task:document_processing
current:2_hours
future:30_minutes
type:time_saving
frequency:daily
```

## 🚨 **Troubleshooting**

### If webhook returns 503 "Tunnel Unavailable"
- Wait 30 seconds for tunnel to initialize
- Restart the tunnel
- Try a different tunnel service

### If webhook returns 404
- Check the endpoint path: `/webhook/visualization-data`
- Ensure server is running on port 8080

### If webhook returns 401 "Unauthorized"
- This is normal if you're not providing a signature
- The webhook will still process the request

## 🎉 **Ready to Use!**

1. **Choose your tunnel method** (ngrok recommended)
2. **Start the tunnel**
3. **Copy the public URL**
4. **Update your Lleverage.ai workflow**
5. **Test the connection**

Your webhook server is ready and waiting for data from Lleverage.ai! 🚀