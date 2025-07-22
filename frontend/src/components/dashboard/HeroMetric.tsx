import { Clock } from "lucide-react";
import { DashboardData } from '@/utils/dashboardHelpers';

interface HeroMetricProps {
  data: DashboardData;
}

export const HeroMetric = ({ data }: HeroMetricProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        Save {data.hoursSaved} Hours Per Week
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-6">
        on Accounts Payable Processing
      </p>
      
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Clock className="w-10 h-10 text-blue-600" />
        </div>
      </div>
    </div>
  );
};