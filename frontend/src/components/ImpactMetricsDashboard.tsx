import { useState, useEffect } from 'react';
import { Clock, Euro, TrendingDown, TrendingUp, Calendar, Users, Zap, Target } from 'lucide-react';

// Helper function to get Tailwind color classes
function getColorClasses(color: string) {
  const colorMap: Record<string, { bg100: string; text600: string; text700: string; bg200: string }> = {
    blue: { bg100: 'bg-blue-100', text600: 'text-blue-600', text700: 'text-blue-700', bg200: 'bg-blue-200' },
    indigo: { bg100: 'bg-indigo-100', text600: 'text-indigo-600', text700: 'text-indigo-700', bg200: 'bg-indigo-200' },
    purple: { bg100: 'bg-purple-100', text600: 'text-purple-600', text700: 'text-purple-700', bg200: 'bg-purple-200' },
    green: { bg100: 'bg-green-100', text600: 'text-green-600', text700: 'text-green-700', bg200: 'bg-green-200' },
    emerald: { bg100: 'bg-emerald-100', text600: 'text-emerald-600', text700: 'text-emerald-700', bg200: 'bg-emerald-200' },
    teal: { bg100: 'bg-teal-100', text600: 'text-teal-600', text700: 'text-teal-700', bg200: 'bg-teal-200' },
    orange: { bg100: 'bg-orange-100', text600: 'text-orange-600', text700: 'text-orange-700', bg200: 'bg-orange-200' },
    red: { bg100: 'bg-red-100', text600: 'text-red-600', text700: 'text-red-700', bg200: 'bg-red-200' }
  };
  return colorMap[color] || colorMap.blue;
}

interface MetricsData {
  weeklyHoursSaved: number;
  yearlyHoursSaved: number;
  weeklyCostSaved: number;
  yearlyCostSaved: number;
  improvementPercentage: number;
  errorReduction?: number;
  capacityIncrease?: number;
}

interface ImpactMetricsDashboardProps {
  metrics: MetricsData;
  animationDelay?: number;
}

