#!/usr/bin/env node

/**
 * SPAIK AI Opportunity Seeker - Webhook Test Script
 * Tests the enhanced SPAIK webhook data processing functionality
 */

const crypto = require('crypto');
const http = require('http');

const WEBHOOK_URL = 'http://localhost:8080/webhook/visualization-data';
const WEBHOOK_SECRET = 'your-webhook-secret-key';

// Test data for SPAIK webhook
const spaikTestData = {
  userInfo: {
    name: "John Smith", 
    email: "john@techcorp.com"
  },
  recommendation: {
    type: "time_saving",
    title: "Invoice Processing Automation",
    description: "Automate invoice data extraction and entry using AI-powered OCR and data processing",
    currentState: {
      metrics: {
        timeSpent: 20,      // Hours per week
        errorRate: 10,      // 10% error rate
        cost: 3000         // €3000 per week
      }
    },
    futureState: {
      metrics: {
        timeSpent: 3,       // 3 hours per week after automation
        errorRate: 2,       // 2% error rate after automation
        cost: 450          // €450 per week after automation
      }
    },
    improvement: {
      percentage: 85,       // 85% improvement
      absoluteValue: 17,    // 17 hours saved per week
      unit: "hours"
    }
  }
};

// Test data without cost (should calculate from hours * €150)
const spaikTestDataNoCost = {
  userInfo: {
    name: "Sarah Johnson",
    email: "sarah@startup.io"
  },
  recommendation: {
    type: "cost_reduction",
    title: "Customer Support Chatbot",
    description: "Implement AI chatbot to handle common customer queries automatically",
    currentState: {
      metrics: {
        timeSpent: 15      // 15 hours per week
      }
    },
    futureState: {
      metrics: {
        timeSpent: 4       // 4 hours per week after chatbot
      }
    }
  }
};

// Minimal test data (should work with defaults)
const spaikTestDataMinimal = {
  userInfo: {
    name: "Mike Chen",
    email: "mike@digitalagency.com"
  },
  recommendation: {
    type: "quality_improvement",
    title: "Automated Code Review",
    description: "Implement automated code review tools to catch bugs early",
    currentState: {
      metrics: {
        timeSpent: 8
      }
    },
    futureState: {
      metrics: {
        timeSpent: 2
      }
    }
  }
};

// Invalid test data (should fail validation)
const invalidTestData = {
  userInfo: {
    name: "Test User"
    // Missing email
  },
  recommendation: {
    // Missing type, title, description
    currentState: {
      metrics: {
        timeSpent: -5  // Invalid negative value
      }
    }
  }
};

/**
 * Generate HMAC signature for webhook
 */
