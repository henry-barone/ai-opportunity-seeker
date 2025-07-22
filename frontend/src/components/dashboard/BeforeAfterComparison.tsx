import { ArrowRight } from 'lucide-react';
import { DashboardData } from '@/utils/dashboardHelpers';

interface BeforeAfterComparisonProps {
  data: DashboardData;
}

export const BeforeAfterComparison = ({ data }: BeforeAfterComparisonProps) => {
  const currentInvoicesPerDay = 40;
  const currentTimePerInvoice = 20;
  const currentHoursDaily = 13.3;
  
  const withAIInvoicesPerDay = 200;
  const withAITimePerInvoice = 2;
  const withAIHoursDaily = 6.7;
  
  const hoursSavedPerWeek = Math.round((currentHoursDaily - withAIHoursDaily) * 7);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Current State */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-8" style={{ color: '#1F2937' }}>
              CURRENT
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>
                  {currentInvoicesPerDay} invoices/day
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>
                  {currentTimePerInvoice} min each
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                  {currentHoursDaily} hrs daily
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D1B69' }}>
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* With AI State */}
          <div className="text-center lg:text-right">
            <h3 className="text-2xl font-bold mb-8" style={{ color: '#2D1B69' }}>
              WITH AI
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>
                  {withAIInvoicesPerDay} invoices/day
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>
                  {withAITimePerInvoice} min each
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold" style={{ color: '#10B981' }}>
                  {withAIHoursDaily} hrs daily
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="text-center mt-16">
          <div className="text-4xl font-bold" style={{ color: '#10B981' }}>
            Save {hoursSavedPerWeek} Hours Per Week
          </div>
        </div>
      </div>
    </section>
  );
};