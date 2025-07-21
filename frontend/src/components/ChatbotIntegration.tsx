import React, { useEffect, useState } from 'react';
import { BusinessImpactButton } from './BusinessImpactButton';

interface ChatbotIntegrationProps {
  /** Whether to show the visualization button */
  showVisualizationButton?: boolean;
  /** Custom visualization ID if available */
  visualizationId?: string;
  /** Custom className for styling */
  className?: string;
  /** Callback when visualization is shown */
  onVisualizationShown?: () => void;
}

export function ChatbotIntegration({ 
  showVisualizationButton = false, 
  visualizationId,
  className = '',
  onVisualizationShown 
}: ChatbotIntegrationProps) {
  const [shouldShow, setShouldShow] = useState(showVisualizationButton);

  useEffect(() => {
    // Listen for postMessage events from chatbot
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SHOW_VISUALIZATION_BUTTON') {
        setShouldShow(true);
        if (onVisualizationShown) {
          onVisualizationShown();
        }
      }
      
      if (event.data.type === 'HIDE_VISUALIZATION_BUTTON') {
        setShouldShow(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onVisualizationShown]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <BusinessImpactButton 
        visualizationId={visualizationId}
        className="w-full"
      />
    </div>
  );
}

// Hook for easy integration
export function useVisualizationButton() {
  const [showButton, setShowButton] = useState(false);
  const [visualizationId, setVisualizationId] = useState<string | undefined>();

  const showVisualizationButton = (id?: string) => {
    setVisualizationId(id);
    setShowButton(true);
  };

  const hideVisualizationButton = () => {
    setShowButton(false);
    setVisualizationId(undefined);
  };

  return {
    showButton,
    visualizationId,
    showVisualizationButton,
    hideVisualizationButton
  };
}

// Utility function to trigger visualization button from anywhere
export function triggerVisualizationButton(visualizationId?: string) {
  window.postMessage({
    type: 'SHOW_VISUALIZATION_BUTTON',
    visualizationId
  }, '*');
}

export function hideVisualizationButton() {
  window.postMessage({
    type: 'HIDE_VISUALIZATION_BUTTON'
  }, '*');
}