interface AnimatedMetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  animationDelay: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedMetricCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  color, 
  animationDelay,
  prefix = '',
  suffix = ''
}: AnimatedMetricCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Animate the number if it's numeric
      if (typeof value === 'number') {
        const duration = 1500;
        const steps = 60;
        const stepDuration = duration / steps;
        const stepValue = value / steps;
        
        let step = 0;
        const valueTimer = setInterval(() => {
          step++;
          setAnimatedValue(stepValue * step);
          
          if (step >= steps) {
            setAnimatedValue(value);
            clearInterval(valueTimer);
          }
        }, stepDuration);
        
        return () => clearInterval(valueTimer);
      }
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [value, animationDelay]);

  const displayValue = typeof value === 'number' ? 
    (animatedValue < 1 ? animatedValue.toFixed(2) : Math.round(animatedValue).toLocaleString()) : 
    value;

  return (
    <div className={`
      bg-white rounded-xl shadow-lg p-6 border border-gray-100
      transform transition-all duration-700 ease-out
      ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color).bg100}`}>
          <Icon className={`h-6 w-6 ${getColorClasses(color).text600}`} />
        </div>
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${getColorClasses(color).bg100} ${getColorClasses(color).text700}
        `}>
          {title}
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className={`text-3xl font-bold mb-1 ${getColorClasses(color).text700}`}>
          {prefix}{displayValue}{suffix}
        </div>
        <div className="text-sm text-gray-600">{subtitle}</div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4">
        <div className={`h-2 rounded-full overflow-hidden ${getColorClasses(color).bg100}`}>
          <div 
            className={`
              h-full rounded-full transition-all duration-1000
              ${color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                color === 'indigo' ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' :
                color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                color === 'teal' ? 'bg-gradient-to-r from-teal-500 to-teal-600' :
                color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                'bg-gradient-to-r from-red-500 to-red-600'}
              ${isVisible ? 'w-full' : 'w-0'}
            `}
          />
        </div>
      </div>
    </div>
  );
}

export function ImpactMetricsDashboard({ metrics, animationDelay = 0 }: ImpactMetricsDashboardProps) {
  const [currentTab, setCurrentTab] = useState<'time' | 'cost' | 'quality'>('time');

  const timeMetrics = [
    {
      icon: Clock,
      title: 'Daily Savings',
      value: metrics.weeklyHoursSaved / 5, // Convert weekly to daily
      subtitle: 'Hours saved per day',
      color: 'blue',
      suffix: 'h'
    },
    {
      icon: Calendar,
      title: 'Weekly Savings',
      value: metrics.weeklyHoursSaved,
      subtitle: 'Hours saved per week',
      color: 'indigo',
      suffix: 'h'
    },
    {
      icon: TrendingUp,
      title: 'Yearly Savings',
      value: metrics.yearlyHoursSaved,
      subtitle: 'Hours saved annually',
      color: 'purple',
      suffix: 'h'
    }
  ];

  const costMetrics = [
    {
      icon: Euro,
      title: 'Weekly Savings',
      value: metrics.weeklyCostSaved,
      subtitle: 'Cost savings per week',
      color: 'green',
      prefix: '€'
    },
    {
      icon: TrendingUp,
      title: 'Monthly Savings',
      value: metrics.weeklyCostSaved * 4.33, // Approximate weeks per month
      subtitle: 'Cost savings per month',
      color: 'emerald',
      prefix: '€'
    },
    {
      icon: Target,
      title: 'Yearly Savings',
      value: metrics.yearlyCostSaved,
      subtitle: 'Total annual savings',
      color: 'teal',
      prefix: '€'
    }
  ];

  const qualityMetrics = [
    {
      icon: TrendingUp,
      title: 'Efficiency Gain',
      value: metrics.improvementPercentage,
      subtitle: 'Overall improvement',
      color: 'orange',
      suffix: '%'
    },
    {
      icon: TrendingDown,
      title: 'Error Reduction',
      value: metrics.errorReduction || 75,
      subtitle: 'Fewer mistakes made',
      color: 'red',
      suffix: '%'
    },
    {
      icon: Users,
      title: 'Capacity Increase',
      value: metrics.capacityIncrease || 40,
      subtitle: 'More work handled',
      color: 'purple',
      suffix: '%'
    }
  ];

  const getCurrentMetrics = () => {
    switch (currentTab) {
      case 'time': return timeMetrics;
      case 'cost': return costMetrics;
      case 'quality': return qualityMetrics;
      default: return timeMetrics;
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Impact Metrics Dashboard</h3>
          <p className="text-sm text-gray-600">Comprehensive view of your automation benefits</p>
        </div>
        
        {/* Tab Selector */}
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setCurrentTab('time')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${currentTab === 'time' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <Clock className="h-4 w-4 inline mr-2" />
            Time
          </button>
          <button
            onClick={() => setCurrentTab('cost')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${currentTab === 'cost' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <Euro className="h-4 w-4 inline mr-2" />
            Cost
          </button>
          <button
            onClick={() => setCurrentTab('quality')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${currentTab === 'quality' 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <Zap className="h-4 w-4 inline mr-2" />
            Quality
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getCurrentMetrics().map((metric, index) => (
          <AnimatedMetricCard
            key={`${currentTab}-${index}`}
            icon={metric.icon}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            color={metric.color}
            animationDelay={animationDelay + (index * 200)}
            prefix={metric.prefix}
            suffix={metric.suffix}
          />
        ))}
      </div>

      {/* Summary Card */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900">Impact Summary</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <div className="font-medium text-gray-900 mb-1">Time Investment</div>
            <div className="text-blue-600">
              Save {metrics.weeklyHoursSaved} hours weekly = {(metrics.weeklyHoursSaved * 52).toLocaleString()} hours yearly
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="font-medium text-gray-900 mb-1">Financial Impact</div>
            <div className="text-green-600">
              €{metrics.yearlyCostSaved.toLocaleString()} annual savings at current scale
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="font-medium text-gray-900 mb-1">Efficiency Boost</div>
            <div className="text-purple-600">
              {metrics.improvementPercentage}% improvement in process efficiency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}