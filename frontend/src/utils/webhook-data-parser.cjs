/**
 * Webhook Data Parser
 * Converts incoming webhook data format to internal visualization format
 */

const parseWebhookData = (webhookData) => {
  // Handle both string and object formats
  let parsedData;
  
  if (typeof webhookData === 'string') {
    parsedData = parseKeyValueString(webhookData);
  } else if (typeof webhookData === 'object' && webhookData !== null) {
    // If it's already a complete visualization object (legacy format), return as-is
    if (webhookData.recommendation && webhookData.recommendation.type) {
      return webhookData;
    }
    parsedData = webhookData;
  } else {
    throw new Error('Invalid webhook data format');
  }

  // Check if this is the new Lleverage.ai format
  if (parsedData.userId || parsedData.sessionId || parsedData.processName) {
    return parseLleverageData(parsedData);
  }

  // Extract required fields (legacy format)
  const task = parsedData.task || 'Business Process';
  const current = parsedData.current || '';
  const future = parsedData.future || '';
  const type = parsedData.type || 'generic';
  const frequency = parsedData.frequency || 'daily';

  // Parse time values
  const currentTime = parseTimeValue(current);
  const futureTime = parseTimeValue(future);

  // Generate visualization data
  const visualizationData = {
    userInfo: {
      email: parsedData.email || '',
      name: parsedData.name || '',
      company: parsedData.company || '',
      industry: parsedData.industry || ''
    },
    recommendation: {
      type: type,
      title: generateTitle(task, type),
      description: generateDescription(task, type, currentTime, futureTime),
      currentState: {
        description: generateCurrentStateDescription(task, currentTime, frequency),
        painPoints: generatePainPoints(type, currentTime),
        metrics: generateCurrentMetrics(type, currentTime, frequency)
      },
      futureState: {
        description: generateFutureStateDescription(task, futureTime, frequency),
        benefits: generateBenefits(type, futureTime),
        metrics: generateFutureMetrics(type, futureTime, frequency)
      },
      improvement: calculateImprovement(currentTime, futureTime, type, frequency),
      implementationTimeline: generateTimeline(type),
      confidence: calculateConfidence(currentTime, futureTime)
    },
    chatHistory: [],
    sessionId: parsedData.sessionId || `session_${Date.now()}`
  };

  return visualizationData;
};

const parseLleverageData = (data) => {
  // Parse Lleverage.ai format
  // Expected format: {userId, sessionId, processName, currentTime, futureTime, savingType, frequency, efficiencyGain, analysisComplete, conversationStage, responseText}
  
  // Extract and validate required fields
  const userId = data.userId || '';
  const sessionId = data.sessionId || '';
  const timestamp = data.timestamp || new Date().toISOString();
  const processName = data.processName || 'Business Process';
  const currentTime = data.currentTime || '';
  const futureTime = data.futureTime || '';
  const savingType = data.savingType || 'time_saving';
  const frequency = data.frequency || 'daily';
  const efficiencyGain = data.efficiencyGain || 0;
  const analysisComplete = data.analysisComplete || false;
  const conversationStage = data.conversationStage || 'unknown';
  const responseText = data.responseText || '';
  
  // Parse time values - handle both numeric (minutes) and string formats
  const currentTimeObj = parseTimeValue(currentTime);
  const futureTimeObj = parseTimeValue(futureTime);
  
  // Determine recommendation type based on the data
  const recommendationType = determineRecommendationType(currentTimeObj, futureTimeObj, savingType, efficiencyGain);
  
  // Generate visualization data
  const visualizationData = {
    userInfo: {
      email: '',
      name: '',
      company: '',
      industry: 'Manufacturing'
    },
    recommendation: {
      type: recommendationType,
      title: generateTitle(processName, recommendationType),
      description: generateDescription(processName, recommendationType, currentTimeObj, futureTimeObj),
      currentState: {
        description: generateCurrentStateDescription(processName, currentTimeObj, savingType),
        painPoints: generatePainPoints(recommendationType, currentTimeObj),
        metrics: generateCurrentMetrics(recommendationType, currentTimeObj, savingType)
      },
      futureState: {
        description: generateFutureStateDescription(processName, futureTimeObj, frequency),
        benefits: generateBenefits(recommendationType, futureTimeObj),
        metrics: generateFutureMetrics(recommendationType, futureTimeObj, frequency)
      },
      improvement: calculateImprovement(currentTimeObj, futureTimeObj, recommendationType, frequency, efficiencyGain),
      implementationTimeline: generateTimeline(recommendationType),
      confidence: calculateConfidence(currentTimeObj, futureTimeObj)
    },
    chatHistory: [],
    sessionId: sessionId,
    userId: userId,
    timestamp: timestamp,
    metadata: {
      source: 'lleverage-ai',
      processName: processName,
      frequency: frequency,
      efficiencyGain: efficiencyGain,
      analysisComplete: analysisComplete,
      conversationStage: conversationStage,
      responseText: responseText,
      originalData: data
    }
  };

  return visualizationData;
};

