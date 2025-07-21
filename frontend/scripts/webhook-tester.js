#!/usr/bin/env node

/**
 * Comprehensive Webhook Testing Script
 * Tests webhook functionality with various scenarios and edge cases
 */

const crypto = require('crypto');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Configuration
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3001/webhook/visualization-data';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-key';
const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS) || 5;

// Test results storage
const testResults = {
  summary: {
    totalTests: 0,
    passed: 0,
    failed: 0,
    startTime: new Date().toISOString(),
    endTime: null
  },
  tests: []
};

// Helper functions
const generateSignature = (payload, secret) => {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
};

const logTest = (testName, success, details = {}) => {
  const result = {
    testName,
    success,
    timestamp: new Date().toISOString(),
    ...details
  };
  
  testResults.tests.push(result);
  testResults.summary.totalTests++;
  
  if (success) {
    testResults.summary.passed++;
    console.log(`✅ ${testName}`);
  } else {
    testResults.summary.failed++;
    console.log(`❌ ${testName}: ${details.error || 'Unknown error'}`);
  }
  
  if (details.responseTime) {
    console.log(`   Response time: ${details.responseTime}ms`);
  }
};

const sendWebhookRequest = async (payload, headers = {}) => {
  const startTime = Date.now();
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'webhook-tester/1.0.0',
        ...headers
      },
      body: payload
    });
    
    const responseTime = Date.now() - startTime;
    const responseData = await response.json();
    
    return {
      success: response.ok,
      statusCode: response.status,
      responseTime,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries())
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      responseTime: Date.now() - startTime
    };
  }
};

// Test data
const testData = {
  validJSON: {
    userInfo: {
      email: "test@example.com",
      name: "John Doe",
      company: "Test Corp"
    },
    recommendation: {
      type: "time_saving",
      title: "Automated Testing",
      description: "Implement automated testing to reduce manual effort",
      currentState: {
        description: "Manual testing taking 4 hours daily",
        metrics: { timeSpent: 4 }
      },
      futureState: {
        description: "Automated testing reducing time to 1 hour",
        metrics: { timeSpent: 1 }
      },
      improvement: {
        percentage: 75,
        absoluteValue: 3,
        unit: "hours",
        description: "Save 3 hours per day"
      },
      implementationTimeline: "2-3 weeks",
      confidence: 0.85
    }
  },
  
  validStringFormat: `task:document_processing
current:2_hours
future:30_minutes
type:time_saving
frequency:daily`,
  
  invalidJSON: '{"invalid": json}',
  
  emptyPayload: '',
  
  largePayload: JSON.stringify({
    userInfo: { email: "test@example.com" },
    recommendation: {
      type: "time_saving",
      title: "Large Data Test",
      description: "A".repeat(1000000) // 1MB of data
    }
  }),
  
  invalidType: {
    recommendation: {
      type: "invalid_type",
      title: "Invalid Type Test",
      description: "Testing with invalid recommendation type"
    }
  }
};

