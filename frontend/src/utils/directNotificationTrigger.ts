// Direct Notification Trigger - Immediately shows popup when webhook succeeds

// Function to directly trigger notification popup
export function triggerDirectNotification(visualizationId: string, solutionTitle: string) {
  console.log('[DirectTrigger] Triggering immediate notification for:', visualizationId);
  
  const event = new CustomEvent('newVisualization', {
    detail: {
      visualizationId,
      solutionTitle,
      timestamp: Date.now()
    }
  });
  
  window.dispatchEvent(event);
  return true;
}

// Enhanced webhook test that immediately triggers notification
export async function testWebhookWithDirectNotification(): Promise<string> {
  console.log('[DirectTrigger] Starting enhanced webhook test...');
  
  const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';
  
  // Create test data that simulates what Voiceflow would send
  const testData = {
    success: true,
    solutionType: 'time_saving',
    solutionTitle: 'Customer Support Automation',
    weeklyHoursSaved: 18.5,
    yearlyCostSaved: 144300,
    improvementPercentage: 85,
    metrics: {
      weeklyHoursSaved: 18.5,
      yearlyHoursSaved: 962,
      weeklyCostSaved: 2775,
      yearlyCostSaved: 144300,
      improvementPercentage: 85,
      breakEvenWeeks: 2,
      yearOneROI: 2786
    }
  };

  try {
    // Step 1: Send data to webhook
    console.log('[DirectTrigger] Step 1: Sending data to webhook...');
    const response = await fetch(`${apiUrl}/webhook/visualization-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SPAIK-DirectTest/1.0'
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Webhook error: ${result.error || 'Unknown error'}`);
    }

    console.log('[DirectTrigger] Step 2: Webhook successful, result:', result);
    
    // Step 2: Immediately trigger notification
    const visualizationId = result.visualizationId || result.id;
    const solutionTitle = result.solutionTitle || testData.solutionTitle;
    
    console.log('[DirectTrigger] Step 3: Triggering notification...');
    setTimeout(() => {
      triggerDirectNotification(visualizationId, solutionTitle);
      console.log('[DirectTrigger] ✅ Notification triggered successfully!');
    }, 500); // Small delay to ensure everything is ready

    return visualizationId;
    
  } catch (error) {
    console.error('[DirectTrigger] Test failed:', error);
    throw error;
  }
}

// Test function for when user exits chat (simulates the real scenario)
export function simulateChatExit() {
  console.log('[DirectTrigger] Simulating chat exit scenario...');
  
  // Simulate a 2-second delay like when user exits Voiceflow chat
  setTimeout(async () => {
    console.log('[DirectTrigger] User has exited chat, checking for new analysis...');
    
    try {
      const visualizationId = await testWebhookWithDirectNotification();
      console.log('[DirectTrigger] 🎉 Chat exit simulation complete! Visualization:', visualizationId);
      
      // Show a console message to help with testing
      console.log(`
🎯 INTEGRATION TEST COMPLETE!
================================
✅ Webhook data sent successfully
✅ Visualization created: ${visualizationId}  
✅ Notification popup should appear now
🔗 Click "View Full Analysis" to see enhanced visualization

You can also visit: /visualization/${visualizationId}
      `);
      
    } catch (error) {
      console.error('[DirectTrigger] Chat exit simulation failed:', error);
    }
  }, 2000);
}

// Make functions globally available
(window as any).triggerDirectNotification = triggerDirectNotification;
(window as any).testWebhookWithDirectNotification = testWebhookWithDirectNotification;
(window as any).simulateChatExit = simulateChatExit;

console.log('[DirectTrigger] Functions available:');
console.log('- window.simulateChatExit() - Complete chat exit simulation');
console.log('- window.testWebhookWithDirectNotification() - Direct webhook test');
console.log('- window.triggerDirectNotification(id, title) - Manual trigger');