const determineRecommendationType = (currentTime, futureTime, savingType, efficiencyGain) => {
  // If savingType is provided and valid, use it
  if (savingType && ['time_saving', 'error_reduction', 'capacity_increase', 'cost_reduction', 'response_time'].includes(savingType)) {
    return savingType;
  }
  
  // Use efficiencyGain if available
  if (efficiencyGain && efficiencyGain > 0) {
    if (efficiencyGain >= 70) {
      return 'time_saving';
    } else if (efficiencyGain >= 40) {
      return 'capacity_increase';
    } else if (efficiencyGain >= 20) {
      return 'cost_reduction';
    } else {
      return 'generic';
    }
  }
  
  // Fall back to time-based calculation
  const timeSavingPercent = ((currentTime.value - futureTime.value) / currentTime.value) * 100;
  
  if (timeSavingPercent > 50) {
    return 'time_saving';
  } else if (timeSavingPercent > 20) {
    return 'capacity_increase';
  } else {
    return 'generic';
  }
};

const parseKeyValueString = (dataString) => {
  const result = {};
  const lines = dataString.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      const value = valueParts.join(':').trim();
      result[key.trim()] = value;
    }
  }
  
  return result;
};

const parseTimeValue = (timeStr) => {
  if (!timeStr && timeStr !== 0) return { value: 0, unit: 'minutes' };
  
  // Handle numeric values (assume minutes)
  if (typeof timeStr === 'number') {
    return { value: timeStr, unit: 'minutes', originalValue: timeStr, originalUnit: 'minutes' };
  }
  
  // Handle string values
  if (typeof timeStr === 'string') {
    const timeString = timeStr.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Extract number and unit
    const match = timeString.match(/(\d+(?:\.\d+)?)\s*(hour|minute|second|hr|min|sec|h|m|s)/i);
    
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2];
      
      // Convert to minutes for consistency
      if (unit.includes('hour') || unit === 'hr' || unit === 'h') {
        return { value: value * 60, unit: 'minutes', originalValue: value, originalUnit: 'hours' };
      } else if (unit.includes('minute') || unit === 'min' || unit === 'm') {
        return { value: value, unit: 'minutes', originalValue: value, originalUnit: 'minutes' };
      } else if (unit.includes('second') || unit === 'sec' || unit === 's') {
        return { value: value / 60, unit: 'minutes', originalValue: value, originalUnit: 'seconds' };
      }
    }
    
    // Try to extract just numbers (assume minutes)
    const numberMatch = timeString.match(/(\d+(?:\.\d+)?)/);
    if (numberMatch) {
      const value = parseFloat(numberMatch[1]);
      return { value: value, unit: 'minutes', originalValue: value, originalUnit: 'minutes' };
    }
  }
  
  return { value: 0, unit: 'minutes', originalValue: 0, originalUnit: 'minutes' };
};

const generateTitle = (task, type) => {
  const taskName = task.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const prefixes = {
    time_saving: 'Automate',
    error_reduction: 'Optimize',
    capacity_increase: 'Scale',
    cost_reduction: 'Streamline',
    response_time: 'Accelerate',
    generic: 'Improve'
  };
  
  return `${prefixes[type] || 'Improve'} ${taskName}`;
};

const generateDescription = (task, type, currentTime, futureTime) => {
  const taskName = task.replace(/_/g, ' ');
  const timeSaved = currentTime.value - futureTime.value;
  const timeSavedFormatted = formatTimeValue(timeSaved);
  
  const descriptions = {
    time_saving: `Implement automation for ${taskName} to save ${timeSavedFormatted} per execution`,
    error_reduction: `Optimize ${taskName} to improve accuracy and reduce errors`,
    capacity_increase: `Scale ${taskName} to handle increased volume efficiently`,
    cost_reduction: `Streamline ${taskName} to reduce operational costs`,
    response_time: `Accelerate ${taskName} to improve response times`,
    generic: `Improve ${taskName} process efficiency`
  };
  
  return descriptions[type] || descriptions.generic;
};

const generateCurrentStateDescription = (task, currentTime, frequency) => {
  const taskName = task.replace(/_/g, ' ');
  const timeFormatted = formatTimeValue(currentTime.value);
  
  return `Current ${taskName} takes ${timeFormatted} per execution, performed ${frequency}`;
};

const generateFutureStateDescription = (task, futureTime, frequency) => {
  const taskName = task.replace(/_/g, ' ');
  const timeFormatted = formatTimeValue(futureTime.value);
  
  return `Automated ${taskName} will complete in ${timeFormatted} per execution, performed ${frequency}`;
};

