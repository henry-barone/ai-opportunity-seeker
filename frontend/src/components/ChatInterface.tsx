import { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (responses: string[]) => void;
  autoMessage?: string;
}

const LLEVERAGE_BASE_URL = 'https://app.lleverage.ai/k14y3qelx/w/seiu1iik';

export function ChatInterface({ isOpen, onClose, onComplete, autoMessage }: ChatInterfaceProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseAttempt();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Simple iframe load handler
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !isOpen) return;

    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    iframe.addEventListener('load', handleIframeLoad);
    return () => iframe.removeEventListener('load', handleIframeLoad);
  }, [isOpen]);

  const handleCloseAttempt = () => {
    setShowCloseConfirmation(true);
  };

  const handleConfirmClose = () => {
    setShowCloseConfirmation(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowCloseConfirmation(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseAttempt();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[85vh] sm:h-[85vh] md:h-[85vh] relative animate-scale-in sm:rounded-lg rounded-none sm:m-4 m-0 sm:max-h-[85vh] max-h-screen">
          {/* Close button */}
          <button 
            onClick={handleCloseAttempt}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={32} />
          </button>
          
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-medium-grey">Preparing your AI consultation...</p>
              </div>
            </div>
          )}
          
          {/* Lleverage iframe */}
          <iframe 
            ref={iframeRef}
            src={LLEVERAGE_BASE_URL}
            className="w-full h-full rounded-lg border-0"
            allow="microphone"
            title="AI Opportunity Spotter Chat"
          />
        </div>
      </div>

      {/* Close confirmation modal */}
      {showCloseConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-lg font-semibold text-dark-grey mb-4">
              Are you sure you want to close?
            </h3>
            <p className="text-medium-grey mb-6">
              Your progress will be lost if you close the chat now.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelClose}
                className="flex-1 px-4 py-2 bg-light-grey text-dark-grey rounded-md hover:bg-medium-grey/20 transition-colors"
              >
                Continue Chat
              </button>
              <button
                onClick={handleConfirmClose}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Close Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}