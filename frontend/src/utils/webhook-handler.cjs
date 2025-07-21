/**
 * Enhanced Webhook Handler
 * Comprehensive webhook processing with retry logic, validation, and monitoring
 */

const crypto = require('crypto');
const { parseWebhookData } = require('./webhook-data-parser.cjs');

// Webhook processing statistics
const webhookStats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  averageProcessingTime: 0,
  lastProcessingTime: 0,
  lastError: null,
  lastSuccess: null
};

/**
 * Enhanced webhook data validator
 */
const validateWebhookPayload = (payload, contentType) => {
  const errors = [];
  
  if (!payload) {
    errors.push('Payload is required');
    return { valid: false, errors };
  }
  
  // Validate content type
  if (!contentType) {
    errors.push('Content-Type header is required');
  } else if (!contentType.includes('application/json') && !contentType.includes('text/plain')) {
    errors.push('Content-Type must be application/json or text/plain');
  }
  
  // Validate payload size
  const payloadSize = Buffer.byteLength(payload);
  if (payloadSize > 10 * 1024 * 1024) { // 10MB
    errors.push('Payload size exceeds 10MB limit');
  }
  
  // Try to parse the payload
  let parsedData;
  try {
    if (contentType.includes('application/json')) {
      parsedData = JSON.parse(payload);
    } else {
      parsedData = payload.toString();
    }
  } catch (parseError) {
    errors.push(`Invalid ${contentType.includes('json') ? 'JSON' : 'text'} format: ${parseError.message}`);
    return { valid: false, errors };
  }
  
  // Validate parsed data structure
  if (typeof parsedData === 'string') {
    // String format validation
    if (!parsedData.includes('task:') && !parsedData.includes('type:')) {
      errors.push('String payload must contain at least "task:" or "type:" fields');
    }
  } else if (typeof parsedData === 'object' && parsedData !== null) {
    // Check for Lleverage.ai format
    if (parsedData.userId || parsedData.sessionId || parsedData.processName || parsedData.efficiencyGain || parsedData.analysisComplete) {
      // Lleverage.ai format validation
      if (!parsedData.processName) {
        errors.push('processName is required for Lleverage.ai format');
      }
      if (!parsedData.currentTime && !parsedData.futureTime) {
        errors.push('At least one of currentTime or futureTime is required');
      }
      // Validate numeric fields
      if (parsedData.currentTime && typeof parsedData.currentTime !== 'number' && typeof parsedData.currentTime !== 'string') {
        errors.push('currentTime must be a number or string');
      }
      if (parsedData.futureTime && typeof parsedData.futureTime !== 'number' && typeof parsedData.futureTime !== 'string') {
        errors.push('futureTime must be a number or string');
      }
      if (parsedData.efficiencyGain && typeof parsedData.efficiencyGain !== 'number') {
        errors.push('efficiencyGain must be a number');
      }
    } else {
      // Legacy object format validation
      if (!parsedData.task && !parsedData.type && !parsedData.recommendation) {
        errors.push('Object payload must contain at least "task", "type", or "recommendation" field');
      }
      
      // Validate recommendation type if present
      if (parsedData.recommendation?.type) {
        const validTypes = ['time_saving', 'error_reduction', 'capacity_increase', 'cost_reduction', 'response_time', 'generic'];
        if (!validTypes.includes(parsedData.recommendation.type)) {
          errors.push(`Invalid recommendation type. Must be one of: ${validTypes.join(', ')}`);
        }
      }
    }
  } else {
    errors.push('Payload must be a string or object');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    parsedData
  };
};

/**
 * Enhanced webhook data processor
 */
const processWebhookData = async (rawPayload, contentType, metadata = {}) => {
  const startTime = Date.now();
  
  try {
    webhookStats.totalRequests++;
    
    // Validate payload
    const validation = validateWebhookPayload(rawPayload, contentType);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    // Parse the webhook data
    const parsedData = parseWebhookData(validation.parsedData);
    
    // Generate unique ID
    if (!parsedData.id) {
      parsedData.id = generateWebhookId();
    }
    
    // Add processing metadata
    parsedData.webhook = {
      receivedAt: new Date().toISOString(),
      processingTime: Date.now() - startTime,
      contentType,
      payloadSize: Buffer.byteLength(rawPayload),
      ...metadata
    };
    
    // Validate final data structure
    const finalValidation = validateVisualizationData(parsedData);
    if (!finalValidation.valid) {
      throw new Error(`Final validation failed: ${finalValidation.errors.join(', ')}`);
    }
    
    const processingTime = Date.now() - startTime;
    
    // Update statistics
    webhookStats.successfulRequests++;
    webhookStats.lastProcessingTime = processingTime;
    webhookStats.averageProcessingTime = calculateAverageProcessingTime(processingTime);
    webhookStats.lastSuccess = new Date().toISOString();
    
    return {
      success: true,
      data: parsedData,
      processingTime,
      metadata: {
        id: parsedData.id,
        type: parsedData.recommendation?.type,
        title: parsedData.recommendation?.title
      }
    };
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    // Update error statistics
    webhookStats.failedRequests++;
    webhookStats.lastError = {
      message: error.message,
      timestamp: new Date().toISOString(),
      processingTime
    };
    
    throw error;
  }
};