// Test functions
const testValidWebhook = async () => {
  const payload = JSON.stringify(testData.validJSON);
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const result = await sendWebhookRequest(payload, {
    'X-Webhook-Signature': `sha256=${signature}`
  });
  
  logTest('Valid webhook with signature', result.success && result.statusCode === 200, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testValidStringFormat = async () => {
  const payload = testData.validStringFormat;
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const result = await sendWebhookRequest(payload, {
    'Content-Type': 'text/plain',
    'X-Webhook-Signature': `sha256=${signature}`
  });
  
  logTest('Valid string format webhook', result.success && result.statusCode === 200, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testInvalidSignature = async () => {
  const payload = JSON.stringify(testData.validJSON);
  const invalidSignature = 'sha256=invalid_signature';
  
  const result = await sendWebhookRequest(payload, {
    'X-Webhook-Signature': invalidSignature
  });
  
  logTest('Invalid signature rejection', !result.success && result.statusCode === 401, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testMissingSignature = async () => {
  const payload = JSON.stringify(testData.validJSON);
  
  const result = await sendWebhookRequest(payload);
  
  logTest('Missing signature handling', result.success && result.statusCode === 200, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testInvalidJSON = async () => {
  const payload = testData.invalidJSON;
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const result = await sendWebhookRequest(payload, {
    'X-Webhook-Signature': `sha256=${signature}`
  });
  
  logTest('Invalid JSON rejection', !result.success && result.statusCode === 400, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testEmptyPayload = async () => {
  const payload = testData.emptyPayload;
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const result = await sendWebhookRequest(payload, {
    'X-Webhook-Signature': `sha256=${signature}`
  });
  
  logTest('Empty payload rejection', !result.success && result.statusCode === 400, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testLargePayload = async () => {
  const payload = testData.largePayload;
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const result = await sendWebhookRequest(payload, {
    'X-Webhook-Signature': `sha256=${signature}`
  });
  
  logTest('Large payload handling', result.success && result.statusCode === 200, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error,
    payloadSize: Buffer.byteLength(payload)
  });
};

const testInvalidType = async () => {
  const payload = JSON.stringify(testData.invalidType);
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const result = await sendWebhookRequest(payload, {
    'X-Webhook-Signature': `sha256=${signature}`
  });
  
  logTest('Invalid recommendation type', !result.success && result.statusCode === 400, {
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    error: result.error || result.data?.error
  });
};

const testRateLimiting = async () => {
  const payload = JSON.stringify(testData.validJSON);
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const requests = [];
  const rateLimitTest = 110; // Exceed rate limit of 100
  
  console.log(`Testing rate limiting with ${rateLimitTest} requests...`);
  
  for (let i = 0; i < rateLimitTest; i++) {
    requests.push(sendWebhookRequest(payload, {
      'X-Webhook-Signature': `sha256=${signature}`
    }));
  }
  
  const results = await Promise.all(requests);
  const rateLimitedRequests = results.filter(r => r.statusCode === 429);
  
  logTest('Rate limiting enforcement', rateLimitedRequests.length > 0, {
    totalRequests: rateLimitTest,
    rateLimitedRequests: rateLimitedRequests.length,
    successfulRequests: results.filter(r => r.success).length
  });
};

const testConcurrentRequests = async () => {
  const payload = JSON.stringify(testData.validJSON);
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const concurrentRequests = 10;
  const requests = [];
  
  console.log(`Testing ${concurrentRequests} concurrent requests...`);
  
  for (let i = 0; i < concurrentRequests; i++) {
    requests.push(sendWebhookRequest(payload, {
      'X-Webhook-Signature': `sha256=${signature}`
    }));
  }
  
  const results = await Promise.all(requests);
  const successfulRequests = results.filter(r => r.success);
  const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  
  logTest('Concurrent request handling', successfulRequests.length === concurrentRequests, {
    totalRequests: concurrentRequests,
    successfulRequests: successfulRequests.length,
    averageResponseTime: Math.round(averageResponseTime)
  });
};

const testWebhookHealth = async () => {
  try {
    const healthUrl = WEBHOOK_URL.replace('/webhook/visualization-data', '/webhook/status');
    const response = await fetch(healthUrl);
    const healthData = await response.json();
    
    logTest('Webhook health check', response.ok && healthData.status === 'active', {
      statusCode: response.status,
      status: healthData.status,
      endpoint: healthData.endpoint
    });
  } catch (error) {
    logTest('Webhook health check', false, {
      error: error.message
    });
  }
};

const testDuplicateDetection = async () => {
  const payload = JSON.stringify(testData.validJSON);
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const headers = {
    'X-Webhook-Signature': `sha256=${signature}`,
    'User-Agent': 'duplicate-test-agent'
  };
  
  // Send first request
  const firstRequest = await sendWebhookRequest(payload, headers);
  
  // Send duplicate request immediately
  const duplicateRequest = await sendWebhookRequest(payload, headers);
  
  logTest('Duplicate detection', 
    firstRequest.success && 
    duplicateRequest.statusCode === 202 && 
    duplicateRequest.data?.duplicate === true, 
    {
      firstRequestStatus: firstRequest.statusCode,
      duplicateRequestStatus: duplicateRequest.statusCode,
      duplicateDetected: duplicateRequest.data?.duplicate
    });
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting webhook testing...\n');
  console.log(`Webhook URL: ${WEBHOOK_URL}`);
  console.log(`Test iterations: ${TEST_ITERATIONS}\n`);
  
  const tests = [
    testValidWebhook,
    testValidStringFormat,
    testInvalidSignature,
    testMissingSignature,
    testInvalidJSON,
    testEmptyPayload,
    testLargePayload,
    testInvalidType,
    testDuplicateDetection,
    testWebhookHealth,
    testConcurrentRequests,
    // testRateLimiting // Commented out by default as it's aggressive
  ];
  
  for (const test of tests) {
    try {
      await test();
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between tests
    } catch (error) {
      console.error(`Test failed with error: ${error.message}`);
    }
  }
  
  // Generate test report
  testResults.summary.endTime = new Date().toISOString();
  const testDuration = new Date(testResults.summary.endTime) - new Date(testResults.summary.startTime);
  
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  console.log(`Total tests: ${testResults.summary.totalTests}`);
  console.log(`Passed: ${testResults.summary.passed}`);
  console.log(`Failed: ${testResults.summary.failed}`);
  console.log(`Success rate: ${Math.round((testResults.summary.passed / testResults.summary.totalTests) * 100)}%`);
  console.log(`Test duration: ${testDuration}ms`);
  
  // Save detailed results
  const resultsFile = path.join(__dirname, '..', 'test-results', `webhook-test-${Date.now()}.json`);
  const resultsDir = path.dirname(resultsFile);
  
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
  
  fs.writeFileSync(resultsFile, JSON.stringify(testResults, null, 2));
  console.log(`\nDetailed results saved to: ${resultsFile}`);
  
  // Exit with appropriate code
  process.exit(testResults.summary.failed > 0 ? 1 : 0);
};

// Run if called directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = {
  runTests,
  testResults,
  sendWebhookRequest,
  generateSignature
};