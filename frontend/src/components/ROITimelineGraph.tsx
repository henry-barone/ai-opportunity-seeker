import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

interface ROITimelineGraphProps {
  implementationCost: number;
  weeklyCostSaved: number;
  breakEvenWeeks: number;
  yearOneROI: number;
}

export function ROITimelineGraph({ 
  implementationCost, 
  weeklyCostSaved, 
  breakEvenWeeks, 
  yearOneROI 
}: ROITimelineGraphProps) {
  // Generate timeline data for 18 months
  const generateTimelineData = () => {
    const data = [];
    const weeks = 78; // 18 months
    
    for (let week = 0; week <= weeks; week++) {
      const totalSavings = week * weeklyCostSaved;
      const netValue = totalSavings - implementationCost;
      const roi = week === 0 ? -100 : ((totalSavings - implementationCost) / implementationCost) * 100;
      
      data.push({
        week,
        month: Math.floor(week / 4.33), // Approximate weeks to months
        investment: -implementationCost,
        savings: totalSavings,
        netValue: netValue,
        roi: roi,
        cumulativeValue: Math.max(netValue, -implementationCost)
      });
    }
    
    return data;
  };

  const timelineData = generateTimelineData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">
            Week {label} (Month {Math.floor(label / 4.33)})
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-green-600">
              Total Savings: €{data.savings.toLocaleString()}
            </p>
            <p className="text-blue-600">
              Net Value: €{data.netValue.toLocaleString()}
            </p>
            <p className={data.roi >= 0 ? 'text-green-600' : 'text-red-600'}>
              ROI: {data.roi.toFixed(0)}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-green-100">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">ROI Timeline</h3>
            <p className="text-sm text-gray-500">Investment vs Savings Over Time</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 text-right">
          <div>
            <div className="text-sm text-gray-500">Break-even</div>
            <div className="font-bold text-blue-600">{breakEvenWeeks} weeks</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Year 1 ROI</div>
            <div className="font-bold text-green-600">{yearOneROI}%</div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timelineData}>
            <defs>
              <linearGradient id="positiveArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="negativeArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => `W${value}`}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Break-even line */}
            <ReferenceLine 
              y={0} 
              stroke="#6b7280" 
              strokeDasharray="5 5" 
              label={{ value: "Break-even", position: "topRight" }}
            />
            
            {/* Break-even week line */}
            <ReferenceLine 
              x={breakEvenWeeks} 
              stroke="#3b82f6" 
              strokeDasharray="3 3"
              label={{ value: `Week ${breakEvenWeeks}`, position: "topLeft" }}
            />
            
            {/* Net value area */}
            <Area
              type="monotone"
              dataKey="netValue"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#positiveArea)"
            />
            
            {/* Investment line */}
            <Line
              type="monotone"
              dataKey="investment"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-700">Initial Investment</span>
          </div>
          <div className="text-2xl font-bold text-red-700">
            €{implementationCost.toLocaleString()}
          </div>
          <div className="text-sm text-red-600">Week 0</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-700">Break-even Point</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            Week {breakEvenWeeks}
          </div>
          <div className="text-sm text-blue-600">
            €{(breakEvenWeeks * weeklyCostSaved).toLocaleString()} saved
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-700">Year 1 Profit</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            €{((52 * weeklyCostSaved) - implementationCost).toLocaleString()}
          </div>
          <div className="text-sm text-green-600">{yearOneROI}% ROI</div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Break-even achieved in just {breakEvenWeeks} weeks</span>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Year 1 returns {(yearOneROI / 100).toFixed(1)}x the investment</span>
          </div>
        </div>
      </div>
    </div>
  );
}