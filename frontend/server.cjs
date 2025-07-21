const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const { parseWebhookData } = require('./src/utils/webhook-data-parser.cjs');
const { 
  processWebhookData, 
  retryWebhookProcessing,
  getWebhookStats,
  getWebhookHealth,
  checkWebhookAlerts
} = require('./src/utils/webhook-handler.cjs');
const {
  validateSpaikData,
  processSpaikData,
  createEnhancedResponse
} = require('./src/utils/spaik-data-processor.cjs');
const {
  rateLimitMiddleware,
  duplicateDetectionMiddleware,
  webhookSecurityMiddleware,
  webhookLoggingMiddleware,
  webhookErrorHandler,
  webhookHealthCheck,
  requestValidationMiddleware,
  webhookMonitoringMiddleware
} = require('./src/utils/webhook-middleware.cjs');

const app = express();
const PORT = process.env.PORT || 8080;

// Webhook configuration
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-key';
const WEBHOOK_TIMEOUT = parseInt(process.env.WEBHOOK_TIMEOUT) || 30000; // 30 seconds
const ENABLE_RATE_LIMITING = process.env.ENABLE_RATE_LIMITING !== 'false';
const ENABLE_DUPLICATE_DETECTION = process.env.ENABLE_DUPLICATE_DETECTION !== 'false';
const ENABLE_MONITORING = process.env.ENABLE_WEBHOOK_MONITORING !== 'false';

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// Enhanced webhook middleware stack (only for POST requests)
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

// JSON parser for other routes
app.use(express.json({ limit: '10mb' }));

// In-memory storage for demonstration
let visualizationDataStore = [];

// Webhook security functions
const verifyWebhookSignature = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  // GitHub style signature with 'sha256=' prefix
  const actualSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(actualSignature, 'hex')
  );
};

const logWebhookRequest = (req, status, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentType: req.get('Content-Type'),
    contentLength: req.get('Content-Length'),
    signature: req.get('X-Webhook-Signature') || req.get('X-Hub-Signature-256'),
    status,
    message
  };
  
  console.log(`[WEBHOOK] ${timestamp} - ${status}: ${message}`);
  console.log(`[WEBHOOK] Details:`, logEntry);
};

