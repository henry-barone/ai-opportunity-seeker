import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface BeforeAfterComparisonProps {
  beforeTitle: string;
  afterTitle: string;
  beforeValue: string;
  afterValue: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  beforeColor?: string;
  afterColor?: string;
  improvement?: string;
  animated?: boolean;
  className?: string;
}

export function BeforeAfterComparison({
  beforeTitle,
  afterTitle,
  beforeValue,
  afterValue,
  beforeIcon,
  afterIcon,
  beforeColor = '#EF4444',
  afterColor = '#10B981',
  improvement,
  animated = true,
  className = ''
}: BeforeAfterComparisonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  return (
    <div className={`relative ${className}`}>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Before State */}
        <div className={`
          relative p-6 rounded-2xl border-2 transition-all duration-700
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
        `} style={{ 
          borderColor: beforeColor,
          backgroundColor: `${beforeColor}10`
        }}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                 style={{ backgroundColor: `${beforeColor}20` }}>
              {beforeIcon || <TrendingDown className="h-8 w-8" style={{ color: beforeColor }} />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{beforeTitle}</h3>
            <div className="text-3xl font-bold mb-2" style={{ color: beforeColor }}>
              {beforeValue}
            </div>
            <div className="text-sm text-gray-600">Current State</div>
          </div>
        </div>

        {/* After State */}
        <div className={`
          relative p-6 rounded-2xl border-2 transition-all duration-700 delay-300
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
        `} style={{ 
          borderColor: afterColor,
          backgroundColor: `${afterColor}10`
        }}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                 style={{ backgroundColor: `${afterColor}20` }}>
              {afterIcon || <TrendingUp className="h-8 w-8" style={{ color: afterColor }} />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{afterTitle}</h3>
            <div className="text-3xl font-bold mb-2" style={{ color: afterColor }}>
              {afterValue}
            </div>
            <div className="text-sm text-gray-600">With AI</div>
          </div>
        </div>
      </div>

      {/* Arrow and Improvement */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`
          hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border-2 border-gray-200
          transition-all duration-500 delay-500
          ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}>
          <ArrowRight className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      {/* Improvement Banner */}
      {improvement && (
        <div className={`
          mt-6 text-center transition-all duration-700 delay-700
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">{improvement}</span>
          </div>
        </div>
      )}
    </div>
  );
}