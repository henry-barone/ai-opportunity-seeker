# 🧪 Complete SPAIK AI Opportunity Seeker Test Guide

## ✅ Issues Fixed

### **1. Frontend Dependencies** 
- ✅ Fixed `@vitejs/plugin-react` import error
- ✅ Removed problematic `lovable-tagger` dependency
- ✅ Updated Vite configuration for proper path aliases

### **2. Data Flow & Persistence**
- ✅ Enhanced Vercel API with in-memory data storage
- ✅ Added comprehensive webhook data processing
- ✅ Frontend updated to fetch from Vercel API
- ✅ Fallback to localStorage for offline testing

### **3. CORS & API Communication**
- ✅ Proper CORS headers for frontend access
- ✅ Environment variable configuration
- ✅ Multiple endpoint support for testing

## 🚀 Complete Testing Flow

### **Step 1: Start Frontend Locally**
```bash
cd frontend
npm run dev
```
✅ **Expected:** Server starts at `http://localhost:5173`

### **Step 2: Test API Endpoints**

#### **2A. Health Check**
```bash
curl https://ai-opportunity-seeker.vercel.app/health
```
✅ **Expected:** `{"status": "healthy", ...}`

#### **2B. Create Test Data**
```bash
curl https://ai-opportunity-seeker.vercel.app/api/test-data
```
✅ **Expected:** Returns test visualization data with ID

#### **2C. View Test Visualization**
1. Copy the `viewUrl` from previous response
2. Visit: `http://localhost:5173/visualization/vis_123456789_abc`
3. ✅ **Expected:** Visualization renders with test data

### **Step 3: Test Complete Webhook Flow**

#### **3A. Send Webhook from Voiceflow/Lleverage.ai**
**Webhook URL:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`

**Payload Example:**
```json
{
  "userInfo": {
    "name": "John Smith",
    "email": "john@company.com"
  },
  "recommendation": {
    "type": "time_saving",
    "title": "Invoice Processing Automation",
    "description": "Automate invoice data extraction and entry",
    "currentState": {
      "metrics": {
        "timeSpent": 20
      }
    },
    "futureState": {
      "metrics": {
        "timeSpent": 3
      }
    }
  }
}
```

#### **3B. Test via cURL**
```bash
curl -X POST https://ai-opportunity-seeker.vercel.app/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "userInfo": {
      "name": "Sarah Johnson",
      "email": "sarah@startup.io"
    },
    "recommendation": {
      "type": "cost_reduction",
      "title": "Customer Support Chatbot",
      "description": "AI chatbot for customer queries",
      "currentState": {
        "metrics": {
          "timeSpent": 15
        }
      },
      "futureState": {
        "metrics": {
          "timeSpent": 4
        }
      }
    }
  }'
```

✅ **Expected Response:**
```json
{
  "success": true,
  "id": "vis_1234567890_abcdef",
  "viewUrl": "/visualization/vis_1234567890_abcdef",
  "fullUrl": "https://ai-opportunity-seeker.vercel.app/visualization/vis_1234567890_abcdef",
  "metrics": {
    "weeklyHoursSaved": 11,
    "yearlyCostSaved": 85800,
    "improvementPercentage": 73
  },
  "solutionType": "cost_reduction",
  "solutionTitle": "Customer Support Chatbot"
}
```

#### **3C. View Generated Visualization**
1. Copy the `viewUrl` from webhook response
2. Visit: `http://localhost:5173/visualization/vis_1234567890_abcdef`
3. ✅ **Expected:** Beautiful visualization with user data, metrics, and calculations

### **Step 4: Test Different Data Types**

#### **4A. Time Saving Process**
```bash
curl -X POST https://ai-opportunity-seeker.vercel.app/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "userInfo": {"name": "Mike Chen", "email": "mike@agency.com"},
    "recommendation": {
      "type": "time_saving",
      "title": "Automated Reporting",
      "description": "Generate reports automatically",
      "currentState": {"metrics": {"timeSpent": 12}},
      "futureState": {"metrics": {"timeSpent": 2}}
    }
  }'
```

#### **4B. Error Reduction Process**  
```bash
curl -X POST https://ai-opportunity-seeker.vercel.app/webhook/visualization-data \
  -H "Content-Type: application/json" \
  -d '{
    "userInfo": {"name": "Lisa Wong", "email": "lisa@corp.com"},
    "recommendation": {
      "type": "error_reduction",
      "title": "Quality Control Automation",
      "description": "Automated quality checks",
      "currentState": {"metrics": {"timeSpent": 8}},
      "futureState": {"metrics": {"timeSpent": 1}}
    }
  }'
```

### **Step 5: Debug & Monitoring**

#### **5A. List All Visualizations**
```bash
curl https://ai-opportunity-seeker.vercel.app/api/visualizations
```
✅ **Expected:** List of recent visualizations with metadata

#### **5B. Get Specific Visualization**
```bash
curl https://ai-opportunity-seeker.vercel.app/api/visualization-data/vis_123456789_abc
```
✅ **Expected:** Complete visualization data structure

#### **5C. Check Webhook Status**
```bash
curl https://ai-opportunity-seeker.vercel.app/webhook/status
```
✅ **Expected:** Webhook configuration and statistics

## 🎯 Testing Checklist

### **Frontend Tests:**
- [ ] `npm run dev` starts without errors
- [ ] Health page loads: `http://localhost:5173/health`
- [ ] Test visualization displays correctly
- [ ] Real webhook data displays correctly
- [ ] Error handling works (try invalid ID)

### **API Tests:**
- [ ] Health check returns 200
- [ ] Test data endpoint creates visualization
- [ ] Webhook processes data correctly
- [ ] CORS allows frontend access
- [ ] Error handling returns proper status codes

### **Integration Tests:**
- [ ] Webhook → API → Frontend flow works end-to-end
- [ ] Data persists in API after webhook
- [ ] Frontend retrieves and displays webhook data
- [ ] Multiple visualizations work independently
- [ ] Calculations are accurate (hours, costs, ROI)

## 🛠️ Troubleshooting

### **Frontend Not Starting?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### **API Not Responding?**
- Check: `https://ai-opportunity-seeker.vercel.app/health`
- View Vercel function logs in dashboard
- Verify CORS headers in browser dev tools

### **Data Not Loading?**
1. Test API endpoint directly: `/api/visualization-data/YOUR_ID`
2. Check browser console for CORS errors
3. Verify visualization ID format matches API response

### **Webhook Not Working?**
1. Test with cURL first (confirm API works)
2. Check webhook payload format matches expected structure
3. Verify `Content-Type: application/json` header
4. Check Vercel function logs for processing errors

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Frontend starts cleanly** with no console errors
2. **Test visualization loads** with sample data
3. **Webhook creates visualization** and returns proper response
4. **Frontend displays webhook data** with calculations and charts
5. **Multiple visualizations work** independently
6. **Error handling works** for invalid IDs or bad data

## 🔗 Quick Links for Testing

- **Frontend Local:** `http://localhost:5173`
- **API Health:** `https://ai-opportunity-seeker.vercel.app/health`
- **Test Data:** `https://ai-opportunity-seeker.vercel.app/api/test-data`
- **Webhook URL:** `https://ai-opportunity-seeker.vercel.app/webhook/visualization-data`
- **Example Visualization:** `http://localhost:5173/visualization/vis_test_123`

Your complete SPAIK AI Opportunity Seeker system is now ready for end-to-end testing! 🚀