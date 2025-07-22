import { ArrowRight, Clock, FileText, Calendar, Euro, Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { DashboardData, calculateROI, formatCurrency } from '@/utils/dashboardHelpers';

interface CombinedAnalysisSectionProps {
  data: DashboardData;
}

export const CombinedAnalysisSection = ({ data }: CombinedAnalysisSectionProps) => {
  const roi = calculateROI(data.monthlySavings);
  
  // Chart data
  const chartData = [
    { month: 0, value: 0, label: 'Start' },
    { month: roi.breakEvenMonths, value: 0, label: 'Break-even' },
    { month: 36, value: roi.threeYearSavings, label: '3 Years' }
  ];

  // Before/After data
  const currentInvoicesPerDay = 40;
  const currentTimePerInvoice = 20;
  const currentHoursDaily = 13.3;
  
  const withAIInvoicesPerDay = 200;
  const withAITimePerInvoice = 2;
  const withAIHoursDaily = 6.7;
  
  const hoursSavedPerWeek = Math.round((currentHoursDaily - withAIHoursDaily) * 7);

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
    <section className="py-16 px-6" style={{ backgroundColor: '#FAFBFC' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Before/After Comparison */}
          <div className="border rounded-xl p-8 bg-white shadow-lg" style={{ borderColor: '#E5E7EB' }}>
            <h2 className="text-2xl font-bold mb-8 text-center tracking-tight" style={{ color: '#2D1B69' }}>
              Current vs With AI
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
              {/* Current State */}
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: '#FEF2F2' }}>
                <h3 className="text-lg font-bold mb-6" style={{ color: '#DC2626' }}>
                  CURRENT STATE
                </h3>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 mb-2" style={{ color: '#DC2626' }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>
                      {currentInvoicesPerDay}
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#64748B' }}>invoices/day</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Clock className="w-8 h-8 mb-2" style={{ color: '#DC2626' }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>
                      {currentTimePerInvoice} min
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#64748B' }}>per invoice</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Calendar className="w-8 h-8 mb-2" style={{ color: '#DC2626' }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>
                      {currentHoursDaily} hrs
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#64748B' }}>daily work</div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ backgroundColor: '#2D1B69' }}>
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* With AI State */}
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
                <h3 className="text-lg font-bold mb-6" style={{ color: '#10B981' }}>
                  WITH SPAIK AI
                </h3>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 mb-2" style={{ color: '#10B981' }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: '#10B981' }}>
                      {withAIInvoicesPerDay}
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#64748B' }}>invoices/day</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Clock className="w-8 h-8 mb-2" style={{ color: '#10B981' }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: '#10B981' }}>
                      {withAITimePerInvoice} min
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#64748B' }}>per invoice</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Calendar className="w-8 h-8 mb-2" style={{ color: '#10B981' }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: '#10B981' }}>
                      {withAIHoursDaily} hrs
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#64748B' }}>daily work</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Highlight */}
            <div className="text-center pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
              <div className="inline-block px-6 py-3 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
                <div className="text-3xl font-bold" style={{ color: '#10B981' }}>
                  Save {hoursSavedPerWeek} Hours Per Week
                </div>
                <div className="text-sm font-medium mt-1" style={{ color: '#64748B' }}>
                  That's {Math.round(hoursSavedPerWeek * 52)} hours per year!
                </div>
              </div>
            </div>
          </div>

          {/* Financial Impact */}
          <div className="border rounded-xl p-8 bg-white shadow-lg" style={{ borderColor: '#E5E7EB' }}>
            <h2 className="text-2xl font-bold mb-8 text-center tracking-tight" style={{ color: '#2D1B69' }}>
              Financial Impact Over Time
            </h2>

            {/* Graph with enhanced styling */}
            <div className="h-64 w-full mb-8 p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748B"
                    tick={{ fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => {
                      if (value === 0) return 'Start';
                      if (value === roi.breakEvenMonths) return 'Break-even';
                      if (value === 36) return '3 Years';
                      return `${value}mo`;
                    }}
                  />
                  <YAxis 
                    stroke="#64748B"
                    tick={{ fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => `€${Math.round(value / 1000)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine 
                    y={0} 
                    stroke="#64748B" 
                    strokeDasharray="2 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2D1B69"
                    strokeWidth={4}
                    dot={{ fill: '#2D1B69', strokeWidth: 3, r: 8 }}
                    activeDot={{ r: 10, stroke: '#2D1B69', strokeWidth: 3, fill: '#FFFFFF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
              <div className="text-center p-4 rounded-xl hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: '#F0FDF4' }}>
                <Euro className="w-6 h-6 mx-auto mb-2" style={{ color: '#10B981' }} />
                <div className="text-2xl font-bold mb-1" style={{ color: '#10B981' }}>
                  {formatCurrency(data.monthlySavings)}
                </div>
                <div className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Monthly Savings
                </div>
              </div>
              
              <div className="text-center p-4 rounded-xl hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: '#F0F8FF' }}>
                <Target className="w-6 h-6 mx-auto mb-2" style={{ color: '#2D1B69' }} />
                <div className="text-2xl font-bold mb-1" style={{ color: '#2D1B69' }}>
                  {roi.breakEvenMonths}mo
                </div>
                <div className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Break-even
                </div>
              </div>
              
              <div className="text-center p-4 rounded-xl hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: '#F0FDF4' }}>
                <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: '#10B981' }} />
                <div className="text-2xl font-bold mb-1" style={{ color: '#10B981' }}>
                  {roi.roi}%
                </div>
                <div className="text-sm font-medium" style={{ color: '#64748B' }}>
                  3-Year ROI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};