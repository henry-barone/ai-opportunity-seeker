import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { DashboardData, calculateROI, formatCurrency } from '@/utils/dashboardHelpers';

interface ProcessAndFinancialProps {
  data: DashboardData;
}

export const ProcessAndFinancial = ({ data }: ProcessAndFinancialProps) => {
  const roi = calculateROI(data.monthlySavings);
  
  // Process data
  const currentInvoicesPerDay = 40;
  const currentTimePerInvoice = 20;
  const currentHoursDaily = 13.3;
  
  const withAIInvoicesPerDay = 200;
  const withAITimePerInvoice = 2;
  const withAIHoursDaily = 6.7;
  
  const hoursSavedPerWeek = Math.round((currentHoursDaily - withAIHoursDaily) * 7);

  // Time comparison bar chart data
  const timeComparisonData = [
    {
      name: 'Current',
      hours: currentHoursDaily * 7, // Convert to weekly hours
      label: 'Current Process'
    },
    {
      name: 'With SPAIK',
      hours: withAIHoursDaily * 7, // Convert to weekly hours  
      label: 'With SPAIK AI'
    }
  ];

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side: Process Comparison */}
          <div 
            className="bg-white rounded-lg border p-8"
            style={{ 
              borderColor: '#2D1B69',
              borderWidth: '2px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <h3 className="text-xl font-bold mb-8 text-center" style={{ color: '#2D1B69' }}>
              Process Comparison
            </h3>
            
            {/* Side-by-side Current vs With SPAIK AI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Current Process */}
              <div 
                className="p-6 rounded-lg border-l-4"
                style={{ backgroundColor: '#FEF2F2', borderColor: '#DC2626' }}
              >
                <h4 className="text-lg font-bold mb-6 text-center" style={{ color: '#DC2626' }}>
                  CURRENT
                </h4>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                      {currentInvoicesPerDay}
                    </div>
                    <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                      invoices/day
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                      {currentTimePerInvoice} min
                    </div>
                    <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                      per invoice
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                      {currentHoursDaily} hrs
                    </div>
                    <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                      daily work
                    </div>
                  </div>
                </div>
              </div>
              
              {/* With SPAIK AI */}
              <div 
                className="p-6 rounded-lg border-l-4"
                style={{ backgroundColor: '#EEF2FF', borderColor: '#2D1B69' }}
              >
                <h4 className="text-lg font-bold mb-6 text-center" style={{ color: '#2D1B69' }}>
                  WITH SPAIK AI
                </h4>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                      {withAIInvoicesPerDay}
                    </div>
                    <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                      invoices/day
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                      {withAITimePerInvoice} min
                    </div>
                    <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                      per invoice
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                      {withAIHoursDaily} hrs
                    </div>
                    <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                      daily work
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Highlight */}
            <div className="pt-6 border-t text-center" style={{ borderColor: '#2D1B69' }}>
              <div 
                className="inline-block px-6 py-4 rounded-lg border-2"
                style={{ backgroundColor: '#F0FDF4', borderColor: '#10B981' }}
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-xl mr-3">💡</span>
                  <span className="text-2xl font-bold" style={{ color: '#2D1B69' }}>
                    Save {hoursSavedPerWeek} Hours Per Week
                  </span>
                </div>
                <div className="text-base font-medium" style={{ color: '#6B7280' }}>
                  That's {Math.round(hoursSavedPerWeek * 52)} hours per year!
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Side: Financial Impact */}
          <div 
            className="bg-white rounded-lg border p-8"
            style={{ 
              borderColor: '#2D1B69',
              borderWidth: '2px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <h3 className="text-xl font-bold mb-8 text-center" style={{ color: '#2D1B69' }}>
              Financial Impact
            </h3>
            
            <div className="space-y-6 mb-8">
              
              <div 
                className="p-4 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#2D1B69' }}
              >
                <div className="text-sm font-medium mb-2" style={{ color: '#2D1B69' }}>
                  Monthly Savings
                </div>
                <div className="text-2xl font-bold" style={{ color: '#2D1B69' }}>
                  {formatCurrency(data.monthlySavings)}
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  (6.7 hrs/day × €25/hr × 22 days)
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#6366F1' }}
              >
                <div className="text-sm font-medium mb-2" style={{ color: '#6366F1' }}>
                  Break-even Period
                </div>
                <div className="text-2xl font-bold" style={{ color: '#2D1B69' }}>
                  {roi.breakEvenMonths} months
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#8B5CF6' }}
              >
                <div className="text-sm font-medium mb-2" style={{ color: '#8B5CF6' }}>
                  3-Year ROI
                </div>
                <div className="text-2xl font-bold" style={{ color: '#2D1B69' }}>
                  {roi.roi}%
                </div>
              </div>
              
            </div>

            {/* Total Value Highlight */}
            <div className="pt-6 border-t text-center" style={{ borderColor: '#2D1B69' }}>
              <div 
                className="p-6 rounded-lg border-2"
                style={{ 
                  backgroundColor: '#EEF2FF',
                  borderColor: '#2D1B69'
                }}
              >
                <div className="text-sm font-medium mb-3" style={{ color: '#2D1B69' }}>
                  Total 3-Year Value
                </div>
                <div className="text-4xl font-bold" style={{ color: '#2D1B69' }}>
                  {formatCurrency(roi.threeYearSavings)}
                </div>
                <div className="text-base font-medium mt-2" style={{ color: '#6B7280' }}>
                  Your complete return on investment
                </div>
              </div>
            </div>
              
          </div>

        </div>
      </div>
    </section>
  );
};