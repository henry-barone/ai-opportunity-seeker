/**
 * Enhanced Vercel Serverless Function for SPAIK AI Opportunity Seeker
 * Handles webhook endpoints and data persistence for frontend integration
 */

// Simple in-memory storage for demonstration (use external storage for production)
const dataStore = new Map();

// Helper function to generate visualization ID
function generateVisualizationId() {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `vis_${timestamp}_${randomPart}`;
}

// Helper function to process simplified SPAIK data format
function processSimplifiedSpaikData(rawData) {
  const startTime = Date.now();

  // Validate required fields for simplified format
  if (!rawData.processName || typeof rawData.processName !== 'string') {
    throw new Error('processName is required and must be a string');
  }

  if (typeof rawData.currentTime !== 'number' || rawData.currentTime <= 0) {
    throw new Error('currentTime must be a positive number (minutes per week)');
  }

  if (typeof rawData.futureTime !== 'number' || rawData.futureTime < 0) {
    throw new Error('futureTime must be a non-negative number (minutes per week)');
  }

  if (rawData.futureTime >= rawData.currentTime) {
    throw new Error('futureTime must be less than currentTime');
  }

  const id = generateVisualizationId();

  // Convert minutes to hours for calculations
  const currentHours = rawData.currentTime / 60;
  const futureHours = rawData.futureTime / 60;
  const hoursSaved = currentHours - futureHours;
  const minutesSaved = rawData.currentTime - rawData.futureTime;

  // Parse efficiency gain percentage
  let improvementPercentage;
  if (rawData.efficiencyGain && typeof rawData.efficiencyGain === 'string') {
    improvementPercentage = parseInt(rawData.efficiencyGain.replace('%', ''));
  } else {
    improvementPercentage = Math.round((hoursSaved / currentHours) * 100);
  }

  // Calculate costs (€150/hour default)
  const hourlyRate = 150;
  const weeklyCostSaved = hoursSaved * hourlyRate;
  const yearlyCostSaved = weeklyCostSaved * 52;

  // Map savingType to our standard types
  const typeMap = {
    'time_saving': 'time_saving',
    'cost_reduction': 'cost_reduction', 
    'quality_improvement': 'quality_improvement',
    'error_reduction': 'error_reduction',
    'capacity_increase': 'capacity_increase'
  };
  const standardType = typeMap[rawData.savingType] || 'time_saving';

  // Create visualization data structure
  const visualizationData = {
    id,
    timestamp: new Date().toISOString(),
    userInfo: {
      name: rawData.userName || 'SPAIK User',
      email: rawData.userEmail || 'user@spaik.io',
      company: rawData.company || '',
      industry: rawData.industry || ''
    },
    recommendation: {
      type: standardType,
      title: rawData.processName,
      description: rawData.responseText || `Automated ${rawData.processName} process to improve efficiency`,
      currentState: {
        description: `Currently spending ${rawData.currentTime} minutes ${rawData.frequency || 'weekly'} on ${rawData.processName}`,
        painPoints: [
          'Time-consuming manual process',
          'Repetitive tasks requiring human intervention', 
          'Potential for human error',
          'Resource bottlenecks during peak times'
        ],
        metrics: {
          timeSpent: currentHours,
          errorRate: 10, // Default assumption
          cost: currentHours * hourlyRate
        }
      },
      futureState: {
        description: `Automated process reducing time to ${rawData.futureTime} minutes ${rawData.frequency || 'weekly'}`,
        benefits: [
          'Automated processing with minimal human intervention',
          'Consistent and reliable results',
          'Improved customer experience',
          'Scalable solution for growing business'
        ],
        metrics: {
          timeSpent: futureHours,
          errorRate: 2, // Improved with automation
          cost: futureHours * hourlyRate
        }
      },
      improvement: {
        percentage: improvementPercentage,
        absoluteValue: hoursSaved,
        unit: 'hours',
        description: `Save ${Math.round(minutesSaved)} minutes ${rawData.frequency || 'weekly'}`
      },
      implementationTimeline: '2-4 weeks',
      confidence: rawData.analysisComplete ? 0.9 : 0.8
    },
    chatHistory: rawData.responseText ? [rawData.responseText] : [],
    sessionId: id,
    
    // Store original simplified data
    originalData: rawData,
    dataFormat: 'simplified',

    // Add enhanced metrics for frontend
    calculatedMetrics: {
      weeklySavings: {
        hours: hoursSaved,
        minutes: minutesSaved,
        cost: weeklyCostSaved
      },
      yearlySavings: {
        hours: hoursSaved * 52,
        minutes: minutesSaved * 52,
        cost: yearlyCostSaved
      },
      roi: {
        implementationCost: 5000,
        breakEvenWeeks: weeklyCostSaved > 0 ? Math.ceil(5000 / weeklyCostSaved) : null,
        yearOneROI: yearlyCostSaved > 0 ? Math.round(((yearlyCostSaved - 5000) / 5000) * 100) : null
      }
    }
  };

  const processingTime = Date.now() - startTime;

  // Store the data
  dataStore.set(id, visualizationData);

  return {
    success: true,
    data: visualizationData,
    processingTime
  };
}