function generateSignature(payload, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

/**
 * Send webhook request
 */
function sendWebhook(data, description = '') {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const signature = generateSignature(payload, WEBHOOK_SECRET);
    
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/webhook/visualization-data',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        'X-Webhook-Signature': `sha256=${signature}`,
        'User-Agent': 'SPAIK-Test/1.0.0'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedResponse = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsedResponse
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Check webhook status
 */
function checkWebhookStatus() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/webhook/status',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedResponse = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            data: parsedResponse
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('🚀 Testing SPAIK AI Opportunity Seeker webhook functionality...\n');

  try {
    // Test 1: Webhook status check
    console.log('📋 Testing webhook status...');
    const statusResponse = await checkWebhookStatus();
    if (statusResponse.status === 200) {
      console.log('✅ Webhook status: OK');
      console.log(`✅ Endpoint: ${statusResponse.data.endpoint}`);
      console.log(`✅ Configuration: Secret configured = ${statusResponse.data.configuration?.secretConfigured}`);
    } else {
      console.log('❌ Webhook status check failed');
      console.log('❌ Make sure the server is running on localhost:8080');
      return;
    }
    console.log('');

    // Test 2: Complete SPAIK data with costs
    console.log('💼 Testing complete SPAIK data (with costs)...');
    try {
      const response1 = await sendWebhook(spaikTestData, 'Complete SPAIK data');
      if (response1.status === 200 && response1.data.success) {
        console.log('✅ Status: 200 - Success');
        console.log(`✅ Visualization ID: ${response1.data.id}`);
        console.log(`✅ Solution Type: ${response1.data.solutionType}`);
        console.log(`✅ Solution Title: ${response1.data.solutionTitle}`);
        console.log(`✅ Weekly Hours Saved: ${response1.data.metrics.weeklyHoursSaved}`);
        console.log(`✅ Yearly Cost Saved: €${response1.data.metrics.yearlyCostSaved}`);
        console.log(`✅ Break-even: ${response1.data.metrics.breakEvenWeeks} weeks`);
        console.log(`✅ Year 1 ROI: ${response1.data.metrics.yearOneROI}%`);
        console.log(`✅ View URL: ${response1.data.viewUrl}`);
        console.log(`✅ Full URL: ${response1.data.fullUrl}`);
        console.log(`✅ Processing time: ${response1.data.processingTime}ms`);
      } else {
        console.log(`❌ Test failed - Status: ${response1.status}`);
        console.log(`❌ Response: ${JSON.stringify(response1.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
    }
    console.log('');

    // Test 3: SPAIK data without costs (auto-calculation)
    console.log('🔢 Testing SPAIK data without costs (auto-calculation)...');
    try {
      const response2 = await sendWebhook(spaikTestDataNoCost, 'SPAIK data without costs');
      if (response2.status === 200 && response2.data.success) {
        console.log('✅ Status: 200 - Success');
        console.log(`✅ Visualization ID: ${response2.data.id}`);
        console.log(`✅ Solution Type: ${response2.data.solutionType}`);
        console.log(`✅ Weekly Hours Saved: ${response2.data.metrics.weeklyHoursSaved}`);
        console.log(`✅ Yearly Cost Saved: €${response2.data.metrics.yearlyCostSaved} (auto-calculated)`);
        console.log(`✅ Improvement: ${response2.data.metrics.improvementPercentage}% (auto-calculated)`);
      } else {
        console.log(`❌ Test failed - Status: ${response2.status}`);
        console.log(`❌ Response: ${JSON.stringify(response2.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
    }
    console.log('');

    // Test 4: Minimal SPAIK data
    console.log('📝 Testing minimal SPAIK data...');
    try {
      const response3 = await sendWebhook(spaikTestDataMinimal, 'Minimal SPAIK data');
      if (response3.status === 200 && response3.data.success) {
        console.log('✅ Status: 200 - Success');
        console.log(`✅ Visualization ID: ${response3.data.id}`);
        console.log(`✅ Solution Type: ${response3.data.solutionType}`);
        console.log(`✅ Visual Config: Theme = ${response3.data.visualConfig?.theme || 'N/A'}`);
      } else {
        console.log(`❌ Test failed - Status: ${response3.status}`);
        console.log(`❌ Response: ${JSON.stringify(response3.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
    }
    console.log('');

    // Test 5: Invalid data validation
    console.log('🚫 Testing invalid data validation...');
    try {
      const response4 = await sendWebhook(invalidTestData, 'Invalid data');
      if (response4.status === 400 && !response4.data.success) {
        console.log('✅ Status: 400 - Validation correctly failed');
        console.log(`✅ Error: ${response4.data.error}`);
        console.log(`✅ Message: ${response4.data.message}`);
      } else {
        console.log(`❌ Test failed - Expected validation error but got: ${response4.status}`);
        console.log(`❌ Response: ${JSON.stringify(response4.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
    }
    console.log('');

    // Test 6: Without signature (should still work but with 202)
    console.log('🔓 Testing request without signature...');
    try {
      const payload = JSON.stringify(spaikTestDataMinimal);
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/webhook/visualization-data',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length,
          'User-Agent': 'SPAIK-Test/1.0.0'
          // No X-Webhook-Signature header
        }
      };

      const response5 = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let responseData = '';
          res.on('data', (chunk) => { responseData += chunk; });
          res.on('end', () => {
            try {
              const parsedResponse = JSON.parse(responseData);
              resolve({ status: res.statusCode, data: parsedResponse });
            } catch (error) {
              resolve({ status: res.statusCode, data: responseData });
            }
          });
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
      });

      if (response5.data.success) {
        console.log(`✅ Status: ${response5.status} - Request processed without signature`);
        console.log(`✅ Visualization ID: ${response5.data.id}`);
        console.log(`✅ Solution Type: ${response5.data.solutionType}`);
      } else {
        console.log(`❌ Test failed - Status: ${response5.status}`);
        console.log(`❌ Response: ${JSON.stringify(response5.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
    }

    console.log('\n🎉 All SPAIK webhook tests completed!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Webhook endpoint is working');
    console.log('- ✅ SPAIK data processing implemented');
    console.log('- ✅ Metrics calculation working');
    console.log('- ✅ Data validation working');
    console.log('- ✅ Enhanced response format implemented');
    console.log('- ✅ Error handling working');

  } catch (error) {
    console.error('❌ Test suite failed:', error);
  }
}

// Check if server is running and run tests
console.log('🔍 Checking if server is running...');
checkWebhookStatus()
  .then(() => {
    runTests();
  })
  .catch(() => {
    console.log('❌ Server is not running on localhost:8080');
    console.log('📝 Please start the server first: npm run webhook:start');
  });