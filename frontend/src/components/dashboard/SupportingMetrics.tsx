import { DashboardData, formatCurrency, calculateROI } from '@/utils/dashboardHelpers';

interface SupportingMetricsProps {
  data: DashboardData;
}

export const SupportingMetrics = ({ data }: SupportingMetricsProps) => {
  const roi = calculateROI(data.monthlySavings);
  
  return (
    <div className="text-center mb-8 space-y-4">
      <div>
        <div className="text-2xl font-bold text-gray-900">
          Potential Monthly Savings: {formatCurrency(data.monthlySavings)}
        </div>
      </div>
      
      <div>
        <div className="text-xl text-gray-700">
          Typical ROI: {roi.roi}% over 3 years
        </div>
      </div>
    </div>
  );
};