// Helper function to process SPAIK data (supports multiple formats)
function processSpaikData(rawData) {
  const startTime = Date.now();
  
  // Check if this is the new simplified format
  if (rawData.processName && rawData.currentTime && rawData.futureTime) {
    return processSimplifiedSpaikData(rawData);
  }

  // Validate required fields for legacy format
  if (!rawData.userInfo || !rawData.userInfo.name || !rawData.userInfo.email) {
    throw new Error('userInfo with name and email is required');
  }

  if (!rawData.recommendation || !rawData.recommendation.type || !rawData.recommendation.title) {
    throw new Error('recommendation with type and title is required');
  }

  const { userInfo, recommendation } = rawData;
  const id = generateVisualizationId();

  // Calculate metrics
  const currentHours = recommendation.currentState?.metrics?.timeSpent || 10;
  const futureHours = recommendation.futureState?.metrics?.timeSpent || 2;
  const hoursSaved = currentHours - futureHours;
  const improvementPercentage = Math.round((hoursSaved / currentHours) * 100);

  // Calculate costs (€150/hour default)
  const hourlyRate = 150;
  const weeklyCostSaved = hoursSaved * hourlyRate;
  const yearlyCostSaved = weeklyCostSaved * 52;

  // Create visualization data structure
  const visualizationData = {
    id,
    timestamp: new Date().toISOString(),
    userInfo: {
      name: userInfo.name,
      email: userInfo.email,
      company: userInfo.company || '',
      industry: userInfo.industry || ''
    },
    recommendation: {
      type: recommendation.type,
      title: recommendation.title,
      description: recommendation.description || 'AI-powered process improvement',
      currentState: {
        description: recommendation.currentState?.description || `Currently spending ${currentHours} hours per week on manual processes`,
        painPoints: recommendation.currentState?.painPoints || ['Time-consuming manual work', 'High error rates', 'Resource bottlenecks'],
        metrics: {
          timeSpent: currentHours,
          errorRate: recommendation.currentState?.metrics?.errorRate || 10,
          cost: recommendation.currentState?.metrics?.cost || currentHours * hourlyRate
        }
      },
      futureState: {
        description: recommendation.futureState?.description || `Automated process reducing time to ${futureHours} hours per week`,
        benefits: recommendation.futureState?.benefits || ['Automated processing', 'Reduced errors', 'Improved efficiency'],
        metrics: {
          timeSpent: futureHours,
          errorRate: recommendation.futureState?.metrics?.errorRate || 2,
          cost: recommendation.futureState?.metrics?.cost || futureHours * hourlyRate
        }
      },
      improvement: {
        percentage: improvementPercentage,
        absoluteValue: hoursSaved,
        unit: 'hours',
        description: `Save ${hoursSaved} hours per week`
      },
      implementationTimeline: recommendation.implementationTimeline || '2-4 weeks',
      confidence: recommendation.confidence || 0.85
    },
    chatHistory: recommendation.chatHistory || [],
    sessionId: recommendation.sessionId || id,
    // Add enhanced metrics for frontend
    calculatedMetrics: {
      weeklySavings: {
        hours: hoursSaved,
        cost: weeklyCostSaved
      },
      yearlySavings: {
        hours: hoursSaved * 52,
        cost: yearlyCostSaved
      },
      roi: {
        implementationCost: 5000,
        breakEvenWeeks: Math.ceil(5000 / weeklyCostSaved),
        yearOneROI: Math.round(((yearlyCostSaved - 5000) / 5000) * 100)
      }
    }
  };

  const processingTime = Date.now() - startTime;

  // Store the data
  dataStore.set(id, visualizationData);

  return {
    success: true,
    data: visualizationData,
    processingTime
  };
}

