import { CheckCircle } from 'lucide-react';
import { DashboardData } from '@/utils/dashboardHelpers';

interface AutomationHeroProps {
  data: DashboardData;
}

export const AutomationHero = ({ data }: AutomationHeroProps) => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-12 text-center bg-white" style={{ borderColor: '#E5E7EB' }}>
          
          {/* Personalized Analysis Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: '#E5E7EB', color: '#1F2937' }}>
              <CheckCircle className="w-4 h-4 mr-2" style={{ color: '#10B981' }} />
              Personalized Analysis
            </div>
          </div>
          
          <h1 className="text-4xl font-semibold mb-6 leading-tight" style={{ color: '#1F2937' }}>
            {data.recommendation || 'Accounts Payable Process Automation'}
          </h1>
          
          <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
            Automate invoice data extraction, validation, and approval workflows to eliminate manual processing bottlenecks and reduce human error.
          </p>
          
        </div>
      </div>
    </section>
  );
};