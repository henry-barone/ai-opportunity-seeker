import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Star, Euro, Zap, CheckCircle, AlertCircle, Sliders } from 'lucide-react';

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

interface VisualizationDisplayProps {
  data: VisualizationData;
}

export function VisualizationDisplay({ data }: VisualizationDisplayProps) {
  const [scale, setScale] = useState(1);

  const getIcon = (type: string) => {
    switch (type) {
      case 'time_saving': return Clock;
      case 'error_reduction': return Star;
      case 'capacity_increase': return TrendingUp;
      case 'cost_reduction': return Euro;
      case 'response_time': return Zap;
      default: return CheckCircle;
    }
  };

  const getScaledValue = (value: number, unit: string) => {
    const scaledValue = value * scale;
    if (unit === 'hours') return `${scaledValue.toFixed(1)} ${unit}`;
    if (unit === '€' || unit === '$') return `${unit}${scaledValue.toFixed(0)}`;
    if (unit === '%') return `${scaledValue.toFixed(0)}${unit}`;
    return `${scaledValue.toFixed(0)}${unit}`;
  };

  const Icon = getIcon(data.recommendation.type);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white p-6 rounded-lg mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">{data.recommendation.title}</h1>
            <p className="text-primary-light opacity-90">{data.recommendation.description}</p>
          </div>
        </div>
        {data.userInfo.company && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-sm">
              <strong>Company:</strong> {data.userInfo.company}
              {data.userInfo.industry && <span> • <strong>Industry:</strong> {data.userInfo.industry}</span>}
            </p>
          </div>
        )}
      </div>

      {/* Before/After Comparison */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Before Section */}
        <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-semibold text-red-800">Current Situation</h2>
          </div>
          <p className="text-red-700 mb-4">{data.recommendation.currentState.description}</p>
          <div className="space-y-2">
            <h3 className="font-medium text-red-800">Pain Points:</h3>
            <ul className="space-y-1">
              {data.recommendation.currentState.painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-red-700">
                  <span className="text-red-400 mt-1">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Current Metrics */}
          <div className="mt-4 p-3 bg-red-100 rounded border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Current Metrics:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {data.recommendation.currentState.metrics.timeSpent && (
                <div>Time: {data.recommendation.currentState.metrics.timeSpent}h/day</div>
              )}
              {data.recommendation.currentState.metrics.errorRate && (
                <div>Error Rate: {data.recommendation.currentState.metrics.errorRate}%</div>
              )}
              {data.recommendation.currentState.metrics.capacity && (
                <div>Capacity: {data.recommendation.currentState.metrics.capacity}/day</div>
              )}
              {data.recommendation.currentState.metrics.cost && (
                <div>Cost: €{data.recommendation.currentState.metrics.cost}/month</div>
              )}
              {data.recommendation.currentState.metrics.responseTime && (
                <div>Response: {data.recommendation.currentState.metrics.responseTime}h</div>
              )}
            </div>
          </div>
        </div>

        {/* After Section */}
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-green-800">Future State</h2>
          </div>
          <p className="text-green-700 mb-4">{data.recommendation.futureState.description}</p>
          <div className="space-y-2">
            <h3 className="font-medium text-green-800">Benefits:</h3>
            <ul className="space-y-1">
              {data.recommendation.futureState.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Future Metrics */}
          <div className="mt-4 p-3 bg-green-100 rounded border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Future Metrics:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {data.recommendation.futureState.metrics.timeSpent && (
                <div>Time: {data.recommendation.futureState.metrics.timeSpent}h/day</div>
              )}
              {data.recommendation.futureState.metrics.errorRate && (
                <div>Error Rate: {data.recommendation.futureState.metrics.errorRate}%</div>
              )}
              {data.recommendation.futureState.metrics.capacity && (
                <div>Capacity: {data.recommendation.futureState.metrics.capacity}/day</div>
              )}
              {data.recommendation.futureState.metrics.cost && (
                <div>Cost: €{data.recommendation.futureState.metrics.cost}/month</div>
              )}
              {data.recommendation.futureState.metrics.responseTime && (
                <div>Response: {data.recommendation.futureState.metrics.responseTime}h</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Improvement Metric */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg p-6 mb-8">
        <div className="text-center">
          <Icon className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Key Improvement</h2>
          <p className="text-3xl font-bold mb-2">
            {getScaledValue(data.recommendation.improvement.absoluteValue, data.recommendation.improvement.unit)}
          </p>
          <p className="text-xl opacity-90">{data.recommendation.improvement.description}</p>
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-sm">
              <strong>Improvement:</strong> {data.recommendation.improvement.percentage}% better performance
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Scale Slider */}
      <div className="bg-light-grey rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sliders className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-dark-grey">Adjust for Your Business Scale</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-medium-grey w-16">Small</span>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((scale - 0.5) / 4.5) * 100}%, #e5e7eb ${((scale - 0.5) / 4.5) * 100}%, #e5e7eb 100%)`
              }}
            />
            <span className="text-sm text-medium-grey w-16">Large</span>
          </div>
          <div className="text-center">
            <span className="text-sm text-medium-grey">
              Business scale: {scale}x • Impact scales proportionally
            </span>
          </div>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Implementation Timeline</h2>
        <div className="flex items-center gap-3">
          <div className="bg-blue-200 rounded-full w-4 h-4"></div>
          <div className="flex-1">
            <div className="bg-blue-200 h-2 rounded">
              <div 
                className="bg-blue-600 h-2 rounded transition-all duration-300" 
                style={{ width: `${data.recommendation.confidence * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-blue-700 font-medium">{data.recommendation.implementationTimeline}</span>
        </div>
        <p className="text-sm text-blue-700 mt-2">
          Confidence level: {Math.round(data.recommendation.confidence * 100)}%
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-dark-grey">Ready to Transform Your Business?</h2>
        <p className="text-medium-grey max-w-2xl mx-auto">
          Our AI experts can help you implement this solution and unlock even more opportunities for growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium">
            Book Free Consultation
          </button>
          <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
            Download Full Report
          </button>
        </div>
      </div>

      {/* Data Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-2">Visualization Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <strong>ID:</strong> {data.id}
          </div>
          <div>
            <strong>Created:</strong> {new Date(data.timestamp).toLocaleString()}
          </div>
          <div>
            <strong>Type:</strong> {data.recommendation.type.replace('_', ' ')}
          </div>
        </div>
      </div>
    </div>
  );
}