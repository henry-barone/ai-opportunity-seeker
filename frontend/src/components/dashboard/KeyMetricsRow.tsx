import { Euro, TrendingUp, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardData, formatCurrency, calculateROI } from '@/utils/dashboardHelpers';

interface KeyMetricsRowProps {
  data: DashboardData;
}

export const KeyMetricsRow = ({ data }: KeyMetricsRowProps) => {
  const roi = calculateROI(data.monthlySavings);

  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#2D1B69' }}>
            Your Financial Impact
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            Based on typical automation implementations for businesses like yours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Monthly Savings */}
          <Card className="border shadow-sm hover:shadow-md transition-all duration-300" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
                <Euro className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                {formatCurrency(data.monthlySavings)}
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: '#2D1B69' }}>
                Monthly Savings
              </div>
              <div className="text-sm" style={{ color: '#64748B' }}>
                Potential cost reduction
              </div>
            </CardContent>
          </Card>

          {/* Break-Even Period */}
          <Card className="border shadow-sm hover:shadow-md transition-all duration-300" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6366F1' }}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                {roi.breakEvenMonths} months
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: '#2D1B69' }}>
                Break-Even Period
              </div>
              <div className="text-sm" style={{ color: '#64748B' }}>
                Time to positive ROI
              </div>
            </CardContent>
          </Card>

          {/* 3-Year ROI */}
          <Card className="border shadow-sm hover:shadow-md transition-all duration-300" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#8B5CF6' }}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                {roi.roi}%
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: '#2D1B69' }}>
                3-Year ROI
              </div>
              <div className="text-sm" style={{ color: '#64748B' }}>
                Return on investment
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm max-w-3xl mx-auto" style={{ color: '#64748B' }}>
            Calculations based on current manual processing costs of €35-50/hour. 
            Results vary by business size and current processes.
          </p>
        </div>
      </div>
    </section>
  );
};