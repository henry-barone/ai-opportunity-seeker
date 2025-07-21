import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Clock, TrendingUp, DollarSign, Users, X, Calculator } from 'lucide-react';

interface BusinessImpactData {
  id: string;
  recommendation: {
    type: string;
    title: string;
    description: string;
    currentState: {
      metrics: {
        timeSpent?: number;
        errorRate?: number;
        capacity?: number;
        cost?: number;
      };
    };
    futureState: {
      metrics: {
        timeSpent?: number;
        errorRate?: number;
        capacity?: number;
        cost?: number;
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
}

interface BusinessImpactVisualizationProps {
  data: BusinessImpactData;
  onClose: () => void;
}

export function BusinessImpactVisualization({ data, onClose }: BusinessImpactVisualizationProps) {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [scale, setScale] = useState(1);

  const { recommendation } = data;
  const currentTime = recommendation.currentState.metrics.timeSpent || 0;
  const futureTime = recommendation.futureState.metrics.timeSpent || 0;
  const timeSaved = currentTime - futureTime;

  // Generate time series data
  const generateTimeSeriesData = () => {
    const multipliers = {
      daily: { periods: 30, label: 'Days', factor: 1 },
      weekly: { periods: 52, label: 'Weeks', factor: 7 },
      monthly: { periods: 12, label: 'Months', factor: 30 },
      yearly: { periods: 5, label: 'Years', factor: 365 }
    };

    const config = multipliers[timeframe];
    const data = [];

    for (let i = 1; i <= config.periods; i++) {
      const cumulativeHoursSaved = timeSaved * config.factor * i * scale;
      const costSavings = cumulativeHoursSaved * 50; // Assume $50/hour
      
      data.push({
        period: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} ${i}`,
        hoursSaved: cumulativeHoursSaved,
        costSavings: costSavings,
        currentHours: currentTime * config.factor * i * scale,
        futureHours: futureTime * config.factor * i * scale
      });
    }

    return data;
  };

  const timeSeriesData = generateTimeSeriesData();
  const totalHoursSaved = timeSeriesData[timeSeriesData.length - 1]?.hoursSaved || 0;
  const totalCostSavings = timeSeriesData[timeSeriesData.length - 1]?.costSavings || 0;

  // Generate comparison data
  const comparisonData = [
    {
      name: 'Current Process',
      hours: currentTime * scale,
      cost: (currentTime * scale) * 50,
      fill: '#ef4444'
    },
    {
      name: 'Optimized Process',
      hours: futureTime * scale,
      cost: (futureTime * scale) * 50,
      fill: '#10b981'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Business Impact Visualization</h2>
              <p className="text-blue-100">{recommendation.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Timeframe:</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as typeof timeframe)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Scale:</label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600">{scale}x</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Current Time</span>
            </div>
            <div className="text-2xl font-bold text-red-800">{currentTime * scale}h</div>
            <div className="text-sm text-red-600">per execution</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Future Time</span>
            </div>
            <div className="text-2xl font-bold text-green-800">{futureTime * scale}h</div>
            <div className="text-sm text-green-600">per execution</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Calculator className="h-5 w-5" />
              <span className="font-medium">Time Saved</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">{timeSaved * scale}h</div>
            <div className="text-sm text-blue-600">per execution</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 text-purple-700 mb-2">
              <DollarSign className="h-5 w-5" />
              <span className="font-medium">Cost Savings</span>
            </div>
            <div className="text-2xl font-bold text-purple-800">${(timeSaved * scale * 50).toLocaleString()}</div>
            <div className="text-sm text-purple-600">per execution</div>
          </div>
        </div>

        {/* Charts */}
        <div className="p-6 space-y-8">
          {/* Time Savings Over Time */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Cumulative Hours Saved Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'hoursSaved' ? `${value.toLocaleString()} hours` : `$${value.toLocaleString()}`,
                    name === 'hoursSaved' ? 'Hours Saved' : 'Cost Savings'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hoursSaved" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Hours Saved"
                />
                <Line 
                  type="monotone" 
                  dataKey="costSavings" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Cost Savings ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Before vs After Comparison */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Process Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'hours' ? `${value} hours` : `$${value.toLocaleString()}`,
                    name === 'hours' ? 'Time Required' : 'Cost'
                  ]}
                />
                <Legend />
                <Bar dataKey="hours" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Implementation Timeline */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Implementation Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {recommendation.improvement.percentage}%
                </div>
                <div className="text-sm text-gray-600">Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {totalHoursSaved.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Hours Saved ({timeframe})</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${totalCostSavings.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Cost Savings ({timeframe})</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Timeline:</strong> {recommendation.implementationTimeline}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Confidence:</strong> {(recommendation.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-xl">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              * Calculations based on $50/hour average cost. Adjust scale for your business volume.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}