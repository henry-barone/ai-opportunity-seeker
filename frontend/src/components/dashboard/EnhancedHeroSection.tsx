import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardData } from '@/utils/dashboardHelpers';

interface EnhancedHeroSectionProps {
  data: DashboardData;
}

export const EnhancedHeroSection = ({ data }: EnhancedHeroSectionProps) => {
  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <Card className="border shadow-sm" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
          <CardContent className="p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#2D1B69' }}>
              Free Up {data.hoursSaved} Hours Weekly
            </h1>
            <p className="text-xl md:text-2xl mb-6" style={{ color: '#64748B' }}>
              on Accounts Payable Processing
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#2D1B69' }}>
                <Clock className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#F8FAFC' }}>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-base font-semibold" style={{ color: '#64748B' }}>Current Process</div>
                  <div className="text-2xl font-bold" style={{ color: '#2D1B69' }}>40 invoices/day</div>
                  <div className="text-sm" style={{ color: '#64748B' }}>(20 minutes each)</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-base font-semibold" style={{ color: '#64748B' }}>With SPAIK Automation</div>
                  <div className="text-2xl font-bold" style={{ color: '#6366F1' }}>200 invoices/day</div>
                  <div className="text-sm" style={{ color: '#64748B' }}>(2 minutes each)</div>
                </div>
              </div>
            </div>

            <div className="text-xl font-bold" style={{ color: '#2D1B69' }}>
              Transform Your Back Office
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};