export default async function handler(req, res) {
  // Enhanced CORS headers for frontend integration and Voiceflow
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Webhook-Signature, User-Agent');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Ensure JSON response content type (critical for Voiceflow)
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // Add headers that help with webhook response parsing
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url } = req;
  console.log(`[API] ${method} ${url}`);

  try {
    // Root endpoint - API information
    if (method === 'GET' && url === '/') {
      return res.status(200).json({
        success: true,
        service: 'SPAIK AI Opportunity Seeker API',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
          webhook: 'POST /webhook/visualization-data',
          getData: 'GET /api/visualization-data/:id',
          health: 'GET /health',
          status: 'GET /webhook/status',
          testData: 'GET /api/test-data'
        },
        storedVisualizations: dataStore.size
      });
    }

    // Health check endpoint
    if (method === 'GET' && url === '/health') {
      return res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'SPAIK Webhook API',
        dataStore: {
          size: dataStore.size,
          maxSize: 100
        }
      });
    }

    // Webhook status endpoint
    if (method === 'GET' && url === '/webhook/status') {
      return res.status(200).json({
        status: 'active',
        endpoint: '/webhook/visualization-data',
        timestamp: new Date().toISOString(),
        configuration: {
          secretConfigured: !!process.env.WEBHOOK_SECRET,
          maxPayloadSize: '10MB'
        },
        statistics: {
          totalVisualizations: dataStore.size,
          lastVisualization: dataStore.size > 0 ? 
            Array.from(dataStore.values()).pop().timestamp : null
        }
      });
    }

    // Get visualization data by ID
    if (method === 'GET' && url.startsWith('/api/visualization-data/')) {
      const id = url.split('/').pop();
      const visualization = dataStore.get(id);

      if (!visualization) {
        return res.status(404).json({
          success: false,
          error: 'Visualization not found',
          message: `No visualization found with ID: ${id}`,
          availableIds: Array.from(dataStore.keys()).slice(-5) // Last 5 IDs for debugging
        });
      }

      return res.status(200).json({
        success: true,
        data: visualization
      });
    }

    // Test data endpoint - for development/testing
    if (method === 'GET' && url === '/api/test-data') {
      const testId = generateVisualizationId();
      const testData = {
        userInfo: {
          name: "Test User",
          email: "test@example.com"
        },
        recommendation: {
          type: "time_saving",
          title: "Test Process Automation",
          description: "Automated testing process",
          currentState: {
            metrics: { timeSpent: 8 }
          },
          futureState: {
            metrics: { timeSpent: 2 }
          }
        }
      };

      const result = processSpaikData(testData);
      
      return res.status(200).json({
        success: true,
        message: 'Test visualization created',
        id: result.data.id,
        viewUrl: `/visualization/${result.data.id}`,
        data: result.data
      });
    }

    // Simple test endpoint for Voiceflow debugging
    if (method === 'POST' && url === '/test-voiceflow') {
      console.log('[VOICEFLOW-TEST] Request received from:', req.headers['user-agent'] || 'Unknown');
      console.log('[VOICEFLOW-TEST] Body:', JSON.stringify(req.body, null, 2));
      
      const testResponse = {
        success: true,
        message: "Hello from SPAIK API!",
        timestamp: new Date().toISOString(),
        testId: `test_${Date.now()}`,
        echo: req.body || "no data received"
      };
      
      console.log('[VOICEFLOW-TEST] Sending response:', JSON.stringify(testResponse, null, 2));
      return res.status(200).json(testResponse);
    }

    // Main webhook endpoint
    if (method === 'POST' && url === '/webhook/visualization-data') {
      const rawData = req.body;
      
      // Enhanced logging for Voiceflow debugging
      console.log(`[WEBHOOK] Request from: ${req.headers['user-agent'] || 'Unknown User Agent'}`);
      console.log(`[WEBHOOK] Content-Type: ${req.headers['content-type'] || 'Not Set'}`);
      console.log(`[WEBHOOK] Raw body type: ${typeof rawData}`);
      console.log(`[WEBHOOK] Raw body: ${JSON.stringify(rawData, null, 2)}`);

      if (!rawData) {
        const errorResponse = {
          success: false,
          error: 'No data provided',
          message: 'Request body is required',
          received: rawData,
          timestamp: new Date().toISOString()
        };
        console.log(`[WEBHOOK] Error response: ${JSON.stringify(errorResponse)}`);
        return res.status(400).json(errorResponse);
      }

      // Process the SPAIK data
      const result = processSpaikData(rawData);

      console.log(`[WEBHOOK] Successfully created visualization: ${result.data.id}`);
      console.log(`[WEBHOOK] User: ${result.data.userInfo.name} (${result.data.userInfo.email})`);
      console.log(`[WEBHOOK] Type: ${result.data.recommendation.type}`);
      console.log(`[WEBHOOK] Hours saved: ${result.data.calculatedMetrics.weeklySavings.hours}/week`);

      // Create Voiceflow-optimized response
      const voiceflowResponse = {
        success: true,
        id: result.data.id,
        message: 'SPAIK opportunity data processed successfully',
        processingTime: result.processingTime,
        viewUrl: `/visualization/${result.data.id}`,
        fullUrl: `${process.env.BASE_URL || 'https://ai-opportunity-seeker.vercel.app'}/visualization/${result.data.id}`,
        
        // Simple fields for easy Voiceflow access
        visualizationId: result.data.id,
        solutionType: result.data.recommendation.type,
        solutionTitle: result.data.recommendation.title,
        weeklyHoursSaved: result.data.calculatedMetrics.weeklySavings.hours,
        yearlyCostSaved: result.data.calculatedMetrics.yearlySavings.cost,
        improvementPercentage: result.data.recommendation.improvement.percentage,
        
        // Detailed metrics for advanced use
        metrics: {
          weeklyHoursSaved: result.data.calculatedMetrics.weeklySavings.hours,
          yearlyHoursSaved: result.data.calculatedMetrics.yearlySavings.hours,
          weeklyCostSaved: result.data.calculatedMetrics.weeklySavings.cost,
          yearlyCostSaved: result.data.calculatedMetrics.yearlySavings.cost,
          improvementPercentage: result.data.recommendation.improvement.percentage,
          breakEvenWeeks: result.data.calculatedMetrics.roi.breakEvenWeeks,
          yearOneROI: result.data.calculatedMetrics.roi.yearOneROI
        },
        
        // Timestamp for debugging
        timestamp: new Date().toISOString()
      };
      
      console.log(`[WEBHOOK] Voiceflow response: ${JSON.stringify(voiceflowResponse, null, 2)}`);
      return res.status(200).json(voiceflowResponse);
    }

    // Simple webhook endpoint with minimal response (for Voiceflow troubleshooting)
    if (method === 'POST' && url === '/webhook/simple') {
      const rawData = req.body;
      
      console.log(`[SIMPLE-WEBHOOK] Request from: ${req.headers['user-agent'] || 'Unknown'}`);
      console.log(`[SIMPLE-WEBHOOK] Body: ${JSON.stringify(rawData, null, 2)}`);

      if (!rawData || !rawData.userInfo || !rawData.recommendation) {
        const simpleError = {
          success: false,
          error: "Missing required data"
        };
        console.log(`[SIMPLE-WEBHOOK] Error: ${JSON.stringify(simpleError)}`);
        return res.status(400).json(simpleError);
      }

      // Process data and create simple response
      const result = processSpaikData(rawData);
      
      // Return ultra-simple response
      const simpleResponse = {
        success: true,
        id: result.data.id,
        title: result.data.recommendation.title,
        type: result.data.recommendation.type,
        hoursSaved: result.data.calculatedMetrics.weeklySavings.hours,
        costSaved: result.data.calculatedMetrics.yearlySavings.cost,
        improvement: result.data.recommendation.improvement.percentage,
        url: `https://ai-opportunity-seeker.vercel.app/visualization/${result.data.id}`
      };
      
      console.log(`[SIMPLE-WEBHOOK] Simple response: ${JSON.stringify(simpleResponse)}`);
      return res.status(200).json(simpleResponse);
    }

    // List all visualizations (for debugging)
    if (method === 'GET' && url === '/api/visualizations') {
      const visualizations = Array.from(dataStore.entries()).map(([id, data]) => ({
        id,
        title: data.recommendation.title,
        type: data.recommendation.type,
        user: data.userInfo.name,
        timestamp: data.timestamp,
        viewUrl: `/visualization/${id}`
      }));

      return res.status(200).json({
        success: true,
        count: visualizations.length,
        visualizations: visualizations.slice(-10) // Last 10 for performance
      });
    }

    // 404 for unknown endpoints
    return res.status(404).json({
      success: false,
      error: 'Endpoint not found',
      message: `Route ${method} ${url} not found`,
      availableEndpoints: {
        root: 'GET /',
        health: 'GET /health',
        webhook: 'POST /webhook/visualization-data',
        getData: 'GET /api/visualization-data/:id',
        testData: 'GET /api/test-data',
        testVoiceflow: 'POST /test-voiceflow',
        simpleWebhook: 'POST /webhook/simple',
        listAll: 'GET /api/visualizations'
      }
    });

  } catch (error) {
    console.error('[API] Error:', error);

    return res.status(400).json({
      success: false,
      error: 'Request processing failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}