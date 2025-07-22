// Webhook Simulator - Simulates real webhook data arrival for testing production experience

export async function simulateRealWebhookFlow(): Promise<string> {
  console.log('🎯 Simulating Real User Webhook Flow...');
  console.log('=====================================');
  
  const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';
  
  // Create realistic webhook data that would come from Lleverage chat
  const webhookData = {
    success: true,
    solutionType: 'time_saving',
    solutionTitle: 'Customer Service Automation',
    weeklyHoursSaved: 16.5,
    yearlyCostSaved: 128700,
    improvementPercentage: 85,
    metrics: {
      weeklyHoursSaved: 16.5,
      yearlyHoursSaved: 858,
      weeklyCostSaved: 2475,
      yearlyCostSaved: 128700,
      improvementPercentage: 85,
      breakEvenWeeks: 2,
      yearOneROI: 2474
    }
  };

  try {
    console.log('Step 1: User completes chat session...');
    console.log('Step 2: System sends webhook data...');
    
    // Send webhook data (simulating chat completion)
    const response = await fetch(`${apiUrl}/webhook/visualization-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SPAIK-Chat-Bot/1.0'
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Webhook error: ${result.error || 'Unknown error'}`);
    }

    const visualizationId = result.visualizationId || result.id;
    
    console.log('✅ Step 3: Webhook processed successfully');
    console.log('📊 Visualization ID:', visualizationId);
    console.log('💰 Yearly Savings:', result.yearlyCostSaved);
    console.log('⚡ Improvement:', result.improvementPercentage + '%');
    console.log('');
    console.log('🎉 REAL WEBHOOK FLOW COMPLETE!');
    console.log('📱 Watch for notification popup...');
    console.log('🔄 Dashboard will auto-refresh with new analysis...');
    console.log('🔗 Analysis available at: /visualization/' + visualizationId);
    
    return visualizationId;
    
  } catch (error) {
    console.error('❌ Webhook simulation failed:', error);
    throw error;
  }
}

// Console function for easy testing
export function testProductionFlow() {
  console.log('🚀 Testing Production User Flow...');
  console.log('This simulates the exact experience a real user would have:');
  console.log('1. User completes chat session');
  console.log('2. Webhook data is sent automatically');
  console.log('3. Notification popup appears');
  console.log('4. Dashboard updates with new analysis');
  console.log('');
  
  return simulateRealWebhookFlow();
}

// Make available globally for console testing
(window as any).simulateRealWebhookFlow = simulateRealWebhookFlow;
(window as any).testProductionFlow = testProductionFlow;

console.log('[WebhookSimulator] Production flow testing available:');
console.log('- window.testProductionFlow() - Complete production simulation');
console.log('- window.simulateRealWebhookFlow() - Raw webhook simulation');