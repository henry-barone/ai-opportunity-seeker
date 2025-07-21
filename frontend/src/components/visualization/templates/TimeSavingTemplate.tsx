import React, { useState } from 'react';
import { Clock, TrendingUp, Calendar } from 'lucide-react';
import { BeforeAfterComparison } from '../BeforeAfterComparison';
import { MetricDisplay } from '../MetricDisplay';
import { ImpactList } from '../ImpactList';
import { SingleSlider } from '../SingleSlider';
import { VisualData } from '@/types/visualization';
import { calculateTimeSavings, calculateCostSavings, parseTimeValue, formatTime } from '@/utils/urlParams';

interface TimeSavingTemplateProps {
  data: VisualData;
}

export function TimeSavingTemplate({ data }: TimeSavingTemplateProps) {
  const [frequency, setFrequency] = useState(1);
  const { template, metrics, impacts, params } = data;
  
  const currentTime = parseTimeValue(params.current);
  const futureTime = parseTimeValue(params.future);
  
  const timeSavings = calculateTimeSavings(params.current, params.future, params.frequency);
  const costSavings = calculateCostSavings(timeSavings.yearlySavings, 25);
  
  const adjustedSavings = {
    daily: timeSavings.dailySavings * frequency,
    weekly: timeSavings.weeklySavings * frequency,
    monthly: timeSavings.monthlySavings * frequency,
    yearly: timeSavings.yearlySavings * frequency
  };

  const formatSavings = (minutes: number) => {
    return minutes >= 60 ? `${(minutes / 60).toFixed(1)}h` : `${Math.round(minutes)}m`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Transform Your {params.task} Process
        </h1>
        <p className="text-lg text-gray-600">
          See how AI can save you precious time every day
        </p>
      </div>

      {/* Before/After Comparison */}
      <BeforeAfterComparison
        beforeTitle="Current Process"
        afterTitle="With AI Automation"
        beforeValue={formatTime(currentTime.value, currentTime.unit)}
        afterValue={formatTime(futureTime.value, futureTime.unit)}
        beforeIcon={<Clock className="h-8 w-8" />}
        afterIcon={<TrendingUp className="h-8 w-8" />}
        beforeColor={template.theme.beforeColor}
        afterColor={template.theme.afterColor}
        improvement={`${Math.round(((currentTime.value - futureTime.value) / currentTime.value) * 100)}% time reduction`}
      />

      {/* Frequency Slider */}
      <SingleSlider
        label={`How many times do you handle ${params.task} ${params.frequency}?`}
        value={frequency}
        min={1}
        max={20}
        step={1}
        unit="times"
        onChange={setFrequency}
        description={`Adjust to see your personalized time savings based on your actual usage.`}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricDisplay
          value={formatSavings(adjustedSavings.daily)}
          unit="saved daily"
          label="Time Savings"
          icon={<Clock className="h-full w-full" />}
          color={template.theme.afterColor}
        />
        <MetricDisplay
          value={formatSavings(adjustedSavings.weekly)}
          unit="saved weekly"
          label="Weekly Impact"
          icon={<Calendar className="h-full w-full" />}
          color={template.theme.accentColor}
        />
        <MetricDisplay
          value={`€${Math.round(costSavings * frequency)}`}
          unit="saved yearly"
          label="Annual Value"
          icon={<TrendingUp className="h-full w-full" />}
          color={template.theme.afterColor}
        />
      </div>

      {/* Impact Statements */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Real Impact on Your Life
        </h2>
        <ImpactList impacts={impacts} />
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Time Savings Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{formatSavings(adjustedSavings.daily)}</div>
            <div className="text-sm text-gray-600">Daily</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{formatSavings(adjustedSavings.weekly)}</div>
            <div className="text-sm text-gray-600">Weekly</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{formatSavings(adjustedSavings.monthly)}</div>
            <div className="text-sm text-gray-600">Monthly</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{Math.round(adjustedSavings.yearly / 60)}h</div>
            <div className="text-sm text-gray-600">Yearly</div>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4">
          That's {Math.round(adjustedSavings.yearly / 60 / 8)} full working days back in your year!
        </p>
      </div>
    </div>
  );
}