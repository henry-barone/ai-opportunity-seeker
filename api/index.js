/**
 * Vercel Serverless Function for SPAIK AI Opportunity Seeker
 * Handles webhook endpoints for Voiceflow chatbot integration
 */

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

// Import SPAIK processors and middleware
const {
  validateSpaikData,
  processSpaikData,
  createEnhancedResponse
} = require('../src/utils/spaik-data-processor.cjs');

const {
  rateLimitMiddleware,
  duplicateDetectionMiddleware,
  webhookSecurityMiddleware,
  webhookLoggingMiddleware,
  webhookErrorHandler,
  webhookHealthCheck,
  requestValidationMiddleware,
  webhookMonitoringMiddleware
} = require('../src/utils/webhook-middleware.cjs');

const app = express();

// Vercel configuration
const NODE_ENV = process.env.NODE_ENV || 'production';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'production-webhook-secret-key';
const WEBHOOK_TIMEOUT = parseInt(process.env.WEBHOOK_TIMEOUT) || 30000;
const ENABLE_RATE_LIMITING = process.env.ENABLE_RATE_LIMITING !== 'false';
const ENABLE_DUPLICATE_DETECTION = process.env.ENABLE_DUPLICATE_DETECTION !== 'false';
const ENABLE_MONITORING = process.env.ENABLE_WEBHOOK_MONITORING !== 'false';

console.log('🚀 Initializing SPAIK Vercel Function...');
console.log(`🌍 Environment: ${NODE_ENV}`);
console.log(`🔐 Webhook secret configured: ${!!process.env.WEBHOOK_SECRET}`);

// CORS configuration for Vercel
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));

// Trust proxy for Vercel
app.set('trust proxy', 1);

// JSON parser for all routes
app.use(express.json({ limit: '10mb' }));

// In-memory storage (for serverless, consider using external storage in production)
let visualizationDataStore = [];

// Root route - API status
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    service: 'SPAIK AI Opportunity Seeker Webhook API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    endpoints: {
      webhook: '/webhook/visualization-data',
      status: '/webhook/status',
      health: '/health'
    },
    configuration: {
      secretConfigured: !!process.env.WEBHOOK_SECRET,
      timeout: WEBHOOK_TIMEOUT,
      features: {
        rateLimiting: ENABLE_RATE_LIMITING,
        duplicateDetection: ENABLE_DUPLICATE_DETECTION,
        monitoring: ENABLE_MONITORING
      }
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    webhookConfigured: !!process.env.WEBHOOK_SECRET,
    service: 'SPAIK Webhook API',
    uptime: process.uptime()
  });
});

// Enhanced webhook middleware stack
app.use('/webhook/visualization-data', 
  // Raw body parser for webhook signature verification
  express.raw({ type: ['application/json', 'text/plain', 'application/x-www-form-urlencoded'], limit: '10mb' }),
  // Request validation
  requestValidationMiddleware,
  // Enhanced logging
  webhookLoggingMiddleware,
  // Rate limiting (if enabled)
  ...(ENABLE_RATE_LIMITING ? [rateLimitMiddleware] : []),
  // Duplicate detection (if enabled)
  ...(ENABLE_DUPLICATE_DETECTION ? [duplicateDetectionMiddleware] : []),
  // Security middleware
  webhookSecurityMiddleware(WEBHOOK_SECRET),
  // Health check headers
  webhookHealthCheck,
  // Monitoring (if enabled)
  ...(ENABLE_MONITORING ? [webhookMonitoringMiddleware] : [])
);

