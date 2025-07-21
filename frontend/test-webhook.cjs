#!/usr/bin/env node

/**
 * Quick Webhook Testing Script
 * Tests the enhanced webhook functionality
 */

const crypto = require('crypto');
const http = require('http');

const WEBHOOK_URL = 'http://localhost:8080/webhook/visualization-data';
const WEBHOOK_SECRET = 'your-webhook-secret-key';

// Test data
const testData = {
  userInfo: {
    email: "test@example.com",
    name: "John Doe",
    company: "Tech Corp"
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
};

// Generate webhook signature
function generateSignature(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

// Send webhook request
async function sendWebhook(data, includeSignature = true) {
  const payload = JSON.stringify(data);
  const signature = generateSignature(payload, WEBHOOK_SECRET);
  
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/webhook/visualization-data',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent': 'webhook-test/1.0.0'
    }
  };
  
  if (includeSignature) {
    options.headers['X-Webhook-Signature'] = `sha256=${signature}`;
  }
  
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: result
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });
    
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Test webhook status
async function testWebhookStatus() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 8080,
      path: '/webhook/status',
      method: 'GET'
    }, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: result
          });
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('🚀 Testing enhanced webhook functionality...\n');
  
  try {
    // Test 1: Check webhook status
    console.log('📋 Testing webhook status...');
    const statusResult = await testWebhookStatus();
    console.log(`✅ Status: ${statusResult.data.status}`);
    console.log(`✅ Features: ${statusResult.data.configuration.rateLimitingEnabled ? 'Rate Limiting' : ''} ${statusResult.data.configuration.duplicateDetectionEnabled ? 'Duplicate Detection' : ''}`);
    console.log(`✅ Statistics: ${statusResult.data.statistics.totalRequests || 0} total requests\n`);
    
    // Test 2: Valid webhook with signature
    console.log('🔒 Testing valid webhook with signature...');
    const validResult = await sendWebhook(testData, true);
    console.log(`✅ Status: ${validResult.statusCode}`);
    console.log(`✅ Response: ${validResult.data.success ? 'Success' : 'Failed'}`);
    if (validResult.data.id) {
      console.log(`✅ ID: ${validResult.data.id}`);
    }
    console.log(`✅ Processing time: ${validResult.data.processingTime}ms\n`);
    
    // Test 3: Valid webhook without signature
    console.log('🔓 Testing valid webhook without signature...');
    const noSigResult = await sendWebhook(testData, false);
    console.log(`✅ Status: ${noSigResult.statusCode}`);
    console.log(`✅ Response: ${noSigResult.data.success ? 'Success' : 'Failed'}`);
    if (noSigResult.data.processingTime) {
      console.log(`✅ Processing time: ${noSigResult.data.processingTime}ms`);
    }
    console.log();
    
    // Test 4: Test duplicate detection
    console.log('🔄 Testing duplicate detection...');
    const dup1 = await sendWebhook(testData, true);
    const dup2 = await sendWebhook(testData, true);
    console.log(`✅ First request: ${dup1.statusCode} (${dup1.data.success ? 'Success' : 'Failed'})`);
    console.log(`✅ Second request: ${dup2.statusCode} (${dup2.data.duplicate ? 'Duplicate detected' : 'Not detected as duplicate'})`);
    console.log();
    
    // Test 5: Invalid JSON
    console.log('❌ Testing invalid JSON...');
    try {
      const invalidResult = await new Promise((resolve, reject) => {
        const payload = '{invalid json}';
        const req = http.request({
          hostname: 'localhost',
          port: 3001,
          path: '/webhook/visualization-data',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
          }
        }, (res) => {
          let responseData = '';
          res.on('data', (chunk) => responseData += chunk);
          res.on('end', () => {
            try {
              const result = JSON.parse(responseData);
              resolve({ statusCode: res.statusCode, data: result });
            } catch (error) {
              resolve({ statusCode: res.statusCode, data: responseData });
            }
          });
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
      });
      
      console.log(`✅ Invalid JSON rejected: ${invalidResult.statusCode}`);
      console.log(`✅ Error message: ${invalidResult.data.error || invalidResult.data.message}`);
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
    }
    
    console.log('\\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { sendWebhook, testWebhookStatus, runTests };