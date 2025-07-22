import { DashboardData, calculateROI, formatCurrency } from '@/utils/dashboardHelpers';

interface SimpleFinancialImpactProps {
  data: DashboardData;
}

export const SimpleFinancialImpact = ({ data }: SimpleFinancialImpactProps) => {
  const roi = calculateROI(data.monthlySavings);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-12 bg-white text-center" style={{ borderColor: '#E5E7EB' }}>
          
          <h2 className="text-2xl font-semibold mb-12" style={{ color: '#1F2937' }}>
            Financial Impact
          </h2>

          <div className="space-y-8 mb-12">
            <div>
              <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                Monthly Savings: {formatCurrency(data.monthlySavings)}
              </div>
            </div>
            
            <div>
              <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                Break-even Period: {roi.breakEvenMonths} months
              </div>
            </div>
            
            <div>
              <div className="text-xl font-medium" style={{ color: '#1F2937' }}>
                3-Year ROI: {roi.roi}%
              </div>
            </div>
          </div>

          <div className="pt-8 border-t" style={{ borderColor: '#E5E7EB' }}>
            <div className="text-2xl font-semibold" style={{ color: '#1F2937' }}>
              Total Value Over 3 Years: {formatCurrency(roi.threeYearSavings)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};