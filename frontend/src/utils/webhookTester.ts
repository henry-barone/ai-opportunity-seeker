// Webhook Tester - Simulates real webhook data arrival
import webhookBridge from './webhookBridge';

interface TestWebhookData {
  success: boolean;
  solutionType: string;
  solutionTitle: string;
  weeklyHoursSaved: number;
  yearlyCostSaved: number;
  improvementPercentage: number;
  metrics: {
    weeklyHoursSaved: number;
    yearlyHoursSaved: number;
    weeklyCostSaved: number;
    yearlyCostSaved: number;
    improvementPercentage: number;
    breakEvenWeeks: number;
    yearOneROI: number;
  };
}

export async function testWebhookIntegration(): Promise<string> {
  console.log('[WebhookTester] Starting webhook integration test...');
  
  const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';
  
  // Create test webhook data in the pre-calculated format
  const testData: TestWebhookData = {
    success: true,
    solutionType: 'time_saving',
    solutionTitle: 'Live Chat Integration Test',
    weeklyHoursSaved: 12.5,
    yearlyCostSaved: 97500,
    improvementPercentage: 78,
    metrics: {
      weeklyHoursSaved: 12.5,
      yearlyHoursSaved: 650,
      weeklyCostSaved: 1875,
      yearlyCostSaved: 97500,
      improvementPercentage: 78,
      breakEvenWeeks: 3,
      yearOneROI: 1850
    }
  };

  try {
    console.log('[WebhookTester] Sending test data to webhook...');
    
    // Send data to webhook endpoint
    const response = await fetch(`${apiUrl}/webhook/visualization-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SPAIK-Integration-Test/1.0'
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Webhook returned error: ${result.error || 'Unknown error'}`);
    }

    console.log('[WebhookTester] Webhook response received:', result);
    
    // Force webhook bridge to check for new data immediately
    console.log('[WebhookTester] Triggering immediate check...');
    webhookBridge.resetPollingTime(); // Reset to check recent data
    await webhookBridge.forceCheck();
    
    // Also trigger manual notification as backup
    setTimeout(() => {
      console.log('[WebhookTester] Triggering manual notification...');
      const event = new CustomEvent('newVisualization', {
        detail: {
          visualizationId: result.visualizationId || result.id,
          solutionTitle: result.solutionTitle,
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(event);
    }, 1000);

    return result.visualizationId || result.id;
    
  } catch (error) {
    console.error('[WebhookTester] Integration test failed:', error);
    throw error;
  }
}

// Test with simplified format (for backward compatibility)
export async function testSimplifiedWebhook(): Promise<string> {
  console.log('[WebhookTester] Testing simplified webhook format...');
  
  const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';
  
  const simplifiedData = {
    processName: 'Customer Query Automation',
    currentTime: 480, // 8 hours in minutes
    futureTime: 120,  // 2 hours in minutes
    savingType: 'time_saving',
    frequency: 'weekly',
    efficiencyGain: '75%',
    analysisComplete: true,
    responseText: 'Customer queries can be automated to save significant time and improve response quality.'
  };

  try {
    const response = await fetch(`${apiUrl}/webhook/visualization-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SPAIK-Simplified-Test/1.0'
      },
      body: JSON.stringify(simplifiedData)
    });

    const result = await response.json();
    console.log('[WebhookTester] Simplified webhook response:', result);
    
    if (result.success) {
      // Trigger notification
      webhookBridge.resetPollingTime();
      await webhookBridge.forceCheck();
    }
    
    return result.visualizationId || result.id;
    
  } catch (error) {
    console.error('[WebhookTester] Simplified test failed:', error);
    throw error;
  }
}

// Make functions globally available for console testing
(window as any).testWebhookIntegration = testWebhookIntegration;
(window as any).testSimplifiedWebhook = testSimplifiedWebhook;

console.log('[WebhookTester] Available functions:');
console.log('- window.testWebhookIntegration() - Test pre-calculated format');
console.log('- window.testSimplifiedWebhook() - Test simplified format');
console.log('- window.webhookBridge.forceCheck() - Force check for new data');