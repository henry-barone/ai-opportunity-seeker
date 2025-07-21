import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Star, Euro, Zap, CheckCircle, AlertCircle, Sliders, ArrowRight } from 'lucide-react';
import { BeforeAfterComparison } from './BeforeAfterComparison';
import { ROITimelineGraph } from './ROITimelineGraph';
import { ImpactMetricsDashboard } from './ImpactMetricsDashboard';
import { TrustBuilders } from './TrustBuilders';

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
  calculatedMetrics?: {
    weeklySavings: {
      hours: number;
      cost: number;
    };
    yearlySavings: {
      hours: number;
      cost: number;
    };
    roi: {
      implementationCost: number;
      breakEvenWeeks: number;
      yearOneROI: number;
    };
  };
}

interface EnhancedVisualizationDisplayProps {
  data: VisualizationData;
}

export function EnhancedVisualizationDisplay({ data }: EnhancedVisualizationDisplayProps) {
  const [scale, setScale] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const Icon = getIcon(data.recommendation.type);

  // Calculate metrics for components
  const currentTimeSpent = data.recommendation.currentState.metrics.timeSpent || 8;
  const futureTimeSpent = data.recommendation.futureState.metrics.timeSpent || 2;
  const currentCost = data.recommendation.currentState.metrics.cost || currentTimeSpent * 150;
  const futureCost = data.recommendation.futureState.metrics.cost || futureTimeSpent * 150;
  const currentErrors = data.recommendation.currentState.metrics.errorRate || 10;
  const futureErrors = data.recommendation.futureState.metrics.errorRate || 2;

  // Use calculated metrics if available, otherwise derive from data
  const metricsData = data.calculatedMetrics ? {
    weeklyHoursSaved: data.calculatedMetrics.weeklySavings.hours,
    yearlyHoursSaved: data.calculatedMetrics.yearlySavings.hours,
    weeklyCostSaved: data.calculatedMetrics.weeklySavings.cost,
    yearlyCostSaved: data.calculatedMetrics.yearlySavings.cost,
    improvementPercentage: data.recommendation.improvement.percentage,
    errorReduction: Math.round(((currentErrors - futureErrors) / currentErrors) * 100),
    capacityIncrease: 40 // Default assumption
  } : {
    weeklyHoursSaved: (currentTimeSpent - futureTimeSpent) * 5, // 5 working days
    yearlyHoursSaved: (currentTimeSpent - futureTimeSpent) * 5 * 52,
    weeklyCostSaved: (currentCost - futureCost) * 5,
    yearlyCostSaved: (currentCost - futureCost) * 5 * 52,
    improvementPercentage: data.recommendation.improvement.percentage,
    errorReduction: Math.round(((currentErrors - futureErrors) / currentErrors) * 100),
    capacityIncrease: 40
  };

  const roiData = data.calculatedMetrics?.roi ? {
    implementationCost: data.calculatedMetrics.roi.implementationCost,
    weeklyCostSaved: data.calculatedMetrics.weeklySavings.cost,
    breakEvenWeeks: data.calculatedMetrics.roi.breakEvenWeeks,
    yearOneROI: data.calculatedMetrics.roi.yearOneROI
  } : {
    implementationCost: 5000,
    weeklyCostSaved: metricsData.weeklyCostSaved,
    breakEvenWeeks: Math.ceil(5000 / metricsData.weeklyCostSaved),
    yearOneROI: Math.round(((metricsData.yearlyCostSaved - 5000) / 5000) * 100)
  };

  return (
    <div className={`
      max-w-7xl mx-auto p-6 space-y-8
      transform transition-all duration-1000 ease-out
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
    `}>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-white bg-opacity-20 rounded-xl">
            <Icon className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.recommendation.title}</h1>
            <p className="text-primary-light opacity-90 text-lg">{data.recommendation.description}</p>
          </div>
        </div>
        
        {data.userInfo.company && (
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-sm">
              <strong>Company:</strong> {data.userInfo.company}
              {data.userInfo.industry && <span> • <strong>Industry:</strong> {data.userInfo.industry}</span>}
            </p>
          </div>
        )}

        {/* Key Metric Highlight */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold mb-1">{metricsData.weeklyHoursSaved}h</div>
            <div className="text-sm opacity-90">Weekly Time Saved</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold mb-1">€{metricsData.yearlyCostSaved.toLocaleString()}</div>
            <div className="text-sm opacity-90">Annual Savings</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold mb-1">{data.recommendation.improvement.percentage}%</div>
            <div className="text-sm opacity-90">Efficiency Improvement</div>
          </div>
        </div>
      </div>

      {/* Before/After Visual Comparisons */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          The "Wow" Factor - Before vs After
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BeforeAfterComparison
            currentValue={currentTimeSpent}
            futureValue={futureTimeSpent}
            unit="hours/day"
            label="Time Investment"
            type="time"
            animationDelay={200}
          />
          <BeforeAfterComparison
            currentValue={currentCost}
            futureValue={futureCost}
            unit="€/day"
            label="Daily Cost"
            type="cost"
            animationDelay={400}
          />
        </div>
      </div>

      {/* ROI Timeline Graph */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Investment Timeline & Break-even Analysis
        </h2>
        <ROITimelineGraph
          implementationCost={roiData.implementationCost}
          weeklyCostSaved={roiData.weeklyCostSaved}
          breakEvenWeeks={roiData.breakEvenWeeks}
          yearOneROI={roiData.yearOneROI}
        />
      </div>

      {/* Impact Metrics Dashboard */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Complete Impact Analysis
        </h2>
        <ImpactMetricsDashboard 
          metrics={metricsData}
          animationDelay={600}
        />
      </div>

      {/* Interactive Scale Slider */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-dark-grey">Adjust for Your Business Scale</h3>
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
              Business scale: {scale}x • All metrics scale proportionally
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
              <div className="text-lg font-bold text-blue-700">
                {(metricsData.weeklyHoursSaved * scale).toFixed(1)}h
              </div>
              <div className="text-sm text-blue-600">Weekly Hours Saved</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
              <div className="text-lg font-bold text-green-700">
                €{Math.round(metricsData.yearlyCostSaved * scale).toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Annual Savings</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
              <div className="text-lg font-bold text-purple-700">
                {Math.round(roiData.yearOneROI * scale)}%
              </div>
              <div className="text-sm text-purple-600">Year 1 ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Builders Section */}
      <div>
        <TrustBuilders
          implementationTimeline={data.recommendation.implementationTimeline}
          confidence={data.recommendation.confidence}
          solutionType={data.recommendation.type}
        />
      </div>

      {/* Data Info Footer */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Analysis Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <strong>Visualization ID:</strong><br />
            {data.id}
          </div>
          <div>
            <strong>Created:</strong><br />
            {new Date(data.timestamp).toLocaleString()}
          </div>
          <div>
            <strong>Solution Type:</strong><br />
            {data.recommendation.type.replace('_', ' ')}
          </div>
          <div>
            <strong>Confidence Level:</strong><br />
            {Math.round(data.recommendation.confidence * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}