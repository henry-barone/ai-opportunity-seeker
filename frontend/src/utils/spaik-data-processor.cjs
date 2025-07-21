/**
 * SPAIK AI Opportunity Seeker - Webhook Data Processor
 * Processes incoming webhook data from Voiceflow chatbot for visualization
 */

const crypto = require('crypto');

// Constants
const HOURLY_RATE = 150; // €150 per hour default
const IMPLEMENTATION_COST = 5000; // €5000 default implementation cost
const HOURS_PER_WEEK = 40; // Standard work week
const WEEKS_PER_MONTH = 4.33; // Average weeks per month
const WEEKS_PER_YEAR = 52; // Weeks per year

/**
 * Enhanced validation for SPAIK webhook data
 */
function validateSpaikData(data) {
  const errors = [];

  // Check basic structure
  if (!data || typeof data !== 'object') {
    errors.push('Data must be a valid object');
    return { valid: false, errors };
  }

  // Validate userInfo
  if (!data.userInfo) {
    errors.push('userInfo is required');
  } else {
    if (!data.userInfo.name) errors.push('userInfo.name is required');
    if (!data.userInfo.email) errors.push('userInfo.email is required');
    if (data.userInfo.email && !isValidEmail(data.userInfo.email)) {
      errors.push('userInfo.email must be a valid email address');
    }
  }

  // Validate recommendation
  if (!data.recommendation) {
    errors.push('recommendation is required');
  } else {
    const rec = data.recommendation;
    
    // Required fields
    if (!rec.type) {
      errors.push('recommendation.type is required');
    } else {
      const validTypes = ['time_saving', 'cost_reduction', 'quality_improvement'];
      if (!validTypes.includes(rec.type)) {
        errors.push(`recommendation.type must be one of: ${validTypes.join(', ')}`);
      }
    }
    
    if (!rec.title) errors.push('recommendation.title is required');
    if (!rec.description) errors.push('recommendation.description is required');
    
    // Validate currentState
    if (!rec.currentState) {
      errors.push('recommendation.currentState is required');
    } else if (!rec.currentState.metrics) {
      errors.push('recommendation.currentState.metrics is required');
    } else {
      const current = rec.currentState.metrics;
      if (!current.timeSpent || current.timeSpent <= 0) {
        errors.push('recommendation.currentState.metrics.timeSpent must be a positive number');
      }
    }
    
    // Validate futureState
    if (!rec.futureState) {
      errors.push('recommendation.futureState is required');
    } else if (!rec.futureState.metrics) {
      errors.push('recommendation.futureState.metrics is required');
    } else {
      const future = rec.futureState.metrics;
      if (!future.timeSpent || future.timeSpent < 0) {
        errors.push('recommendation.futureState.metrics.timeSpent must be a non-negative number');
      }
    }
    
    // Cross-validation
    if (rec.currentState?.metrics?.timeSpent && rec.futureState?.metrics?.timeSpent) {
      if (rec.futureState.metrics.timeSpent >= rec.currentState.metrics.timeSpent) {
        errors.push('Future time spent must be less than current time spent');
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Calculate comprehensive metrics for visualization
 */
function calculateMetrics(currentMetrics, futureMetrics, improvement) {
  const current = {
    hoursPerWeek: currentMetrics.timeSpent,
    hoursPerMonth: Math.round(currentMetrics.timeSpent * WEEKS_PER_MONTH * 100) / 100,
    hoursPerYear: Math.round(currentMetrics.timeSpent * WEEKS_PER_YEAR * 100) / 100
  };

  const future = {
    hoursPerWeek: futureMetrics.timeSpent,
    hoursPerMonth: Math.round(futureMetrics.timeSpent * WEEKS_PER_MONTH * 100) / 100,
    hoursPerYear: Math.round(futureMetrics.timeSpent * WEEKS_PER_YEAR * 100) / 100
  };

  const savings = {
    hoursPerWeek: Math.round((current.hoursPerWeek - future.hoursPerWeek) * 100) / 100,
    hoursPerMonth: Math.round((current.hoursPerMonth - future.hoursPerMonth) * 100) / 100,
    hoursPerYear: Math.round((current.hoursPerYear - future.hoursPerYear) * 100) / 100
  };

  // Calculate costs - use provided costs or calculate from hours
  if (currentMetrics.cost && futureMetrics.cost) {
    // Use provided cost data
    current.costPerWeek = currentMetrics.cost;
    current.costPerMonth = Math.round(currentMetrics.cost * WEEKS_PER_MONTH * 100) / 100;
    current.costPerYear = Math.round(currentMetrics.cost * WEEKS_PER_YEAR * 100) / 100;
    
    future.costPerWeek = futureMetrics.cost;
    future.costPerMonth = Math.round(futureMetrics.cost * WEEKS_PER_MONTH * 100) / 100;
    future.costPerYear = Math.round(futureMetrics.cost * WEEKS_PER_YEAR * 100) / 100;
  } else {
    // Calculate from hours using default rate
    current.costPerWeek = Math.round(current.hoursPerWeek * HOURLY_RATE * 100) / 100;
    current.costPerMonth = Math.round(current.hoursPerMonth * HOURLY_RATE * 100) / 100;
    current.costPerYear = Math.round(current.hoursPerYear * HOURLY_RATE * 100) / 100;
    
    future.costPerWeek = Math.round(future.hoursPerWeek * HOURLY_RATE * 100) / 100;
    future.costPerMonth = Math.round(future.hoursPerMonth * HOURLY_RATE * 100) / 100;
    future.costPerYear = Math.round(future.hoursPerYear * HOURLY_RATE * 100) / 100;
  }

  savings.costPerWeek = Math.round((current.costPerWeek - future.costPerWeek) * 100) / 100;
  savings.costPerMonth = Math.round((current.costPerMonth - future.costPerMonth) * 100) / 100;
  savings.costPerYear = Math.round((current.costPerYear - future.costPerYear) * 100) / 100;

  // Calculate percentage improvement
  savings.percentage = improvement?.percentage || 
    Math.round(((current.hoursPerWeek - future.hoursPerWeek) / current.hoursPerWeek) * 100);

  // Calculate ROI
  const weeklyManagingSavings = savings.costPerWeek;
  const roi = {
    implementationCost: IMPLEMENTATION_COST,
    breakEvenWeeks: weeklyManagingSavings > 0 ? 
      Math.ceil(IMPLEMENTATION_COST / weeklyManagingSavings) : null,
    yearOneROI: savings.costPerYear > 0 ? 
      Math.round(((savings.costPerYear - IMPLEMENTATION_COST) / IMPLEMENTATION_COST) * 100) : null
  };

  return {
    current,
    future,
    savings,
    roi
  };
}

/**
 * Generate visual configuration based on recommendation type
 */
function generateVisualConfig(type) {
  const configs = {
    time_saving: {
      theme: 'blue',
      icon: 'clock',
      chartType: 'savings'
    },
    cost_reduction: {
      theme: 'green',
      icon: 'dollar-sign',
      chartType: 'cost'
    },
    quality_improvement: {
      theme: 'purple',
      icon: 'trending-up',
      chartType: 'quality'
    }
  };

  return configs[type] || configs.time_saving;
}

/**
 * Process SPAIK webhook data into visualization format
 */
function processSpaikData(rawData) {
  const startTime = Date.now();
  
  // Validate the data
  const validation = validateSpaikData(rawData);
  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }

  const { userInfo, recommendation } = rawData;
  
  // Generate unique ID
  const timestamp = Date.now();
  const randomPart = crypto.randomBytes(6).toString('hex');
  const id = `vis_${timestamp}_${randomPart}`;

  // Calculate comprehensive metrics
  const metrics = calculateMetrics(
    recommendation.currentState.metrics,
    recommendation.futureState.metrics,
    recommendation.improvement
  );

  // Generate visual configuration
  const visualConfig = generateVisualConfig(recommendation.type);

  // Build processed data structure
  const processedData = {
    id,
    userInfo: {
      name: userInfo.name.trim(),
      email: userInfo.email.toLowerCase().trim()
    },
    solution: {
      type: recommendation.type,
      title: recommendation.title.trim(),
      description: recommendation.description.trim()
    },
    metrics,
    visualConfig,
    createdAt: new Date().toISOString(),
    originalData: rawData // Keep for debugging
  };

  const processingTime = Date.now() - startTime;

  return {
    success: true,
    data: processedData,
    processingTime,
    metadata: {
      validation: validation,
      calculatedFields: [
        'metrics.current.hoursPerMonth',
        'metrics.current.hoursPerYear',
        'metrics.current.costPerWeek',
        'metrics.current.costPerMonth',
        'metrics.current.costPerYear',
        'metrics.future.hoursPerMonth',
        'metrics.future.hoursPerYear',
        'metrics.future.costPerWeek',
        'metrics.future.costPerMonth',
        'metrics.future.costPerYear',
        'metrics.savings.*',
        'metrics.roi.*',
        'visualConfig.*'
      ]
    }
  };
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Create enhanced response with full URLs
 */
function createEnhancedResponse(processedResult, baseUrl = 'https://spaik.io') {
  const { data, processingTime } = processedResult;
  
  return {
    success: true,
    id: data.id,
    viewUrl: `/visualization/${data.id}`,
    fullUrl: `${baseUrl}/visualization/${data.id}`,
    processingTime,
    metrics: {
      weeklyHoursSaved: data.metrics.savings.hoursPerWeek,
      yearlyHoursSaved: data.metrics.savings.hoursPerYear,
      weeklyCostSaved: data.metrics.savings.costPerWeek,
      yearlyCostSaved: data.metrics.savings.costPerYear,
      improvementPercentage: data.metrics.savings.percentage,
      breakEvenWeeks: data.metrics.roi.breakEvenWeeks,
      yearOneROI: data.metrics.roi.yearOneROI
    },
    message: 'SPAIK opportunity data processed successfully',
    solutionType: data.solution.type,
    solutionTitle: data.solution.title
  };
}

module.exports = {
  validateSpaikData,
  calculateMetrics,
  generateVisualConfig,
  processSpaikData,
  createEnhancedResponse,
  HOURLY_RATE,
  IMPLEMENTATION_COST
};