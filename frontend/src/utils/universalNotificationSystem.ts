// Universal Notification System - Works on localhost and production
interface WebhookData {
  visualizationId: string;
  solutionTitle: string;
  timestamp: string;
}

class UniversalNotificationSystem {
  private static instance: UniversalNotificationSystem;
  private isInitialized = false;
  private apiUrl: string;
  private pollingInterval: number = 3000; // 3 seconds
  private lastCheck: number = Date.now();
  private isPolling = false;

  constructor() {
    // Auto-detect environment
    this.apiUrl = this.getApiUrl();
    console.log('[UniversalNotification] Environment detected, API URL:', this.apiUrl);
  }

  static getInstance(): UniversalNotificationSystem {
    if (!UniversalNotificationSystem.instance) {
      UniversalNotificationSystem.instance = new UniversalNotificationSystem();
    }
    return UniversalNotificationSystem.instance;
  }

  private getApiUrl(): string {
    // Check if we're on localhost
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // For localhost, always use production API for webhook data
        return 'https://ai-opportunity-seeker.vercel.app';
      }
      
      // For production/deployed site
      if (hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
        return `https://${hostname}`;
      }
    }
    
    // Fallback to production
    return 'https://ai-opportunity-seeker.vercel.app';
  }

  // Initialize the notification system
  initialize() {
    if (this.isInitialized) return;
    
    console.log('[UniversalNotification] Initializing notification system...');
    this.isInitialized = true;
    
    // Start polling for new visualizations
    this.startPolling();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initial check
    this.checkForNewVisualizations();
  }

  private setupEventListeners() {
    // Listen for manual triggers
    window.addEventListener('triggerNotification', ((event: CustomEvent) => {
      const { visualizationId, solutionTitle } = event.detail;
      this.triggerNotificationPopup(visualizationId, solutionTitle);
    }) as EventListener);
  }

  private startPolling() {
    if (this.isPolling) return;
    
    this.isPolling = true;
    console.log('[UniversalNotification] Starting polling...');
    
    const poll = async () => {
      if (!this.isPolling) return;
      
      try {
        await this.checkForNewVisualizations();
      } catch (error) {
        console.warn('[UniversalNotification] Polling error:', error);
      }
      
      // Continue polling
      setTimeout(poll, this.pollingInterval);
    };
    
    poll();
  }

  private async checkForNewVisualizations() {
    try {
      // Method 1: Try webhook status endpoint
      const statusResponse = await fetch(`${this.apiUrl}/webhook/status`);
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.statistics?.totalVisualizations) {
          const lastCount = parseInt(localStorage.getItem('lastVisualizationCount') || '0');
          const currentCount = statusData.statistics.totalVisualizations;
          
          if (currentCount > lastCount) {
            console.log('[UniversalNotification] New visualization detected!');
            localStorage.setItem('lastVisualizationCount', currentCount.toString());
            
            // Trigger notification for latest visualization
            this.triggerNotificationPopup('latest', 'New Analysis Ready');
            return;
          }
        }
      }
      
      // Method 2: Check localStorage for new items (for localhost testing)
      this.checkLocalStorage();
      
    } catch (error) {
      console.warn('[UniversalNotification] Check failed:', error);
    }
  }

  private checkLocalStorage() {
    try {
      const keys = Object.keys(localStorage);
      const vizKeys = keys.filter(key => key.startsWith('visualization_'));
      
      for (const key of vizKeys) {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.timestamp) {
          const itemTime = new Date(data.timestamp).getTime();
          
          if (itemTime > this.lastCheck) {
            console.log('[UniversalNotification] New localStorage visualization:', data.id);
            this.triggerNotificationPopup(data.id, data.recommendation?.title || 'New Analysis');
            this.lastCheck = itemTime;
          }
        }
      }
    } catch (error) {
      console.warn('[UniversalNotification] localStorage check failed:', error);
    }
  }

  private triggerNotificationPopup(visualizationId: string, solutionTitle: string) {
    console.log('[UniversalNotification] Triggering popup for:', visualizationId);
    
    const event = new CustomEvent('newVisualization', {
      detail: {
        visualizationId,
        solutionTitle,
        timestamp: Date.now()
      }
    });
    
    window.dispatchEvent(event);
  }

  // Public methods for testing
  public async testWebhookIntegration(): Promise<string> {
    console.log('[UniversalNotification] Testing webhook integration...');
    
    const testData = {
      success: true,
      solutionType: 'time_saving',
      solutionTitle: 'Universal Test Integration',
      weeklyHoursSaved: 20.0,
      yearlyCostSaved: 156000,
      improvementPercentage: 88,
      metrics: {
        weeklyHoursSaved: 20.0,
        yearlyHoursSaved: 1040,
        weeklyCostSaved: 3000,
        yearlyCostSaved: 156000,
        improvementPercentage: 88,
        breakEvenWeeks: 2,
        yearOneROI: 3020
      }
    };

    try {
      const response = await fetch(`${this.apiUrl}/webhook/visualization-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'SPAIK-Universal-Test/1.0'
        },
        body: JSON.stringify(testData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Webhook failed');
      }

      const visualizationId = result.visualizationId || result.id;
      
      // Immediately trigger notification
      setTimeout(() => {
        this.triggerNotificationPopup(visualizationId, result.solutionTitle);
      }, 1000);

      console.log('[UniversalNotification] ✅ Test successful:', visualizationId);
      return visualizationId;
      
    } catch (error) {
      console.error('[UniversalNotification] ❌ Test failed:', error);
      throw error;
    }
  }

  public triggerManualNotification(id?: string, title?: string) {
    const visualizationId = id || `manual_${Date.now()}`;
    const solutionTitle = title || 'Manual Test Notification';
    
    this.triggerNotificationPopup(visualizationId, solutionTitle);
    return visualizationId;
  }

  public getStatus() {
    return {
      isInitialized: this.isInitialized,
      isPolling: this.isPolling,
      apiUrl: this.apiUrl,
      lastCheck: new Date(this.lastCheck).toISOString()
    };
  }

  public forceCheck() {
    console.log('[UniversalNotification] Force checking...');
    this.checkForNewVisualizations();
  }
}

// Create global instance
const universalNotificationSystem = UniversalNotificationSystem.getInstance();

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      universalNotificationSystem.initialize();
    });
  } else {
    universalNotificationSystem.initialize();
  }
}

// Make available globally for testing
(window as any).universalNotificationSystem = universalNotificationSystem;
(window as any).testNotificationSystem = () => universalNotificationSystem.testWebhookIntegration();
(window as any).manualNotification = (id?: string, title?: string) => universalNotificationSystem.triggerManualNotification(id, title);

console.log('[UniversalNotification] System loaded. Available functions:');
console.log('- window.testNotificationSystem() - Complete webhook test');
console.log('- window.manualNotification() - Manual popup test');
console.log('- window.universalNotificationSystem.getStatus() - System status');

export default universalNotificationSystem;