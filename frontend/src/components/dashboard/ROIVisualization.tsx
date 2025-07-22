import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { DashboardData, calculateROI, formatCurrency } from '@/utils/dashboardHelpers';

interface ROIVisualizationProps {
  data: DashboardData;
}

export const ROIVisualization = ({ data }: ROIVisualizationProps) => {
  const roi = calculateROI(data.monthlySavings);
  
  // Simple timeline data: Start → Break-even → 3 years
  const chartData = [
    { month: 0, value: 0, label: 'Start' },
    { month: roi.breakEvenMonths, value: 0, label: 'Break-even' },
    { month: 36, value: roi.threeYearSavings, label: '3 Years' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">Month {label}</p>
          <p className="text-blue-600">Net Value: {formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#2D1B69' }}>
            ROI Timeline & Financial Impact
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            See how your investment grows over time
          </p>
        </div>

        <Card className="border shadow-sm" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl" style={{ color: '#2D1B69' }}>
              Financial Growth Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-60 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748B"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      if (value === 0) return 'Start';
                      if (value === roi.breakEvenMonths) return 'Break-even';
                      if (value === 36) return '3 Years';
                      return `${value}mo`;
                    }}
                    label={{ value: 'Timeline', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    stroke="#64748B"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `€${Math.round(value / 1000)}k`}
                    label={{ value: 'Net Value', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine 
                    y={0} 
                    stroke="#64748B" 
                    strokeDasharray="2 2"
                    label={{ value: "Break-even line", position: "topRight" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    strokeWidth={4}
                    dot={{ fill: '#6366F1', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#6366F1', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center rounded-xl p-4" style={{ backgroundColor: '#F8FAFC' }}>
              <div className="text-xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                Net Value After 3 Years: {formatCurrency(roi.threeYearSavings)}
              </div>
              <div className="text-sm" style={{ color: '#64748B' }}>
                This represents your total return after deducting the initial investment of {formatCurrency(roi.initialInvestment)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};