// Validation function for webhook data
const validateWebhookData = (data) => {
  const errors = [];

  // For string format, check if it has basic structure
  if (typeof data === 'string') {
    if (!data.includes('task:') && !data.includes('type:')) {
      errors.push('String data must contain at least task: or type: fields');
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }

  // For object format, check required fields
  if (typeof data === 'object' && data !== null) {
    // Check for new webhook format (flat object)
    if (!data.task && !data.type && !data.recommendation) {
      errors.push('Either task, type, or recommendation field is required');
    }
    
    const validTypes = ['time_saving', 'error_reduction', 'capacity_increase', 'cost_reduction', 'response_time', 'generic'];
    
    // Check type at top level (new format)
    if (data.type && !validTypes.includes(data.type)) {
      errors.push(`type must be one of: ${validTypes.join(', ')}`);
    }
    
    // Check type in recommendation (legacy format)
    if (data.recommendation && data.recommendation.type && !validTypes.includes(data.recommendation.type)) {
      errors.push(`recommendation.type must be one of: ${validTypes.join(', ')}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  errors.push('Data must be a string or object');
  return {
    valid: false,
    errors
  };
};

// Validation function for processed visualization data
const validateVisualizationData = (data) => {
  const errors = [];

  // Required fields
  if (!data.recommendation) {
    errors.push('recommendation is required');
  } else {
    if (!data.recommendation.type) {
      errors.push('recommendation.type is required');
    }
    if (!data.recommendation.title) {
      errors.push('recommendation.title is required');
    }
    if (!data.recommendation.description) {
      errors.push('recommendation.description is required');
    }
  }

  // Validate recommendation type
  const validTypes = ['time_saving', 'error_reduction', 'capacity_increase', 'cost_reduction', 'response_time', 'generic'];
  if (data.recommendation?.type && !validTypes.includes(data.recommendation.type)) {
    errors.push(`recommendation.type must be one of: ${validTypes.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// API Routes

// POST /webhook/visualization-data - SPAIK AI Opportunity Seeker webhook endpoint
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
    console.log(`[SPAIK-WEBHOOK] Solution Title: ${result.data.solution.title}`);
    console.log(`[SPAIK-WEBHOOK] Weekly Hours Saved: ${result.data.metrics.savings.hoursPerWeek}`);
    console.log(`[SPAIK-WEBHOOK] Yearly Cost Saved: €${result.data.metrics.savings.costPerYear}`);
    console.log(`[SPAIK-WEBHOOK] ROI Break-even: ${result.data.metrics.roi.breakEvenWeeks} weeks`);

    // Create enhanced response with full URLs
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
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

// POST /api/visualization-data - Receive visualization data (legacy endpoint)
app.post('/api/visualization-data', (req, res) => {
  try {
    const data = req.body;
    
    // Validate the data
    const validation = validateVisualizationData(data);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    // Generate ID if not provided
    if (!data.id) {
      data.id = `vis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Add timestamp if not provided
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }

    // Store the data
    visualizationDataStore.push(data);
    
    // Keep only last 100 entries to prevent memory issues
    if (visualizationDataStore.length > 100) {
      visualizationDataStore = visualizationDataStore.slice(-100);
    }

    console.log(`Received visualization data: ${data.id}`);
    console.log(`Type: ${data.recommendation.type}`);
    console.log(`Title: ${data.recommendation.title}`);

    res.json({
      success: true,
      id: data.id,
      message: 'Visualization data received successfully'
    });

  } catch (error) {
    console.error('Error processing visualization data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET /api/visualization-data/:id - Retrieve visualization data by ID
app.get('/api/visualization-data/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = visualizationDataStore.find(item => item.id === id);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Visualization data not found'
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Error retrieving visualization data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET /api/visualization-data - Get all visualization data (for admin/testing)
app.get('/api/visualization-data', (req, res) => {
  try {
    res.json({
      success: true,
      data: visualizationDataStore,
      count: visualizationDataStore.length
    });
  } catch (error) {
    console.error('Error retrieving all visualization data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// DELETE /api/visualization-data - Clear all data (for testing)
app.delete('/api/visualization-data', (req, res) => {
  try {
    visualizationDataStore = [];
    res.json({
      success: true,
      message: 'All visualization data cleared'
    });
  } catch (error) {
    console.error('Error clearing visualization data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Enhanced webhook status endpoint
app.get('/webhook/status', (req, res) => {
  const stats = getWebhookStats();
  const health = getWebhookHealth();
  const alerts = checkWebhookAlerts();
  
  res.json({
    status: health.status,
    endpoint: '/webhook/visualization-data',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    configuration: {
      secretConfigured: !!WEBHOOK_SECRET,
      timeout: WEBHOOK_TIMEOUT,
      maxPayloadSize: '10MB',
      rateLimitingEnabled: ENABLE_RATE_LIMITING,
      duplicateDetectionEnabled: ENABLE_DUPLICATE_DETECTION,
      monitoringEnabled: ENABLE_MONITORING
    },
    statistics: {
      totalVisualizations: visualizationDataStore.length,
      lastVisualization: visualizationDataStore.length > 0 ? 
        visualizationDataStore[visualizationDataStore.length - 1].timestamp : null,
      ...stats
    },
    health: {
      status: health.status,
      alerts: alerts.length,
      activeAlerts: alerts
    }
  });
});

// Webhook statistics endpoint
app.get('/webhook/stats', (req, res) => {
  res.json(getWebhookStats());
});

// Webhook health endpoint
app.get('/webhook/health', (req, res) => {
  const health = getWebhookHealth();
  res.status(health.status === 'healthy' ? 200 : 503).json(health);
});

// Webhook alerts endpoint
app.get('/webhook/alerts', (req, res) => {
  res.json({
    alerts: checkWebhookAlerts(),
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    dataCount: visualizationDataStore.length,
    webhook: {
      status: 'active',
      endpoint: '/webhook/visualization-data'
    }
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Enhanced error handling middleware
app.use('/webhook/visualization-data', webhookErrorHandler);

// General error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/visualization-data`);
  console.log(`Webhook status: http://localhost:${PORT}/webhook/status`);
  console.log(`API endpoint: http://localhost:${PORT}/api/visualization-data`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Webhook secret configured: ${!!WEBHOOK_SECRET}`);
});