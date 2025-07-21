# Webhook Troubleshooting Guide

## 🔍 Current Status: WORKING LOCALLY

Your webhook server is **running correctly** on port 8080, but Lleverage.ai can't connect because `localhost:8080` is only accessible from your local machine.

## 🚨 The Problem

**Lleverage.ai is trying to connect to:** `http://localhost:8080/webhook/visualization-data`

**Issue:** `localhost` only works from your local machine. Lleverage.ai (running on their servers) cannot access `localhost:8080` on your computer.

## ✅ Solutions

### Option 1: Use ngrok (Recommended for Testing)

1. **Install ngrok** (if not already installed):
```bash
# Using Homebrew on macOS
brew install ngrok

# Or download from https://ngrok.com/download
```

2. **Start ngrok tunnel:**
```bash
ngrok http 8080
```

3. **Copy the public URL** (something like `https://abc123.ngrok.io`)

4. **Update your Lleverage.ai workflow** to use:
```
https://abc123.ngrok.io/webhook/visualization-data
```

### Option 2: Deploy to Production Server

Deploy your webhook to a cloud service:
- **Heroku**: `https://yourapp.herokuapp.com/webhook/visualization-data`
- **Vercel**: `https://yourapp.vercel.app/webhook/visualization-data`
- **Railway**: `https://yourapp.railway.app/webhook/visualization-data`

### Option 3: Use Local IP Address (Same Network Only)

If Lleverage.ai is on the same network:

1. **Find your local IP:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. **Use IP instead of localhost:**
```
http://192.168.1.XXX:8080/webhook/visualization-data
```

## 🧪 Verification Steps

### 1. Check Server Status
```bash
curl -s http://localhost:8080/webhook/status | jq .status
```
**Expected:** `"healthy"` or `"degraded"`

### 2. Test Webhook Endpoint
```bash
curl -X POST http://localhost:8080/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{"recommendation":{"type":"time_saving","title":"Test","description":"Test webhook"}}'
```
**Expected:** `{"success":true,"id":"webhook_...","message":"Visualization data received successfully"}`

### 3. Test with String Format (Lleverage.ai Compatible)
```bash
curl -X POST http://localhost:8080/webhook/visualization-data \
  -H "Content-Type: text/plain" \
  -d "task:testing
current:2_hours
future:30_minutes
type:time_saving
frequency:daily"
```

## 🔧 Server Management

### Start Server
```bash
cd /Users/henrybarone/Desktop/SPAIK.io/Lovable/ai-opportunity-seeker/frontend
node server.cjs
```

### Stop Server
```bash
pkill -f "node server.cjs"
```

### Check if Server is Running
```bash
ps aux | grep "node server.cjs" | grep -v grep
lsof -i :8080
```

### Server Logs
The server will show detailed logs for each webhook request:
```
[WEBHOOK] Incoming request: {...}
[WEBHOOK] Response: {...}
```

## 📋 Health Check Endpoints

- **Status**: `GET http://localhost:8080/webhook/status`
- **Health**: `GET http://localhost:8080/webhook/health`
- **Statistics**: `GET http://localhost:8080/webhook/stats`

## 🔑 Current Server Configuration

- **Port**: 8080
- **Endpoint**: `/webhook/visualization-data`
- **Formats**: JSON and text/plain
- **Security**: Optional HMAC signature verification
- **Rate Limiting**: 100 requests/minute per IP
- **Timeout**: 30 seconds
- **Max Payload**: 10MB

## 🎯 Quick Fix for Lleverage.ai

**Immediate Solution:**

1. **Keep your server running:**
```bash
node server.cjs
```

2. **Open new terminal and start ngrok:**
```bash
ngrok http 8080
```

3. **Copy the HTTPS URL from ngrok** (e.g., `https://abc123.ngrok.io`)

4. **Update your Lleverage.ai workflow to use:**
```
https://abc123.ngrok.io/webhook/visualization-data
```

5. **Test the connection:**
```bash
curl -X POST https://abc123.ngrok.io/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{"recommendation":{"type":"time_saving","title":"Test","description":"Test from Lleverage.ai"}}'
```

## 🚀 Production Deployment

For production use, deploy to a cloud service and update the URL in your Lleverage.ai workflow.

### Example Environment Variables
```bash
PORT=8080
WEBHOOK_SECRET=your-production-secret
NODE_ENV=production
```

## 📞 Still Having Issues?

If you're still getting "fetch failed" errors:

1. **Check the URL format** - ensure it's the complete URL including protocol
2. **Verify the endpoint path** - it should be `/webhook/visualization-data`
3. **Check firewall settings** - ensure port 8080 is accessible
4. **Test with curl first** - before testing with Lleverage.ai
5. **Check server logs** - look for incoming requests and errors

Your webhook server is working correctly - the issue is network accessibility!