// SPAIK Webhook Endpoint
app.post('/webhook/visualization-data', async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Set timeout for webhook processing
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          error: 'Webhook processing timeout',
          message: 'Request processing exceeded time limit',
          timeout: WEBHOOK_TIMEOUT,
          requestId: req.webhookRequestId
        });
      }
    }, WEBHOOK_TIMEOUT);

    // Parse the raw body data
    let webhookData;
    try {
      if (Buffer.isBuffer(req.body)) {
        webhookData = JSON.parse(req.body.toString());
      } else if (typeof req.body === 'string') {
        webhookData = JSON.parse(req.body);
      } else {
        webhookData = req.body;
      }
    } catch (parseError) {
      clearTimeout(timeout);
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON',
        requestId: req.webhookRequestId
      });
    }

    // Process SPAIK webhook data
    const result = processSpaikData(webhookData);

    clearTimeout(timeout);
    
    // Store the processed data
    visualizationDataStore.push(result.data);
    
    // Keep only last 100 entries to prevent memory issues
    if (visualizationDataStore.length > 100) {
      visualizationDataStore = visualizationDataStore.slice(-100);
    }

    // Enhanced logging for SPAIK data
    console.log(`[SPAIK-WEBHOOK] Created visualization: ${result.data.id}`);
    console.log(`[SPAIK-WEBHOOK] User: ${result.data.userInfo.name} (${result.data.userInfo.email})`);
    console.log(`[SPAIK-WEBHOOK] Solution Type: ${result.data.solution.type}`);
    console.log(`[SPAIK-WEBHOOK] Weekly Hours Saved: ${result.data.metrics.savings.hoursPerWeek}`);
    console.log(`[SPAIK-WEBHOOK] Yearly Cost Saved: €${result.data.metrics.savings.costPerYear}`);

    // Create enhanced response with full URLs
    const protocol = req.secure || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const baseUrl = process.env.BASE_URL || `${protocol}://${req.get('host')}`;
    const enhancedResponse = createEnhancedResponse(result, baseUrl);

    res.json(enhancedResponse);

  } catch (error) {
    console.error('[SPAIK-WEBHOOK] Processing error:', error);
    
    if (!res.headersSent) {
      res.status(400).json({
        success: false,
        error: 'SPAIK webhook processing failed',
        message: error.message,
        requestId: req.webhookRequestId,
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get visualization data by ID
app.get('/api/visualization-data/:id', (req, res) => {
  try {
    const { id } = req.params;
    const visualization = visualizationDataStore.find(item => item.id === id);
    
    if (!visualization) {
      return res.status(404).json({
        success: false,
        error: 'Visualization not found',
        message: `No visualization found with ID: ${id}`
      });
    }
    
    res.json({
      success: true,
      data: visualization
    });
  } catch (error) {
    console.error('Error retrieving visualization:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Webhook status endpoint
app.get('/webhook/status', (req, res) => {
  res.json({
    status: 'active',
    endpoint: '/webhook/visualization-data',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    configuration: {
      secretConfigured: !!process.env.WEBHOOK_SECRET,
      timeout: WEBHOOK_TIMEOUT,
      maxPayloadSize: '10MB',
      rateLimiting: ENABLE_RATE_LIMITING,
      duplicateDetection: ENABLE_DUPLICATE_DETECTION,
      monitoring: ENABLE_MONITORING
    },
    statistics: {
      totalVisualizations: visualizationDataStore.length,
      lastVisualization: visualizationDataStore.length > 0 ? 
        visualizationDataStore[visualizationDataStore.length - 1].createdAt : null
    },
    serverless: true,
    platform: 'Vercel'
  });
});

// Webhook health endpoint (alternative path)
app.get('/webhook/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SPAIK Webhook API',
    webhookConfigured: !!process.env.WEBHOOK_SECRET,
    environment: NODE_ENV,
    serverless: true
  });
});

// Enhanced error handling middleware
app.use('/webhook/visualization-data', webhookErrorHandler);

// General error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : 'An error occurred',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /health',
      webhook: 'POST /webhook/visualization-data',
      webhookStatus: 'GET /webhook/status',
      webhookHealth: 'GET /webhook/health',
      getData: 'GET /api/visualization-data/:id'
    },
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
module.exports = app;