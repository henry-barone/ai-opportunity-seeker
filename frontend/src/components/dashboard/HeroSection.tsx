import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Euro, TrendingUp, Users } from "lucide-react";
import { DashboardData, animateValue, formatCurrency, calculateROI } from '@/utils/dashboardHelpers';

interface HeroSectionProps {
  data: DashboardData;
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [animatedHours, setAnimatedHours] = useState(0);
  const [animatedMonths, setAnimatedMonths] = useState(0);
  const [animatedROI, setAnimatedROI] = useState(0);

  const roi = calculateROI(data.monthlySavings);

  useEffect(() => {
    // Animate numbers with different delays for visual impact
    setTimeout(() => {
      animateValue(0, data.hoursSaved, 1800, setAnimatedHours);
    }, 300);
    
    setTimeout(() => {
      animateValue(0, data.monthlySavings, 2200, setAnimatedSavings);
    }, 600);
    
    setTimeout(() => {
      animateValue(0, roi.breakEvenMonths, 1500, setAnimatedMonths);
    }, 900);
    
    setTimeout(() => {
      animateValue(0, roi.roi, 2000, setAnimatedROI);
    }, 1200);
  }, [data.monthlySavings, data.hoursSaved, roi.breakEvenMonths, roi.roi]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></div>
            SPAIK Automation Analysis
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Streamline Your Operations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            <span className="font-semibold text-slate-700">Accounts Payable Process Automation</span> could enhance your business efficiency
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Based on analysis of similar automation implementations
          </p>
        </div>

        {/* Primary Metric - Time Saved (50% larger) */}
        <div className="mb-8">
          <Card className="max-w-md mx-auto border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <div className="text-5xl md:text-6xl font-bold text-slate-800 mb-3">
                {animatedHours}
              </div>
              <div className="text-xl font-medium text-slate-600 mb-2">Hours Freed Up Per Week</div>
              <div className="text-sm text-gray-500">Redirect staff from paperwork to customer service</div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Monthly Savings */}
          <Card className="border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Euro className="w-8 h-8 text-slate-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {formatCurrency(animatedSavings)}
              </div>
              <div className="text-slate-600 font-medium mb-1">Potential Monthly Savings</div>
              <div className="text-xs text-gray-500">Results vary by business size</div>
            </CardContent>
          </Card>

          {/* Break-even */}
          <Card className="border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-slate-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {animatedMonths}
              </div>
              <div className="text-slate-600 font-medium mb-1">Months to Break-even</div>
              <div className="text-xs text-gray-500">Typical setup: 2-4 weeks</div>
            </CardContent>
          </Card>

          {/* ROI */}
          <Card className="border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-slate-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {animatedROI}%
              </div>
              <div className="text-slate-600 font-medium mb-1">Typical ROI over 3 years</div>
              <div className="text-xs text-gray-500">Cost efficiency improvement</div>
            </CardContent>
          </Card>
        </div>

        {/* Key Value Propositions */}
        <div className="text-center">
          <Card className="inline-block bg-gradient-to-r from-slate-700 to-slate-800 text-white border-0 shadow-xl max-w-4xl">
            <CardContent className="px-8 py-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-lg font-semibold text-slate-200 mb-1">Time Savings</div>
                  <div className="text-sm text-slate-300">Free up {data.hoursSaved} hours per week for strategic work</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-200 mb-1">Cost Efficiency</div>
                  <div className="text-sm text-slate-300">Typical ROI: {roi.roi}% over 3 years</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-200 mb-1">Business Growth</div>
                  <div className="text-sm text-slate-300">95-98% accuracy improvement over manual processes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Methodology Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 max-w-3xl mx-auto">
            Calculations assume current manual processing costs of €35-50/hour. 
            Small to medium businesses typically see results within this range based on current processes and business size.
          </p>
        </div>
      </div>
    </div>
  );
};