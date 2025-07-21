/**
 * Console Webhook Test Utility
 * Run these functions from the browser console to test webhook functionality
 */

export const WEBHOOK_TEST_URL = 'https://webhook.site/9c9dd13f-b6f0-41f4-a647-cb10bd929677';

// Test data formats
export const testData = {
  newFormat: `task:invoice_processing
current:3_hours
future:20_minutes
type:time_saving
frequency:daily`,
  
  legacyFormat: {
    userInfo: {
      email: "test@example.com",
      name: "John Doe",
      company: "Tech Corp"
    },
    recommendation: {
      type: "time_saving",
      title: "Automated Invoice Processing",
      description: "Implement AI-powered invoice processing",
      currentState: { metrics: { timeSpent: 3 } },
      futureState: { metrics: { timeSpent: 0.33 } },
      improvement: {
        percentage: 89,
        absoluteValue: 2.67,
        unit: "hours",
        description: "Save 2.67 hours per execution"
      },
      implementationTimeline: "2-4 weeks",
      confidence: 0.85
    }
  }
};

// Test function for new format
export async function testNewFormat() {
  console.log('🚀 Testing new webhook format...');
  console.log('📤 Sending to:', WEBHOOK_TEST_URL);
  console.log('📄 Data:', testData.newFormat);
  
  try {
    const response = await fetch(WEBHOOK_TEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'AI-Opportunity-Seeker-Console-Test/1.0.0',
        'X-Test-Format': 'new',
        'X-Test-Timestamp': new Date().toISOString()
      },
      body: testData.newFormat
    });
    
    console.log('✅ Response status:', response.status);
    console.log('🔗 View results:', WEBHOOK_TEST_URL);
    
    const result = await response.text();
    console.log('📨 Response:', result);
    
    return { success: true, response: result };
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error };
  }
}

// Test function for legacy format
export async function testLegacyFormat() {
  console.log('🚀 Testing legacy webhook format...');
  console.log('📤 Sending to:', WEBHOOK_TEST_URL);
  console.log('📄 Data:', testData.legacyFormat);
  
  try {
    const response = await fetch(WEBHOOK_TEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AI-Opportunity-Seeker-Console-Test/1.0.0',
        'X-Test-Format': 'legacy',
        'X-Test-Timestamp': new Date().toISOString()
      },
      body: JSON.stringify(testData.legacyFormat)
    });
    
    console.log('✅ Response status:', response.status);
    console.log('🔗 View results:', WEBHOOK_TEST_URL);
    
    const result = await response.text();
    console.log('📨 Response:', result);
    
    return { success: true, response: result };
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error };
  }
}

// Test both formats
export async function testBothFormats() {
  console.log('🔄 Testing both webhook formats...');
  
  console.log('\n--- NEW FORMAT TEST ---');
  const newResult = await testNewFormat();
  
  console.log('\n--- LEGACY FORMAT TEST ---');
  const legacyResult = await testLegacyFormat();
  
  console.log('\n--- SUMMARY ---');
  console.log('New format:', newResult.success ? '✅ Success' : '❌ Failed');
  console.log('Legacy format:', legacyResult.success ? '✅ Success' : '❌ Failed');
  console.log('🔗 View all results:', WEBHOOK_TEST_URL);
  
  return { newResult, legacyResult };
}

// Custom test with your own data
export async function testCustomData(data: any, contentType: string = 'application/json') {
  console.log('🚀 Testing custom webhook data...');
  console.log('📤 Sending to:', WEBHOOK_TEST_URL);
  console.log('📄 Data:', data);
  
  try {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    
    const response = await fetch(WEBHOOK_TEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'User-Agent': 'AI-Opportunity-Seeker-Console-Test/1.0.0',
        'X-Test-Format': 'custom',
        'X-Test-Timestamp': new Date().toISOString()
      },
      body: payload
    });
    
    console.log('✅ Response status:', response.status);
    console.log('🔗 View results:', WEBHOOK_TEST_URL);
    
    const result = await response.text();
    console.log('📨 Response:', result);
    
    return { success: true, response: result };
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error };
  }
}

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).webhookTest = {
    testNewFormat,
    testLegacyFormat,
    testBothFormats,
    testCustomData,
    testData,
    WEBHOOK_TEST_URL
  };
  
  console.log('🎯 Webhook test functions loaded!');
  console.log('💡 Usage examples:');
  console.log('  webhookTest.testNewFormat()');
  console.log('  webhookTest.testLegacyFormat()');
  console.log('  webhookTest.testBothFormats()');
  console.log('  webhookTest.testCustomData(yourData)');
  console.log('🔗 View results at:', WEBHOOK_TEST_URL);
}