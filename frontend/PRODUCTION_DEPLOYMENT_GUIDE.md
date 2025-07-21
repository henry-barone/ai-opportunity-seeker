# SPAIK Production Deployment Guide

## 🚨 Diagnosed Issues & Solutions

### **Primary Issue: Missing Production Build**
Your 404 errors are likely caused by one of these issues:

1. **No Production Build**: The app isn't built for production
2. **Incorrect Start Command**: Using development server instead of production
3. **Missing Environment Variables**: Production configuration not set
4. **Routing Issues**: SPA routing conflicts with server endpoints

## ✅ Fixed Production Configuration

I've created a complete production setup:

### **New Files Created:**
- `production-start.js` - Production server with proper routing
- `.env.production` - Production environment variables
- `Procfile` - For Heroku deployment
- `vercel.json` - For Vercel deployment
- `netlify.toml` - For Netlify deployment

### **Updated Files:**
- `package.json` - Added `"start"` script for production

## 🛠️ Deployment Instructions

### **Step 1: Build the Application**
```bash
npm run build
```
This creates the `dist/` directory with production-ready files.

### **Step 2: Test Production Locally**
```bash
npm start
```
This runs the production server on `http://localhost:3000`

### **Step 3: Configure Environment Variables**

Set these environment variables on your production server:

```bash
NODE_ENV=production
PORT=3000
WEBHOOK_SECRET=your-secure-production-secret-here
BASE_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🚀 Platform-Specific Deployment

### **Heroku**
1. Push code with new `Procfile`
2. Set environment variables in Heroku dashboard
3. Deploy: `git push heroku main`

### **Vercel**
1. Use the provided `vercel.json` configuration
2. Set environment variables in Vercel dashboard
3. Deploy: `vercel --prod`

### **Netlify**
1. Use the provided `netlify.toml` configuration
2. Set environment variables in Netlify dashboard
3. Deploy via Git integration

### **Generic VPS/Server**
1. Install dependencies: `npm install`
2. Build app: `npm run build`
3. Set environment variables
4. Start: `npm start`
5. Use PM2 for process management: `pm2 start production-start.js --name spaik`

## 🔧 Production Features

### **Enhanced Routing**
- ✅ API routes served first (prevents 404s)
- ✅ Webhook endpoints properly configured
- ✅ Static files served from `/dist`
- ✅ SPA fallback for React Router

### **Security & Performance**
- ✅ CORS properly configured for production
- ✅ Trust proxy for load balancers
- ✅ Rate limiting and duplicate detection
- ✅ Proper error handling

### **Monitoring & Health**
- ✅ `/health` endpoint for server monitoring
- ✅ `/webhook/status` for webhook monitoring
- ✅ Comprehensive logging

## 🧪 Testing Production Deployment

### **Health Check**
```bash
curl https://yourdomain.com/health
```

### **Webhook Test**
```bash
curl -X POST https://yourdomain.com/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "userInfo": {"name": "Test User", "email": "test@example.com"},
    "recommendation": {
      "type": "time_saving",
      "title": "Test Automation",
      "description": "Test webhook integration",
      "currentState": {"metrics": {"timeSpent": 10}},
      "futureState": {"metrics": {"timeSpent": 2}}
    }
  }'
```

### **Frontend Test**
Visit `https://yourdomain.com` - should load the React app without 404s.

## 🎯 Webhook URL for Voiceflow

Use this URL in your Voiceflow webhook configuration:
```
https://yourdomain.com/webhook/visualization-data
```

## 📊 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Server port (default: 3000) |
| `WEBHOOK_SECRET` | Recommended | Secret for webhook signature verification |
| `BASE_URL` | Recommended | Your production domain for webhook responses |
| `ALLOWED_ORIGINS` | Optional | CORS allowed origins (comma-separated) |

## 🚨 Common Issues & Solutions

### **Still Getting 404s?**
1. Check if `npm run build` was successful
2. Verify environment variables are set
3. Check server logs for specific errors
4. Test health endpoint first: `/health`

### **Webhook Not Working?**
1. Test webhook status: `/webhook/status`
2. Check webhook secret configuration
3. Verify JSON payload format
4. Check server logs for processing errors

### **Frontend Not Loading?**
1. Verify `dist/index.html` exists after build
2. Check static file serving in server logs
3. Test direct access to static files
4. Verify SPA routing fallback

## 📞 Production Support

Your SPAIK webhook is now production-ready with:
- ✅ Comprehensive error handling
- ✅ Multiple deployment platform support
- ✅ Enhanced monitoring and logging
- ✅ Proper production configuration

Deploy using the instructions above and your 404 errors should be resolved!