import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, Target } from 'lucide-react';
import { BeforeAfterComparison } from '../BeforeAfterComparison';
import { MetricDisplay } from '../MetricDisplay';
import { ImpactList } from '../ImpactList';
import { SingleSlider } from '../SingleSlider';
import { VisualData } from '@/types/visualization';

interface ErrorReductionTemplateProps {
  data: VisualData;
}

export function ErrorReductionTemplate({ data }: ErrorReductionTemplateProps) {
  const [volume, setVolume] = useState(parseInt(data.params.errors || '50'));
  const { template, metrics, impacts, params } = data;
  
  const currentErrors = volume;
  const reductionPercentage = parseInt(params.reduction || '80');
  const futureErrors = Math.round(currentErrors * (1 - reductionPercentage / 100));
  const errorsEliminated = currentErrors - futureErrors;
  
  const calculateMonthlySavings = () => {
    // Assume each error costs €50 to fix on average
    const costPerError = 50;
    return errorsEliminated * costPerError * 30; // Monthly
  };

  const calculateCustomerSatisfaction = () => {
    const currentSatisfaction = Math.max(60, 100 - (currentErrors / 10));
    const futureSatisfaction = Math.min(98, 100 - (futureErrors / 10));
    return { current: currentSatisfaction, future: futureSatisfaction };
  };

  const satisfaction = calculateCustomerSatisfaction();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Eliminate {params.task} Errors
        </h1>
        <p className="text-lg text-gray-600">
          See how AI can transform your quality and reduce costly mistakes
        </p>
      </div>

      {/* Before/After Comparison */}
      <BeforeAfterComparison
        beforeTitle="Current Error Rate"
        afterTitle="With AI Quality Control"
        beforeValue={`${currentErrors}`}
        afterValue={`${futureErrors}`}
        beforeIcon={<AlertTriangle className="h-8 w-8" />}
        afterIcon={<CheckCircle className="h-8 w-8" />}
        beforeColor={template.theme.beforeColor}
        afterColor={template.theme.afterColor}
        improvement={`${reductionPercentage}% error reduction`}
      />

      {/* Volume Slider */}
      <SingleSlider
        label={`How many ${params.task} do you process daily?`}
        value={volume}
        min={10}
        max={500}
        step={10}
        unit="items"
        onChange={setVolume}
        description={`Adjust to see your personalized error reduction impact.`}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricDisplay
          value={errorsEliminated}
          unit="errors eliminated"
          label="Daily Improvement"
          icon={<CheckCircle className="h-full w-full" />}
          color={template.theme.afterColor}
        />
        <MetricDisplay
          value={`${satisfaction.future.toFixed(1)}%`}
          unit="customer satisfaction"
          label="Quality Score"
          icon={<Target className="h-full w-full" />}
          color={template.theme.accentColor}
        />
        <MetricDisplay
          value={`€${Math.round(calculateMonthlySavings())}`}
          unit="saved monthly"
          label="Cost Savings"
          icon={<TrendingUp className="h-full w-full" />}
          color={template.theme.afterColor}
        />
      </div>

      {/* Error Impact Visualization */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Quality Improvement Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Before AI</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Daily Errors</span>
                <span className="font-bold text-red-600">{currentErrors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Error Cost</span>
                <span className="font-bold text-red-600">€{Math.round(currentErrors * 50 * 30)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-bold text-red-600">{satisfaction.current.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">With AI</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Daily Errors</span>
                <span className="font-bold text-green-600">{futureErrors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Error Cost</span>
                <span className="font-bold text-green-600">€{Math.round(futureErrors * 50 * 30)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-bold text-green-600">{satisfaction.future.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statements */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Real Impact on Your Business
        </h2>
        <ImpactList impacts={impacts} />
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Quality Improvement Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{errorsEliminated}</div>
            <div className="text-sm text-gray-600">Errors Eliminated Daily</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{errorsEliminated * 30}</div>
            <div className="text-sm text-gray-600">Monthly Reduction</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">€{Math.round(calculateMonthlySavings())}</div>
            <div className="text-sm text-gray-600">Monthly Savings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{reductionPercentage}%</div>
            <div className="text-sm text-gray-600">Error Reduction</div>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4">
          That's €{Math.round(calculateMonthlySavings() * 12)} saved annually from improved quality!
        </p>
      </div>
    </div>
  );
}