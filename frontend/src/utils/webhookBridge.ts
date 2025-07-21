// Webhook Bridge - Connects webhook data to frontend notifications
interface WebhookResponse {
  success: boolean;
  visualizationId: string;
  solutionTitle: string;
  timestamp: string;
}

interface VisualizationData {
  id: string;
  timestamp: string;
  recommendation: {
    title: string;
  };
}

class WebhookBridge {
  private static instance: WebhookBridge;
  private lastPolledTime: number = 0;
  private pollingInterval: number = 2000; // Poll every 2 seconds
  private isPolling: boolean = false;
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';
    this.lastPolledTime = Date.now();
    this.startPolling();
  }

  static getInstance(): WebhookBridge {
    if (!WebhookBridge.instance) {
      WebhookBridge.instance = new WebhookBridge();
    }
    return WebhookBridge.instance;
  }

  // Start polling for new visualizations
  startPolling() {
    if (this.isPolling) return;
    
    this.isPolling = true;
    console.log('[WebhookBridge] Starting polling for new visualizations...');
    
    const poll = async () => {
      try {
        await this.checkForNewVisualizations();
      } catch (error) {
        console.error('[WebhookBridge] Polling error:', error);
      }
      
      if (this.isPolling) {
        setTimeout(poll, this.pollingInterval);
      }
    };

    poll();
  }

  // Stop polling
  stopPolling() {
    this.isPolling = false;
    console.log('[WebhookBridge] Stopped polling');
  }

  // Check for new visualizations from the API
  private async checkForNewVisualizations() {
    try {
      // Try the visualizations endpoint first
      let response = await fetch(`${this.apiUrl}/api/visualizations`);
      let data: any;
      
      if (response.ok) {
        data = await response.json();
        
        if (data.success && data.visualizations) {
          // Check for visualizations created after our last poll
          const newVisualizations = data.visualizations.filter((viz: any) => {
            const vizTime = new Date(viz.timestamp).getTime();
            return vizTime > this.lastPolledTime;
          });

          // Trigger notifications for new visualizations
          newVisualizations.forEach((viz: any) => {
            console.log('[WebhookBridge] New visualization detected:', viz.id);
            this.triggerNotification(viz.id, viz.title);
            
            // Store in localStorage for persistence
            this.storeVisualizationLocally(viz.id);
          });

          // Update last polled time
          if (newVisualizations.length > 0) {
            this.lastPolledTime = Math.max(
              ...newVisualizations.map((viz: any) => new Date(viz.timestamp).getTime())
            );
          }
          return;
        }
      }
      
      // Fallback: Check status endpoint for total count changes
      response = await fetch(`${this.apiUrl}/webhook/status`);
      if (response.ok) {
        data = await response.json();
        
        if (data.statistics && data.statistics.totalVisualizations) {
          const lastCount = localStorage.getItem('lastVisualizationCount');
          const currentCount = data.statistics.totalVisualizations;
          
          if (lastCount && parseInt(lastCount) < currentCount) {
            console.log('[WebhookBridge] New visualization detected via count change');
            // Trigger a generic notification
            this.triggerNotification('latest', 'New Analysis Ready');
          }
          
          localStorage.setItem('lastVisualizationCount', currentCount.toString());
        }
      }

    } catch (error) {
      console.error('[WebhookBridge] Error checking for new visualizations:', error);
    }
  }

  // Store visualization data locally and trigger notification
  private async storeVisualizationLocally(visualizationId: string) {
    try {
      const response = await fetch(`${this.apiUrl}/api/visualization-data/${visualizationId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem(`visualization_${visualizationId}`, JSON.stringify(data.data));
          console.log('[WebhookBridge] Stored visualization locally:', visualizationId);
        }
      }
    } catch (error) {
      console.error('[WebhookBridge] Error storing visualization locally:', error);
    }
  }

  // Trigger notification event
  private triggerNotification(visualizationId: string, solutionTitle: string) {
    const event = new CustomEvent('newVisualization', {
      detail: {
        visualizationId,
        solutionTitle,
        timestamp: Date.now()
      }
    });
    
    window.dispatchEvent(event);
    console.log('[WebhookBridge] Notification triggered for:', visualizationId);
  }

  // Manual trigger for testing
  public triggerTestNotification() {
    const testId = `vis_test_${Date.now()}`;
    this.triggerNotification(testId, 'Test Analysis');
    return testId;
  }

  // Force check now (useful for immediate response)
  public async forceCheck() {
    console.log('[WebhookBridge] Force checking for new visualizations...');
    await this.checkForNewVisualizations();
  }

  // Reset polling time (useful after webhook data is received)
  public resetPollingTime() {
    this.lastPolledTime = Date.now() - 10000; // Check last 10 seconds
    console.log('[WebhookBridge] Reset polling time');
  }

  // Get current status
  public getStatus() {
    return {
      isPolling: this.isPolling,
      lastPolledTime: this.lastPolledTime,
      apiUrl: this.apiUrl
    };
  }
}

// Initialize the bridge
const webhookBridge = WebhookBridge.getInstance();

// Make it available globally for debugging
(window as any).webhookBridge = webhookBridge;

// Export for use in components
export default webhookBridge;