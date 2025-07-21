# 🚀 ngrok Setup Guide for Webhook Testing

## 🔧 Step 1: Set up ngrok Authentication

### 1. Sign up for ngrok (Free)
Visit: https://dashboard.ngrok.com/signup

### 2. Get your authtoken
1. Go to: https://dashboard.ngrok.com/get-started/your-authtoken
2. Copy your authtoken (it looks like: `2abc...`)

### 3. Install your authtoken
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

### 4. Start the tunnel
```bash
ngrok http 8080
```

### 5. Copy the HTTPS URL
Look for a line like:
```
https://abc123.ngrok.io -> http://localhost:8080
```

### 6. Your webhook URL for Lleverage.ai
```
https://abc123.ngrok.io/webhook/visualization-data
```

## 🔄 Alternative: Using localtunnel (No signup required)

If you prefer not to sign up for ngrok, you can use localtunnel:

### 1. Install localtunnel
```bash
npm install -g localtunnel
```

### 2. Start the tunnel
```bash
lt --port 8080 --subdomain webhook-test
```

### 3. Your webhook URL
```
https://webhook-test.loca.lt/webhook/visualization-data
```

## 🌐 Alternative: Using SSH tunnel (Advanced)

If you have access to a server with a public IP:

```bash
ssh -R 8080:localhost:8080 user@your-server.com
```

Then use: `http://your-server.com:8080/webhook/visualization-data`

## 🎯 Quick Test Commands

Once you have your public URL, test it:

```bash
# Replace YOUR_PUBLIC_URL with your actual URL
curl -X POST YOUR_PUBLIC_URL/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{"recommendation":{"type":"time_saving","title":"Test from ngrok","description":"Testing public webhook"}}'
```

## 📋 Current Server Status

Your webhook server is running at:
- **Local**: `http://localhost:8080/webhook/visualization-data`
- **Status**: `http://localhost:8080/webhook/status`

## 🔧 Server Management

### Check if server is running
```bash
./webhook-status.sh
```

### Start server (if needed)
```bash
node server.cjs
```

## 📱 Next Steps

1. **Set up ngrok** (recommended) OR **install localtunnel**
2. **Get your public URL**
3. **Update your Lleverage.ai workflow** with the public URL
4. **Test the connection**

Your webhook server is ready - you just need to make it publicly accessible! 🚀