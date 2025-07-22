import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Target, Clock } from "lucide-react";
import { DashboardData, calculateROI, formatCurrency } from '@/utils/dashboardHelpers';

interface ROIChartProps {
  data: DashboardData;
}

export const ROIChart = ({ data }: ROIChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const roi = calculateROI(data.monthlySavings);
  const initialInvestment = roi.initialInvestment;

  useEffect(() => {
    // Generate chart data for 3-year projection (more realistic)
    const months = Array.from({ length: 37 }, (_, i) => i); // 0 to 36 months (3 years)
    const generatedData = months.map(month => {
      const cumulativeSavings = month * data.monthlySavings;
      const netValue = cumulativeSavings - initialInvestment;
      
      return {
        month,
        year: Math.floor(month / 12),
        investment: month === 0 ? initialInvestment : 0,
        cumulativeSavings: cumulativeSavings,
        netValue: netValue,
        breakEven: month === roi.breakEvenMonths ? 0 : null,
        label: month === 0 ? 'Start' : 
               month === roi.breakEvenMonths ? 'Break-even' :
               month % 12 === 0 && month > 0 ? `Year ${month / 12}` : null
      };
    });

    setTimeout(() => {
      setIsVisible(true);
      setChartData(generatedData);
    }, 500);
  }, [data.monthlySavings, roi.breakEvenMonths, initialInvestment]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">
            Month {label} {data.year > 0 && `(Year ${data.year + (label % 12 === 0 ? 0 : 1)})`}
          </p>
          <p className="text-blue-600">
            Net Value: {formatCurrency(data.netValue)}
          </p>
          <p className="text-green-600">
            Total Savings: {formatCurrency(data.cumulativeSavings)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investment Timeline & Projections
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            See how automation fits your business over time
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            3-year projection based on typical implementation patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border border-slate-200 bg-white shadow-md">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-slate-800 mb-1">
                {roi.breakEvenMonths}
              </div>
              <div className="text-xs text-slate-600">Months to Break-even</div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-slate-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-slate-800 mb-1">
                {roi.roi}%
              </div>
              <div className="text-xs text-slate-600">3-Year ROI</div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-md">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-slate-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-slate-800 mb-1">
                {formatCurrency(roi.initialInvestment)}
              </div>
              <div className="text-xs text-slate-600">Initial Investment</div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-md">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-slate-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-slate-800 mb-1">
                {formatCurrency(roi.threeYearSavings)}
              </div>
              <div className="text-xs text-slate-600">3-Year Net Gain</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className={`border border-slate-200 shadow-lg transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <CardHeader>
            <CardTitle className="text-lg text-center text-slate-800">
              Cumulative Financial Impact Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                  <defs>
                    <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748B"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => {
                      if (value === 0) return 'Start';
                      if (value % 12 === 0) return `Year ${Math.floor(value / 12)}`;
                      if (value === roi.breakEvenMonths) return 'Break-even';
                      return '';
                    }}
                    label={{ value: 'Timeline', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle' } }}
                  />
                  <YAxis 
                    stroke="#64748B"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `€${Math.round(value / 1000)}k`}
                    label={{ value: 'Net Value', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine 
                    y={0} 
                    stroke="#64748B" 
                    strokeDasharray="2 2"
                    label={{ value: "Break-even line", position: "topRight", offset: 10 }}
                  />
                  <ReferenceLine 
                    x={roi.breakEvenMonths} 
                    stroke="#F59E0B" 
                    strokeDasharray="3 3" 
                    label={{ value: `${roi.breakEvenMonths}mo`, position: "top", fill: "#F59E0B" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="netValue"
                    stroke="#475569"
                    strokeWidth={2}
                    fill={(data: any) => data?.netValue >= 0 ? "url(#colorPositive)" : "url(#colorNegative)"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Phases */}
        <div className="text-center mt-8">
          <Card className="inline-block bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-300 shadow-md max-w-4xl">
            <CardContent className="px-8 py-6">
              <div className="text-lg font-medium text-slate-700 mb-4">Implementation Phases</div>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-medium text-slate-800">Months 1-2</div>
                  <div className="text-slate-600">Setup & Integration</div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">Months 3-{roi.breakEvenMonths}</div>
                  <div className="text-slate-600">Optimization & Training</div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">Month {roi.breakEvenMonths}+</div>
                  <div className="text-slate-600">Full ROI Realization</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};