const generatePainPoints = (type, currentTime) => {
  const painPoints = {
    time_saving: [
      'Time-consuming manual process',
      'Repetitive work affecting productivity',
      'Delays in completion',
      'Resource allocation inefficiencies'
    ],
    error_reduction: [
      'Manual errors in processing',
      'Inconsistent quality control',
      'Time spent on error correction',
      'Customer satisfaction issues'
    ],
    capacity_increase: [
      'Limited processing capacity',
      'Bottlenecks during peak times',
      'Scalability constraints',
      'Resource limitations'
    ],
    cost_reduction: [
      'High operational costs',
      'Inefficient resource usage',
      'Manual labor expenses',
      'Process inefficiencies'
    ],
    response_time: [
      'Slow response times',
      'Customer waiting periods',
      'Delayed processing',
      'Inefficient workflows'
    ],
    generic: [
      'Current process limitations',
      'Efficiency challenges',
      'Resource constraints',
      'Scalability issues'
    ]
  };
  
  return painPoints[type] || painPoints.generic;
};

const generateBenefits = (type, futureTime) => {
  const benefits = {
    time_saving: [
      'Automated processing',
      'Reduced manual work',
      'Faster completion times',
      'Improved productivity'
    ],
    error_reduction: [
      'Consistent quality',
      'Reduced error rates',
      'Automated validation',
      'Improved accuracy'
    ],
    capacity_increase: [
      'Unlimited scalability',
      'Increased throughput',
      'Efficient resource usage',
      'Better capacity management'
    ],
    cost_reduction: [
      'Lower operational costs',
      'Reduced manual labor',
      'Efficient resource allocation',
      'Cost optimization'
    ],
    response_time: [
      'Faster response times',
      'Instant processing',
      'Improved customer experience',
      'Reduced wait times'
    ],
    generic: [
      'Process improvements',
      'Efficiency gains',
      'Better resource utilization',
      'Enhanced performance'
    ]
  };
  
  return benefits[type] || benefits.generic;
};

const generateCurrentMetrics = (type, currentTime, frequency) => {
  const metrics = {};
  
  if (type === 'time_saving' || type === 'response_time') {
    metrics.timeSpent = currentTime.originalValue;
  }
  
  // Add default values based on type
  switch (type) {
    case 'error_reduction':
      metrics.errorRate = 15;
      break;
    case 'capacity_increase':
      metrics.capacity = 100;
      break;
    case 'cost_reduction':
      metrics.cost = 800;
      break;
  }
  
  return metrics;
};

const generateFutureMetrics = (type, futureTime, frequency) => {
  const metrics = {};
  
  if (type === 'time_saving' || type === 'response_time') {
    metrics.timeSpent = futureTime.originalValue;
  }
  
  // Add default values based on type
  switch (type) {
    case 'error_reduction':
      metrics.errorRate = 2;
      break;
    case 'capacity_increase':
      metrics.capacity = 500;
      break;
    case 'cost_reduction':
      metrics.cost = 300;
      break;
  }
  
  return metrics;
};

const calculateImprovement = (currentTime, futureTime, type, frequency, efficiencyGain) => {
  const timeDiff = currentTime.value - futureTime.value;
  const percentage = efficiencyGain || Math.round((timeDiff / currentTime.value) * 100);
  
  let unit, description;
  
  switch (type) {
    case 'time_saving':
    case 'response_time':
      unit = currentTime.originalUnit;
      description = `Save ${formatTimeValue(timeDiff)} per execution`;
      break;
    case 'error_reduction':
      unit = '%';
      description = `Reduce errors by ${percentage}%`;
      break;
    case 'capacity_increase':
      unit = '%';
      description = `Increase capacity by ${percentage}%`;
      break;
    case 'cost_reduction':
      unit = '%';
      description = `Reduce costs by ${percentage}%`;
      break;
    default:
      unit = '%';
      description = `Improve efficiency by ${percentage}%`;
  }
  
  return {
    percentage: percentage,
    absoluteValue: timeDiff,
    unit: unit,
    description: description
  };
};

const formatTimeValue = (minutes) => {
  if (minutes >= 60) {
    const hours = Math.round(minutes / 60 * 10) / 10;
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    const mins = Math.round(minutes);
    return `${mins} minute${mins !== 1 ? 's' : ''}`;
  }
};

const generateTimeline = (type) => {
  const timelines = {
    time_saving: '2-4 weeks',
    error_reduction: '3-6 weeks',
    capacity_increase: '4-8 weeks',
    cost_reduction: '2-6 weeks',
    response_time: '1-3 weeks',
    generic: '2-6 weeks'
  };
  
  return timelines[type] || '2-6 weeks';
};

const calculateConfidence = (currentTime, futureTime) => {
  const ratio = futureTime.value / currentTime.value;
  
  if (ratio < 0.1) return 0.95;
  if (ratio < 0.3) return 0.85;
  if (ratio < 0.5) return 0.75;
  if (ratio < 0.7) return 0.65;
  return 0.55;
};

module.exports = {
  parseWebhookData,
  parseTimeValue,
  formatTimeValue
};