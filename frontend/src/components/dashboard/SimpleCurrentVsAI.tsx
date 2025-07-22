import { ArrowRight } from 'lucide-react';
import { DashboardData } from '@/utils/dashboardHelpers';

interface SimpleCurrentVsAIProps {
  data: DashboardData;
}

export const SimpleCurrentVsAI = ({ data }: SimpleCurrentVsAIProps) => {
  const currentInvoicesPerDay = 40;
  const currentTimePerInvoice = 20;
  const currentHoursDaily = 13.3;
  
  const withAIInvoicesPerDay = 200;
  const withAITimePerInvoice = 2;
  const withAIHoursDaily = 6.7;
  
  const hoursSavedPerWeek = Math.round((currentHoursDaily - withAIHoursDaily) * 7);
  const hoursSavedPerYear = Math.round(hoursSavedPerWeek * 52);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-12 bg-white" style={{ borderColor: '#E5E7EB' }}>
          
          <h2 className="text-2xl font-semibold text-center mb-12" style={{ color: '#1F2937' }}>
            Current vs. With AI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-12">
            
            {/* Current Process */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-8" style={{ color: '#1F2937' }}>
                CURRENT PROCESS
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                    {currentInvoicesPerDay} invoices/day
                  </div>
                </div>
                
                <div>
                  <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                    {currentTimePerInvoice} minutes each
                  </div>
                </div>
                
                <div>
                  <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                    {currentHoursDaily} hours daily
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-8 h-8" style={{ color: '#6B7280' }} />
            </div>

            {/* With SPAIK AI */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-8" style={{ color: '#1F2937' }}>
                WITH SPAIK AI
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                    {withAIInvoicesPerDay} invoices/day
                  </div>
                </div>
                
                <div>
                  <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                    {withAITimePerInvoice} minutes each
                  </div>
                </div>
                
                <div>
                  <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                    {withAIHoursDaily} hours daily
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="text-center pt-8 border-t" style={{ borderColor: '#E5E7EB' }}>
            <div className="mb-2">
              <div className="text-lg font-medium mb-2" style={{ color: '#6B7280' }}>
                ⬇ RESULT ⬇
              </div>
            </div>
            
            <div className="text-2xl font-semibold mb-2" style={{ color: '#1F2937' }}>
              Save {hoursSavedPerWeek} Hours Per Week
            </div>
            
            <div className="text-lg" style={{ color: '#6B7280' }}>
              (That's {hoursSavedPerYear.toLocaleString()} hours per year)
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};