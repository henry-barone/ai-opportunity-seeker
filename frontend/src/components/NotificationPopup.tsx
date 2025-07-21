import { useState, useEffect } from 'react';
import { X, ExternalLink, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface NotificationPopupProps {
  visualizationId: string;
  solutionTitle: string;
  isVisible: boolean;
  onClose: () => void;
  onViewVisualization: (id: string) => void;
}

export function NotificationPopup({ 
  visualizationId, 
  solutionTitle, 
  isVisible, 
  onClose, 
  onViewVisualization 
}: NotificationPopupProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay for smoother animation
      const timer = setTimeout(() => setShouldShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [isVisible]);

  const handleViewVisualization = () => {
    onViewVisualization(visualizationId);
    onClose();
  };

  const handleClose = () => {
    setShouldShow(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!isVisible && !shouldShow) return null;

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 transition-opacity duration-300 ${
          shouldShow ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Notification Card */}
      <div className="fixed top-4 right-4 pointer-events-auto">
        <div 
          className={`
            bg-white rounded-lg shadow-2xl border border-gray-200 max-w-sm w-full
            transform transition-all duration-300 ease-out
            ${shouldShow 
              ? 'translate-x-0 opacity-100 scale-100' 
              : 'translate-x-full opacity-0 scale-95'
            }
          `}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-4 pb-0">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analysis Complete!</h3>
                <p className="text-sm text-gray-500">Your opportunity is ready</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900 text-sm">{solutionTitle}</span>
              </div>
              <p className="text-xs text-gray-600">
                Complete ROI analysis with interactive charts and implementation roadmap
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleViewVisualization}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm h-9"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Analysis
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full text-sm h-8"
              >
                Close
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 rounded-b-lg border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Analysis ID: {visualizationId.slice(-8)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}