/**
 * Generate unique webhook ID
 */
const generateWebhookId = () => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(4).toString('hex');
  return `webhook_${timestamp}_${randomString}`;
};

/**
 * Calculate average processing time
 */
const calculateAverageProcessingTime = (newTime) => {
  if (webhookStats.totalRequests === 1) {
    return newTime;
  }
  
  const currentAverage = webhookStats.averageProcessingTime;
  const totalRequests = webhookStats.totalRequests;
  
  return Math.round(((currentAverage * (totalRequests - 1)) + newTime) / totalRequests);
};

/**
 * Validate visualization data structure
 */
const validateVisualizationData = (data) => {
  const errors = [];
  
  if (!data.recommendation) {
    errors.push('recommendation object is required');
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
  
  const validTypes = ['time_saving', 'error_reduction', 'capacity_increase', 'cost_reduction', 'response_time', 'generic'];
  if (data.recommendation?.type && !validTypes.includes(data.recommendation.type)) {
    errors.push(`recommendation.type must be one of: ${validTypes.join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Webhook retry mechanism
 */
const retryWebhookProcessing = async (payload, contentType, metadata, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await processWebhookData(payload, contentType, {
        ...metadata,
        attempt,
        maxRetries
      });
      
      if (attempt > 1) {
        console.log(`[WEBHOOK-RETRY] Success on attempt ${attempt}/${maxRetries}`);
      }
      
      return result;
      
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`[WEBHOOK-RETRY] Attempt ${attempt}/${maxRetries} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Webhook processing failed after ${maxRetries} attempts: ${lastError.message}`);
};

/**
 * Get webhook statistics
 */
const getWebhookStats = () => ({
  ...webhookStats,
  successRate: webhookStats.totalRequests > 0 
    ? Math.round((webhookStats.successfulRequests / webhookStats.totalRequests) * 100)
    : 0,
  errorRate: webhookStats.totalRequests > 0 
    ? Math.round((webhookStats.failedRequests / webhookStats.totalRequests) * 100)
    : 0
});

/**
 * Reset webhook statistics
 */
const resetWebhookStats = () => {
  webhookStats.totalRequests = 0;
  webhookStats.successfulRequests = 0;
  webhookStats.failedRequests = 0;
  webhookStats.averageProcessingTime = 0;
  webhookStats.lastProcessingTime = 0;
  webhookStats.lastError = null;
  webhookStats.lastSuccess = null;
};

/**
 * Webhook health check
 */
const getWebhookHealth = () => {
  const stats = getWebhookStats();
  const isHealthy = stats.successRate >= 95 && stats.averageProcessingTime < 5000;
  
  return {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    statistics: stats,
    thresholds: {
      successRate: 95,
      maxProcessingTime: 5000
    }
  };
};

/**
 * Webhook monitoring alerts
 */
const checkWebhookAlerts = () => {
  const stats = getWebhookStats();
  const alerts = [];
  
  if (stats.successRate < 95 && stats.totalRequests > 10) {
    alerts.push({
      type: 'error_rate',
      severity: 'high',
      message: `Webhook success rate (${stats.successRate}%) is below 95%`,
      timestamp: new Date().toISOString()
    });
  }
  
  if (stats.averageProcessingTime > 5000) {
    alerts.push({
      type: 'slow_processing',
      severity: 'medium',
      message: `Average processing time (${stats.averageProcessingTime}ms) exceeds 5 seconds`,
      timestamp: new Date().toISOString()
    });
  }
  
  if (stats.lastError && new Date() - new Date(stats.lastError.timestamp) < 300000) { // 5 minutes
    alerts.push({
      type: 'recent_error',
      severity: 'low',
      message: `Recent error: ${stats.lastError.message}`,
      timestamp: stats.lastError.timestamp
    });
  }
  
  return alerts;
};

module.exports = {
  processWebhookData,
  retryWebhookProcessing,
  validateWebhookPayload,
  validateVisualizationData,
  generateWebhookId,
  getWebhookStats,
  resetWebhookStats,
  getWebhookHealth,
  checkWebhookAlerts
};