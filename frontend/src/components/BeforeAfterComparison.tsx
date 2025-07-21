import { useState, useEffect } from 'react';
import { Clock, TrendingDown, TrendingUp, Zap } from 'lucide-react';

interface BeforeAfterComparisonProps {
  currentValue: number;
  futureValue: number;
  unit: string;
  label: string;
  type: 'time' | 'cost' | 'errors' | 'capacity';
  animationDelay?: number;
}

export function BeforeAfterComparison({ 
  currentValue, 
  futureValue, 
  unit, 
  label, 
  type,
  animationDelay = 0 
}: BeforeAfterComparisonProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [currentAnimatedValue, setCurrentAnimatedValue] = useState(currentValue);

  const maxValue = Math.max(currentValue, futureValue);
  const currentPercentage = (currentValue / maxValue) * 100;
  const futurePercentage = (futureValue / maxValue) * 100;
  const improvement = ((currentValue - futureValue) / currentValue) * 100;

  const getIcon = () => {
    switch (type) {
      case 'time': return Clock;
      case 'cost': return TrendingDown;
      case 'errors': return TrendingDown;
      case 'capacity': return TrendingUp;
      default: return Zap;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'time': return 'blue';
      case 'cost': return 'green';
      case 'errors': return 'red';
      case 'capacity': return 'purple';
      default: return 'blue';
    }
  };

  const Icon = getIcon();
  const color = getColor();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      
      // Animate the value change
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 fps
      const stepDuration = duration / steps;
      const valueChange = futureValue - currentValue;
      const stepChange = valueChange / steps;
      
      let step = 0;
      const valueTimer = setInterval(() => {
        step++;
        setCurrentAnimatedValue(currentValue + (stepChange * step));
        
        if (step >= steps) {
          setCurrentAnimatedValue(futureValue);
          clearInterval(valueTimer);
        }
      }, stepDuration);
      
      return () => clearInterval(valueTimer);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [currentValue, futureValue, animationDelay]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'red' ? 'bg-red-100' : 'bg-purple-100'}`}>
          <Icon className={`h-6 w-6 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-600' : 'text-purple-600'}`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500">Before vs After Comparison</p>
        </div>
      </div>

      {/* Visual Bars */}
      <div className="space-y-6">
        {/* Current State Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">Current</span>
            <span className="text-sm font-bold text-red-700">
              {currentValue.toFixed(1)} {unit}
            </span>
          </div>
          <div className="relative h-8 bg-red-100 rounded-lg overflow-hidden">
            <div 
              className={`
                h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg
                transition-all duration-1000 ease-out
                ${isAnimated ? 'opacity-100' : 'opacity-70'}
              `}
              style={{ 
                width: `${currentPercentage}%`,
                transform: isAnimated ? 'scaleX(1)' : 'scaleX(0.8)',
                transformOrigin: 'left'
              }}
            />
          </div>
        </div>

        {/* Animated Arrow */}
        <div className="flex justify-center">
          <div className={`
            transform transition-all duration-1000 delay-500
            ${isAnimated ? 'scale-110 rotate-0' : 'scale-100 rotate-12'}
          `}>
            <TrendingDown className={`h-8 w-8 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-600' : 'text-purple-600'} animate-bounce`} />
          </div>
        </div>

        {/* Future State Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">After Automation</span>
            <span className="text-sm font-bold text-green-700">
              {currentAnimatedValue.toFixed(1)} {unit}
            </span>
          </div>
          <div className="relative h-8 bg-green-100 rounded-lg overflow-hidden">
            <div 
              className={`
                h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg
                transition-all duration-1500 ease-out delay-1000
                ${isAnimated ? 'opacity-100' : 'opacity-70'}
              `}
              style={{ 
                width: `${isAnimated ? futurePercentage : currentPercentage}%`,
                transform: isAnimated ? 'scaleX(1)' : 'scaleX(0.8)',
                transformOrigin: 'left'
              }}
            />
          </div>
        </div>
      </div>

      {/* Improvement Badge */}
      <div className={`
        mt-6 p-4 rounded-lg border transform transition-all duration-1000 delay-1500
        ${color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' : 
          color === 'green' ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : 
          color === 'red' ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200' : 
          'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200'}
        ${isAnimated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${color === 'blue' ? 'text-blue-700' : color === 'green' ? 'text-green-700' : color === 'red' ? 'text-red-700' : 'text-purple-700'}`}>
            {improvement.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600">
            {type === 'capacity' ? 'Increase' : 'Reduction'}
          </div>
        </div>
      </div>

      {/* Animation Pulse Effect */}
      <div className={`
        absolute inset-0 rounded-xl border-2 animate-pulse transition-opacity duration-2000
        ${color === 'blue' ? 'border-blue-300' : color === 'green' ? 'border-green-300' : color === 'red' ? 'border-red-300' : 'border-purple-300'}
        ${isAnimated ? 'opacity-0' : 'opacity-30'}
      `} />
    </div>
  );
}