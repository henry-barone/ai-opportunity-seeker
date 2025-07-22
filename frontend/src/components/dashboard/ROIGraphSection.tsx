import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { DashboardData, calculateROI, formatCurrency } from '@/utils/dashboardHelpers';

interface ROIGraphSectionProps {
  data: DashboardData;
}

export const ROIGraphSection = ({ data }: ROIGraphSectionProps) => {
  const roi = calculateROI(data.monthlySavings);
  
  const chartData = [
    { month: 0, value: 0, label: 'Start' },
    { month: roi.breakEvenMonths, value: 0, label: 'Break-even' },
    { month: 36, value: roi.threeYearSavings, label: '3 Years' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg" style={{ borderColor: '#E5E7EB' }}>
          <p className="font-medium" style={{ color: '#1F2937' }}>Month {label}</p>
          <p style={{ color: '#2D1B69' }}>Net Value: {formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#2D1B69' }}>
            Financial Impact Over Time
          </h2>
        </div>

        {/* Graph */}
        <div className="h-80 w-full mb-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#1F2937"
                tick={{ fontSize: 14 }}
                tickFormatter={(value) => {
                  if (value === 0) return 'Start';
                  if (value === roi.breakEvenMonths) return 'Break-even';
                  if (value === 36) return '3 Years';
                  return `${value}mo`;
                }}
              />
              <YAxis 
                stroke="#1F2937"
                tick={{ fontSize: 14 }}
                tickFormatter={(value) => `€${Math.round(value / 1000)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={0} 
                stroke="#1F2937" 
                strokeDasharray="2 2"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2D1B69"
                strokeWidth={4}
                dot={{ fill: '#2D1B69', strokeWidth: 2, r: 8 }}
                activeDot={{ r: 10, stroke: '#2D1B69', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>
              {formatCurrency(data.monthlySavings)}
            </div>
            <div className="text-lg" style={{ color: '#1F2937' }}>
              Monthly Savings
            </div>
          </div>
          
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>
              {roi.breakEvenMonths} months
            </div>
            <div className="text-lg" style={{ color: '#1F2937' }}>
              Break-even Period
            </div>
          </div>
          
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>
              {roi.roi}%
            </div>
            <div className="text-lg" style={{ color: '#1F2937' }}>
              3-Year ROI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};