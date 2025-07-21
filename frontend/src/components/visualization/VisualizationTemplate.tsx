import { Clock, TrendingUp, Star, Euro, Zap, CheckCircle } from 'lucide-react';
import { ParsedRecommendation } from '../../utils/lleverage-parser';

interface VisualizationTemplateProps {
  recommendation: ParsedRecommendation;
  scale: number;
}

export function VisualizationTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  const getTemplate = () => {
    switch (recommendation.type) {
      case 'time_saving':
        return <TimeSavingTemplate recommendation={recommendation} scale={scale} />;
      case 'error_reduction':
        return <ErrorReductionTemplate recommendation={recommendation} scale={scale} />;
      case 'capacity_increase':
        return <CapacityIncreaseTemplate recommendation={recommendation} scale={scale} />;
      case 'cost_reduction':
        return <CostReductionTemplate recommendation={recommendation} scale={scale} />;
      case 'response_time':
        return <ResponseTimeTemplate recommendation={recommendation} scale={scale} />;
      default:
        return <GenericTemplate recommendation={recommendation} scale={scale} />;
    }
  };

  return (
    <div className="visualization-template">
      {getTemplate()}
    </div>
  );
}

function TimeSavingTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  const currentHours = (recommendation.currentState.metrics.timeSpent || 8) * scale;
  const futureHours = (recommendation.futureState.metrics.timeSpent || 2) * scale;
  const savedHours = currentHours - futureHours;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-8 w-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-blue-800">Time Savings Impact</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 mb-2">Current Time Investment</h4>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-6 w-6 text-red-600" />
            <span className="text-2xl font-bold text-red-700">{currentHours.toFixed(1)}h</span>
            <span className="text-red-600">per day</span>
          </div>
          <div className="text-sm text-red-700">
            <p>Manual, repetitive work</p>
            <p>Prone to interruptions</p>
            <p>Limited scalability</p>
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">Automated Efficiency</h4>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-2xl font-bold text-green-700">{futureHours.toFixed(1)}h</span>
            <span className="text-green-600">per day</span>
          </div>
          <div className="text-sm text-green-700">
            <p>Automated processing</p>
            <p>Minimal supervision needed</p>
            <p>Scales with volume</p>
          </div>
        </div>
      </div>

      {/* Savings Highlight */}
      <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Daily Time Savings</h4>
        <p className="text-3xl font-bold">{savedHours.toFixed(1)} hours</p>
        <p className="text-sm opacity-90 mt-1">
          = {(savedHours * 5).toFixed(1)} hours per week • {(savedHours * 250).toFixed(0)} hours per year
        </p>
      </div>
    </div>
  );
}

function ErrorReductionTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  const currentErrors = (recommendation.currentState.metrics.errorRate || 15) * scale;
  const futureErrors = (recommendation.futureState.metrics.errorRate || 2) * scale;
  const reduction = currentErrors - futureErrors;

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Star className="h-8 w-8 text-yellow-600" />
        <h3 className="text-2xl font-bold text-yellow-800">Quality Improvement</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 mb-2">Current Error Rate</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-red-700">{currentErrors.toFixed(1)}%</span>
            <span className="text-red-600">error rate</span>
          </div>
          <div className="text-sm text-red-700">
            <p>Manual quality checks</p>
            <p>Human oversight required</p>
            <p>Inconsistent results</p>
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">AI-Powered Accuracy</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-green-700">{futureErrors.toFixed(1)}%</span>
            <span className="text-green-600">error rate</span>
          </div>
          <div className="text-sm text-green-700">
            <p>Automated validation</p>
            <p>Consistent quality</p>
            <p>Continuous improvement</p>
          </div>
        </div>
      </div>

      {/* Improvement Highlight */}
      <div className="mt-6 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg p-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Quality Improvement</h4>
        <p className="text-3xl font-bold">{reduction.toFixed(1)}% fewer errors</p>
        <p className="text-sm opacity-90 mt-1">
          {((reduction / currentErrors) * 100).toFixed(0)}% improvement in accuracy
        </p>
      </div>
    </div>
  );
}

function CapacityIncreaseTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  const currentCapacity = (recommendation.currentState.metrics.capacity || 100) * scale;
  const futureCapacity = (recommendation.futureState.metrics.capacity || 300) * scale;
  const increase = futureCapacity - currentCapacity;

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-green-600" />
        <h3 className="text-2xl font-bold text-green-800">Capacity Growth</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-800 mb-2">Current Capacity</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-orange-700">{currentCapacity.toFixed(0)}</span>
            <span className="text-orange-600">units/day</span>
          </div>
          <div className="text-sm text-orange-700">
            <p>Manual processing limits</p>
            <p>Resource constraints</p>
            <p>Bottlenecks during peak</p>
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">Automated Capacity</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-green-700">{futureCapacity.toFixed(0)}</span>
            <span className="text-green-600">units/day</span>
          </div>
          <div className="text-sm text-green-700">
            <p>Automated scaling</p>
            <p>No manual bottlenecks</p>
            <p>Handles peak loads</p>
          </div>
        </div>
      </div>

      {/* Growth Highlight */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Capacity Increase</h4>
        <p className="text-3xl font-bold">{increase.toFixed(0)} more units/day</p>
        <p className="text-sm opacity-90 mt-1">
          {((increase / currentCapacity) * 100).toFixed(0)}% capacity growth
        </p>
      </div>
    </div>
  );
}

function CostReductionTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  const currentCost = (recommendation.currentState.metrics.cost || 1000) * scale;
  const futureCost = (recommendation.futureState.metrics.cost || 300) * scale;
  const savings = currentCost - futureCost;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Euro className="h-8 w-8 text-purple-600" />
        <h3 className="text-2xl font-bold text-purple-800">Cost Savings</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 mb-2">Current Monthly Cost</h4>
          <div className="flex items-center gap-2 mb-3">
            <Euro className="h-6 w-6 text-red-600" />
            <span className="text-2xl font-bold text-red-700">{currentCost.toFixed(0)}</span>
            <span className="text-red-600">per month</span>
          </div>
          <div className="text-sm text-red-700">
            <p>Manual labor costs</p>
            <p>Overhead expenses</p>
            <p>Error correction costs</p>
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">Automated Cost</h4>
          <div className="flex items-center gap-2 mb-3">
            <Euro className="h-6 w-6 text-green-600" />
            <span className="text-2xl font-bold text-green-700">{futureCost.toFixed(0)}</span>
            <span className="text-green-600">per month</span>
          </div>
          <div className="text-sm text-green-700">
            <p>Automated processing</p>
            <p>Reduced overhead</p>
            <p>Minimal maintenance</p>
          </div>
        </div>
      </div>

      {/* Savings Highlight */}
      <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Monthly Savings</h4>
        <p className="text-3xl font-bold">€{savings.toFixed(0)}</p>
        <p className="text-sm opacity-90 mt-1">
          €{(savings * 12).toFixed(0)} per year • {((savings / currentCost) * 100).toFixed(0)}% cost reduction
        </p>
      </div>
    </div>
  );
}

function ResponseTimeTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  const currentResponse = (recommendation.currentState.metrics.responseTime || 24) * scale;
  const futureResponse = (recommendation.futureState.metrics.responseTime || 1) * scale;
  const improvement = currentResponse - futureResponse;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-indigo-600" />
        <h3 className="text-2xl font-bold text-indigo-800">Response Time</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 mb-2">Current Response Time</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-red-700">{currentResponse.toFixed(1)}h</span>
            <span className="text-red-600">average</span>
          </div>
          <div className="text-sm text-red-700">
            <p>Manual processing delays</p>
            <p>Queue bottlenecks</p>
            <p>Business hours only</p>
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">Automated Response</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-green-700">{futureResponse.toFixed(1)}h</span>
            <span className="text-green-600">average</span>
          </div>
          <div className="text-sm text-green-700">
            <p>Instant processing</p>
            <p>No queue delays</p>
            <p>24/7 availability</p>
          </div>
        </div>
      </div>

      {/* Improvement Highlight */}
      <div className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Response Time Improvement</h4>
        <p className="text-3xl font-bold">{improvement.toFixed(1)}h faster</p>
        <p className="text-sm opacity-90 mt-1">
          {((improvement / currentResponse) * 100).toFixed(0)}% improvement in speed
        </p>
      </div>
    </div>
  );
}

function GenericTemplate({ recommendation, scale }: VisualizationTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="h-8 w-8 text-gray-600" />
        <h3 className="text-2xl font-bold text-gray-800">Process Improvement</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 mb-2">Current Process</h4>
          <div className="text-sm text-red-700 space-y-1">
            {recommendation.currentState.painPoints.map((point, index) => (
              <p key={index}>• {point}</p>
            ))}
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">Improved Process</h4>
          <div className="text-sm text-green-700 space-y-1">
            {recommendation.futureState.benefits.map((benefit, index) => (
              <p key={index}>• {benefit}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Generic Improvement */}
      <div className="mt-6 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-lg p-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Expected Improvement</h4>
        <p className="text-3xl font-bold">{recommendation.improvement.percentage}%</p>
        <p className="text-sm opacity-90 mt-1">
          {recommendation.improvement.description}
        </p>
      </div>
    </div>
  );
}