import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VisualizationDisplay } from '../components/VisualizationDisplay';
import { Loader2, AlertCircle } from 'lucide-react';

interface VisualizationData {
  id: string;
  timestamp: string;
  userInfo: {
    email?: string;
    name?: string;
    company?: string;
    industry?: string;
  };
  recommendation: {
    type: 'time_saving' | 'error_reduction' | 'capacity_increase' | 'cost_reduction' | 'response_time' | 'generic';
    title: string;
    description: string;
    currentState: {
      description: string;
      painPoints: string[];
      metrics: {
        timeSpent?: number;
        errorRate?: number;
        capacity?: number;
        cost?: number;
        responseTime?: number;
      };
    };
    futureState: {
      description: string;
      benefits: string[];
      metrics: {
        timeSpent?: number;
        errorRate?: number;
        capacity?: number;
        cost?: number;
        responseTime?: number;
      };
    };
    improvement: {
      percentage: number;
      absoluteValue: number;
      unit: string;
      description: string;
    };
    implementationTimeline: string;
    confidence: number;
  };
  chatHistory?: string[];
  sessionId?: string;
}

export function VisualizationView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<VisualizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No visualization ID provided');
      setLoading(false);
      return;
    }

    fetchVisualizationData(id);
  }, [id]);

  const fetchVisualizationData = async (visualizationId: string) => {
    try {
      setLoading(true);
      setError(null);

      // For now, we'll use localStorage as a fallback since we don't have a running server
      const storedData = localStorage.getItem(`visualization_${visualizationId}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
        setLoading(false);
        return;
      }

      // If no localStorage data, try to fetch from Vercel API
      const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';
      const response = await fetch(`${apiUrl}/api/visualization-data/${visualizationId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch visualization data: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch visualization data');
      }
    } catch (err) {
      console.error('Error fetching visualization data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load visualization data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-medium-grey">Loading visualization...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-dark-grey mb-4">Visualization Not Found</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-dark-grey mb-4">No Data Available</h1>
          <p className="text-medium-grey mb-4">The visualization data could not be loaded.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <VisualizationDisplay data={data} />
      </div>
    </div>
  );
}