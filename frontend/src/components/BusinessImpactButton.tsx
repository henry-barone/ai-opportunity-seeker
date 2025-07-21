import React, { useState } from 'react';
import { TrendingUp, BarChart3, Clock, Sparkles } from 'lucide-react';
import { BusinessImpactVisualization } from './BusinessImpactVisualization';

interface BusinessImpactButtonProps {
  visualizationId?: string;
  className?: string;
}

export function BusinessImpactButton({ visualizationId, className = '' }: BusinessImpactButtonProps) {
  const [showVisualization, setShowVisualization] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visualizationData, setVisualizationData] = useState<any>(null);

  const handleClick = async () => {
    if (!visualizationId) {
      // If no ID provided, use sample data for demo
      const sampleData = {
        id: 'sample_demo',
        recommendation: {
          type: 'time_saving',
          title: 'Automate Invoice Processing',
          description: 'Implement AI-powered invoice processing to reduce manual work',
          currentState: {
            metrics: {
              timeSpent: 6,
              errorRate: 12,
              capacity: 100,
              cost: 800
            }
          },
          futureState: {
            metrics: {
              timeSpent: 1,
              errorRate: 2,
              capacity: 500,
              cost: 200
            }
          },
          improvement: {
            percentage: 83,
            absoluteValue: 5,
            unit: 'hours',
            description: 'Save 5 hours per day'
          },
          implementationTimeline: '2-4 weeks',
          confidence: 0.85
        }
      };
      setVisualizationData(sampleData);
      setShowVisualization(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try to get from localStorage first
      const localData = localStorage.getItem(`visualization_${visualizationId}`);
      if (localData) {
        setVisualizationData(JSON.parse(localData));
        setShowVisualization(true);
        return;
      }

      // Fetch from API
      const response = await fetch(`/api/visualization-data/${visualizationId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch visualization data: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setVisualizationData(result.data);
        setShowVisualization(true);
      } else {
        throw new Error(result.error || 'Failed to load visualization data');
      }
    } catch (err) {
      console.error('Error loading visualization:', err);
      setError(err instanceof Error ? err.message : 'Failed to load visualization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ${className}`}
      >
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <div className="relative">
              <BarChart3 className="h-5 w-5" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
          )}
          <span className="text-sm sm:text-base">
            {loading ? 'Loading...' : 'See how this implementation will affect your business!'}
          </span>
        </div>
        
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse opacity-30" />
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {showVisualization && visualizationData && (
        <BusinessImpactVisualization
          data={visualizationData}
          onClose={() => setShowVisualization(false)}
        />
      )}
    </>
  );
}