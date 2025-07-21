import { useState, useEffect, useCallback } from 'react';
import webhookBridge from '../utils/webhookBridge';

interface NotificationData {
  visualizationId: string;
  solutionTitle: string;
  timestamp: number;
}

export function useNotificationSystem() {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to show notification
  const showNotification = useCallback((data: NotificationData) => {
    setNotification(data);
    setIsVisible(true);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 10000);
  }, []);

  // Function to manually close notification
  const closeNotification = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setNotification(null);
    }, 300); // Wait for animation to complete
  }, []);

  // Listen for new visualizations
  useEffect(() => {
    const handleNewVisualization = (event: CustomEvent) => {
      const { visualizationId, solutionTitle } = event.detail;
      console.log('[NotificationSystem] New visualization event received:', visualizationId);
      
      showNotification({
        visualizationId,
        solutionTitle,
        timestamp: Date.now()
      });
    };

    // Listen for custom events from webhook bridge
    window.addEventListener('newVisualization', handleNewVisualization as EventListener);

    // Initialize webhook bridge (this starts automatic polling)
    console.log('[NotificationSystem] Initializing webhook bridge...');
    const status = webhookBridge.getStatus();
    console.log('[NotificationSystem] Webhook bridge status:', status);

    // Force an immediate check
    webhookBridge.forceCheck();

    return () => {
      window.removeEventListener('newVisualization', handleNewVisualization as EventListener);
    };
  }, [showNotification]);

  return {
    notification,
    isVisible,
    showNotification,
    closeNotification
  };
}