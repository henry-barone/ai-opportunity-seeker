import React from 'react';
import { X, Check, Clock, Heart, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { ImpactStatement } from '@/types/visualization';

interface ImpactListProps {
  impacts: ImpactStatement[];
  showBefore?: boolean;
  showAfter?: boolean;
  animated?: boolean;
  className?: string;
}

export function ImpactList({
  impacts,
  showBefore = true,
  showAfter = true,
  animated = true,
  className = ''
}: ImpactListProps) {
  const getCategoryIcon = (category: ImpactStatement['category']) => {
    switch (category) {
      case 'time':
        return <Clock className="h-4 w-4" />;
      case 'stress':
        return <Heart className="h-4 w-4" />;
      case 'quality':
        return <TrendingUp className="h-4 w-4" />;
      case 'growth':
        return <TrendingUp className="h-4 w-4" />;
      case 'financial':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {showBefore && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <X className="h-5 w-5 text-red-500 mr-2" />
            Current Challenges
          </h3>
          <div className="space-y-2">
            {impacts.map((impact, index) => (
              <div
                key={`before-${index}`}
                className={`
                  flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-200
                  ${animated ? `transition-all duration-500 delay-${index * 100}` : ''}
                `}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getCategoryIcon(impact.category)}
                </div>
                <div className="flex-1">
                  <span className="text-red-800 font-medium">{impact.before}</span>
                </div>
                <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {showAfter && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            With AI Solution
          </h3>
          <div className="space-y-2">
            {impacts.map((impact, index) => (
              <div
                key={`after-${index}`}
                className={`
                  flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200
                  ${animated ? `transition-all duration-500 delay-${(index + impacts.length) * 100}` : ''}
                `}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getCategoryIcon(impact.category)}
                </div>
                <div className="flex-1">
                  <span className="text-green-800 font-medium">{impact.after}</span>
                </div>
                <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}