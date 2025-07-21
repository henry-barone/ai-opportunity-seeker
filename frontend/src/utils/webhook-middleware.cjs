/**
 * Enhanced Webhook Middleware
 * Provides rate limiting, duplicate detection, and comprehensive logging
 */

const crypto = require('crypto');

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map();
const duplicateStore = new Map();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // Max requests per window
const DUPLICATE_DETECTION_WINDOW = 10 * 60 * 1000; // 10 minutes

/**
 * Rate limiting middleware
 */
const rateLimitMiddleware = (req, res, next) => {
  const clientId = req.ip || 'unknown';
  const now = Date.now();
  
  // Clean up old entries
  rateLimitStore.forEach((data, key) => {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(key);
    }
  });
  
  // Check current client
  const clientData = rateLimitStore.get(clientId);
  
  if (!clientData) {
    rateLimitStore.set(clientId, {
      firstRequest: now,
      requestCount: 1
    });
  } else {
    if (now - clientData.firstRequest > RATE_LIMIT_WINDOW) {
      // Reset window
      rateLimitStore.set(clientId, {
        firstRequest: now,
        requestCount: 1
      });
    } else {
      clientData.requestCount++;
      if (clientData.requestCount > RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          message: `Maximum ${RATE_LIMIT_MAX_REQUESTS} requests per minute exceeded`,
          retryAfter: Math.ceil((clientData.firstRequest + RATE_LIMIT_WINDOW - now) / 1000)
        });
      }
    }
  }
  
  // Add rate limit headers
  res.set({
    'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS,
    'X-RateLimit-Remaining': Math.max(0, RATE_LIMIT_MAX_REQUESTS - (clientData?.requestCount || 1)),
    'X-RateLimit-Reset': Math.ceil((clientData?.firstRequest || now) / 1000 + RATE_LIMIT_WINDOW / 1000)
  });
  
  next();
};

/**
 * Duplicate detection middleware
 */
const duplicateDetectionMiddleware = (req, res, next) => {
  const now = Date.now();
  
  // Clean up old entries
  duplicateStore.forEach((timestamp, key) => {
    if (now - timestamp > DUPLICATE_DETECTION_WINDOW) {
      duplicateStore.delete(key);
    }
  });
  
  // Create request signature
  const requestSignature = crypto
    .createHash('sha256')
    .update(req.ip + req.body + (req.get('User-Agent') || ''))
    .digest('hex');
  
  // Check for duplicate
  const lastRequest = duplicateStore.get(requestSignature);
  
  if (lastRequest && (now - lastRequest) < DUPLICATE_DETECTION_WINDOW) {
    return res.status(202).json({
      success: true,
      duplicate: true,
      message: 'Duplicate request detected and ignored',
      originalRequestTime: new Date(lastRequest).toISOString()
    });
  }
  
  // Store current request
  duplicateStore.set(requestSignature, now);
  
  next();
};

/**
 * Enhanced webhook security middleware
 */
const webhookSecurityMiddleware = (secret) => {
  return (req, res, next) => {
    // Skip signature verification if no secret configured
    if (!secret) {
      return next();
    }
    
    const signature = req.get('X-Webhook-Signature') || req.get('X-Hub-Signature-256');
    
    // If no signature provided, log warning but allow request
    if (!signature) {
      console.warn('[WEBHOOK-SECURITY] No signature provided, allowing request without verification');
      return next();
    }
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.body)
      .digest('hex');
    
    const actualSignature = signature.replace('sha256=', '');
    
    if (!crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(actualSignature, 'hex')
    )) {
      return res.status(401).json({
        success: false,
        error: 'Invalid webhook signature',
        message: 'Signature verification failed'
      });
    }
    
    next();
  };
};

/**
 * Enhanced webhook logging middleware
 */
const webhookLoggingMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  
  // Add request ID to request object
  req.webhookRequestId = requestId;
  
  // Log incoming request
  console.log(`[WEBHOOK-${requestId}] Incoming request:`, {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentType: req.get('Content-Type'),
    contentLength: req.get('Content-Length'),
    hasSignature: !!(req.get('X-Webhook-Signature') || req.get('X-Hub-Signature-256'))
  });
  
  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(data) {
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    console.log(`[WEBHOOK-${requestId}] Response:`, {
      timestamp: new Date().toISOString(),
      statusCode: res.statusCode,
      processingTime: `${processingTime}ms`,
      success: data.success,
      error: data.error,
      message: data.message
    });
    
    return originalJson.call(this, data);
  };
  
  next();
};

/**
 * Error handling middleware for webhooks
 */
const webhookErrorHandler = (error, req, res, next) => {
  const requestId = req.webhookRequestId || 'unknown';
  
  console.error(`[WEBHOOK-${requestId}] Error:`, {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    ip: req.ip,
    url: req.url
  });
  
  // Don't send stack trace in production
  const errorResponse = {
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred processing the webhook',
    requestId: requestId
  };
  
  res.status(500).json(errorResponse);
};

/**
 * Webhook health check middleware
 */
const webhookHealthCheck = (req, res, next) => {
  // Add health check headers
  res.set({
    'X-Webhook-Status': 'healthy',
    'X-Webhook-Version': '2.0.0',
    'X-Webhook-Features': 'rate-limiting,duplicate-detection,signature-verification,logging'
  });
  
  next();
};

/**
 * Request validation middleware
 */
const requestValidationMiddleware = (req, res, next) => {
  const contentType = req.get('Content-Type');
  const contentLength = parseInt(req.get('Content-Length') || '0');
  
  // Check content type
  if (!contentType || (!contentType.includes('application/json') && !contentType.includes('text/plain'))) {
    return res.status(400).json({
      success: false,
      error: 'Invalid content type',
      message: 'Content-Type must be application/json or text/plain'
    });
  }
  
  // Check content length
  if (contentLength > 10 * 1024 * 1024) { // 10MB limit
    return res.status(413).json({
      success: false,
      error: 'Payload too large',
      message: 'Request body must be less than 10MB'
    });
  }
  
  if (contentLength === 0) {
    return res.status(400).json({
      success: false,
      error: 'Empty payload',
      message: 'Request body cannot be empty'
    });
  }
  
  next();
};

/**
 * Webhook monitoring middleware
 */
const webhookMonitoringMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Override res.json to collect metrics
  const originalJson = res.json;
  res.json = function(data) {
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    // Emit metrics (in production, send to monitoring service)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[WEBHOOK-METRICS]`, {
        timestamp: new Date().toISOString(),
        processingTime,
        statusCode: res.statusCode,
        success: data.success,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

module.exports = {
  rateLimitMiddleware,
  duplicateDetectionMiddleware,
  webhookSecurityMiddleware,
  webhookLoggingMiddleware,
  webhookErrorHandler,
  webhookHealthCheck,
  requestValidationMiddleware,
  webhookMonitoringMiddleware,
  
  // Utility functions
  clearRateLimitStore: () => rateLimitStore.clear(),
  clearDuplicateStore: () => duplicateStore.clear(),
  getRateLimitStats: () => ({
    activeClients: rateLimitStore.size,
    duplicateEntries: duplicateStore.size
  })
};