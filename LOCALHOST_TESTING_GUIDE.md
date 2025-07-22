# 🧪 Localhost Testing Guide

## 🚀 Quick Start

Your development server is now running at: **http://localhost:5174**

## 📱 Testing the Notification System Locally

### Method 1: Complete Demo Page (Recommended)
1. Open your browser and go to: **http://localhost:5174/enhanced-demo**
2. Click the green **"Simulate Chat Exit"** button
3. Watch for the notification popup in the top-right corner
4. Click **"View Full Analysis"** to see the enhanced visualization

### Method 2: Browser Console Testing
1. Open any page (e.g., http://localhost:5174)
2. Press **F12** to open developer tools
3. Go to the **Console** tab
4. Run any of these commands:

```javascript
// Complete chat exit simulation
window.simulateChatExit()

// Direct webhook test with notification
window.testWebhookWithDirectNotification()

// Manual notification trigger (for testing popup only)
window.triggerDirectNotification('test-id', 'Test Analysis')

// Local simulation (doesn't use API)
window.simulateWebhook()
```

### Method 3: Direct Visualization Testing
Visit a specific visualization directly:
- http://localhost:5174/visualization/test-id
- http://localhost:5174/visualization/vis_1753105901374_vux5yqtb58a (from our test)

## 🔧 Available Test Pages

| URL | Purpose |
|-----|---------|
| `http://localhost:5174/` | Main homepage |
| `http://localhost:5174/enhanced-demo` | **Primary test page** - Complete integration testing |
| `http://localhost:5174/visualization-demo` | Original visualization demo |
| `http://localhost:5174/api-test` | API testing page |
| `http://localhost:5174/test` | Basic test visualization |

## 🎯 What You'll See

### 1. Notification Popup
- Slides in from top-right corner
- Shows analysis title and preview
- "View Full Analysis" button opens new tab
- Auto-closes after 10 seconds

### 2. Enhanced Visualization Features
- **Hero Section**: Gradient header with key metrics
- **Animated Charts**: Before/after comparisons with smooth transitions
- **ROI Timeline**: Interactive 18-month investment graph
- **Metrics Dashboard**: Tabbed view (Time/Cost/Quality)
- **Business Scale Slider**: Adjust metrics from 0.5x to 5x
- **Trust Builders**: Implementation timeline and expertise badges

## 🔍 Debugging

### Browser Console Logs
Look for these log messages to verify everything is working:
```
[WebhookBridge] Starting polling for new visualizations...
[NotificationSystem] Initializing webhook bridge...
[DirectTrigger] Triggering immediate notification for: xxx
```

### Network Tab
- Check for successful API calls to `ai-opportunity-seeker.vercel.app`
- Webhook POST should return status 200 with visualization data

## 🌐 Local vs Production

**Local Development (localhost:5174):**
- ✅ All UI components and animations
- ✅ Notification system and popups
- ✅ Enhanced visualizations
- ✅ Test functions and simulations
- 🌐 Uses production API for webhook data

**API Endpoint:**
- Still uses production: `https://ai-opportunity-seeker.vercel.app`
- All webhook data is real and stored in production
- Visualizations created during testing are persistent

## 🧪 Recommended Testing Flow

1. **Start Here**: http://localhost:5174/enhanced-demo
2. **Open Console**: Press F12 for detailed logs
3. **Run Main Test**: Click "Simulate Chat Exit"
4. **Watch Results**: 
   - Console logs show progress
   - Notification popup appears
   - Click to view enhanced visualization
5. **Explore Features**:
   - Try the business scale slider
   - Switch between metrics tabs
   - Scroll through all sections

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎉 Success Indicators

✅ **Notification System Working**: Popup appears after test  
✅ **Enhanced Visualization**: All animated features visible  
✅ **New Tab Opening**: Visualization opens in separate tab  
✅ **API Integration**: Real webhook data processed  
✅ **Console Logs**: No errors, success messages visible  

## 🚀 Ready to Test!

Your localhost environment is fully set up. Visit **http://localhost:5174/enhanced-demo** and click the green "Simulate Chat Exit" button to see the complete integration in action!