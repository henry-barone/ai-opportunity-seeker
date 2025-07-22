import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingDown, Zap, FileText, CheckCircle } from "lucide-react";
import { DashboardData } from '@/utils/dashboardHelpers';

interface VisualComparisonProps {
  data: DashboardData;
}

export const VisualComparison = ({ data }: VisualComparisonProps) => {
  const [beforeProgress, setBeforeProgress] = useState(0);
  const [afterProgress, setAfterProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate specific before/after scenarios
  const currentInvoicesPerDay = 40;
  const currentTimePerInvoice = 20; // minutes
  const futureInvoicesPerDay = 200;
  const futureTimePerInvoice = 2; // minutes
  
  const currentTotalTime = (currentInvoicesPerDay * currentTimePerInvoice) / 60; // hours per day
  const futureTotalTime = (futureInvoicesPerDay * futureTimePerInvoice) / 60; // hours per day
  
  const maxTime = Math.max(currentTotalTime, 16); // For visualization scaling
  const efficiencyGain = Math.round(((currentTotalTime - futureTotalTime) / currentTotalTime) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate progress bars
      setTimeout(() => setBeforeProgress((currentTotalTime / maxTime) * 100), 200);
      setTimeout(() => setAfterProgress((futureTotalTime / maxTime) * 100), 800);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentTotalTime, futureTotalTime, maxTime]);

  return (
    <div className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Process Transformation Overview
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            See how automation fits your accounts payable workflow
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Based on typical small to medium business processing volumes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Before */}
          <Card className={`border border-slate-200 bg-white shadow-lg transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Current Manual Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">
                  {currentInvoicesPerDay} invoices/day
                </div>
                <div className="text-slate-600 font-medium">
                  {currentTimePerInvoice} minutes each
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>Daily Processing Time</span>
                  <span>{currentTotalTime.toFixed(1)} hours</span>
                </div>
                <Progress 
                  value={beforeProgress} 
                  className="h-4 bg-slate-200" 
                />
              </div>

              <div className="bg-slate-100 rounded-lg p-4">
                <div className="text-sm font-medium text-slate-700 mb-2">Current Challenges:</div>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Manual data entry and validation</li>
                  <li>• 3-5% error rate requiring corrections</li>
                  <li>• Limited processing capacity</li>
                  <li>• Staff time on repetitive tasks</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* After */}
          <Card className={`border border-slate-200 bg-white shadow-lg transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">AI-Assisted Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  {futureInvoicesPerDay} invoices/day
                </div>
                <div className="text-slate-600 font-medium">
                  {futureTimePerInvoice} minutes each
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>Daily Processing Time</span>
                  <span>{futureTotalTime.toFixed(1)} hours</span>
                </div>
                <Progress 
                  value={afterProgress} 
                  className="h-4 bg-green-200" 
                />
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm font-medium text-slate-700 mb-2">Automation Benefits:</div>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Automated data extraction and validation</li>
                  <li>• 95-98% accuracy improvement</li>
                  <li>• 5x processing capacity increase</li>
                  <li>• Staff focus on exception handling</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Summary */}
        <div className={`text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <Card className="inline-block bg-gradient-to-r from-slate-700 to-slate-800 text-white border-0 shadow-xl max-w-3xl">
            <CardContent className="px-8 py-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-2xl font-bold text-slate-200 mb-2">
                    {efficiencyGain}% Processing Efficiency Gain
                  </div>
                  <div className="text-sm text-slate-300">
                    Free up {data.hoursSaved} hours per week for strategic work
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-200 mb-1">Trusted by</div>
                  <div className="text-3xl font-bold text-slate-200">50+</div>
                  <div className="text-sm text-slate-300">businesses</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};