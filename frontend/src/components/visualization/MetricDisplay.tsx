import React from 'react';
import { Clock, Euro, TrendingUp, Target, Users, Zap } from 'lucide-react';

interface MetricDisplayProps {
  value: string | number;
  unit: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

export function MetricDisplay({
  value,
  unit,
  label,
  icon,
  color = '#6B46C1',
  size = 'medium',
  animated = true,
  className = ''
}: MetricDisplayProps) {
  const getIcon = () => {
    if (icon) return icon;
    
    // Auto-detect icon based on unit
    if (unit.includes('hour') || unit.includes('minute') || unit.includes('time')) {
      return <Clock className="h-full w-full" />;
    }
    if (unit.includes('€') || unit.includes('euro') || unit.includes('cost')) {
      return <Euro className="h-full w-full" />;
    }
    if (unit.includes('%') || unit.includes('percent')) {
      return <TrendingUp className="h-full w-full" />;
    }
    if (unit.includes('order') || unit.includes('task') || unit.includes('per')) {
      return <Target className="h-full w-full" />;
    }
    if (unit.includes('people') || unit.includes('employee')) {
      return <Users className="h-full w-full" />;
    }
    return <Zap className="h-full w-full" />;
  };

  const sizeClasses = {
    small: {
      container: 'p-4',
      icon: 'h-8 w-8',
      value: 'text-2xl',
      unit: 'text-sm',
      label: 'text-xs'
    },
    medium: {
      container: 'p-6',
      icon: 'h-10 w-10',
      value: 'text-3xl',
      unit: 'text-base',
      label: 'text-sm'
    },
    large: {
      container: 'p-8',
      icon: 'h-12 w-12',
      value: 'text-4xl',
      unit: 'text-lg',
      label: 'text-base'
    }
  };

  const sizeClass = sizeClasses[size];

  return (
    <div className={`
      bg-white rounded-2xl shadow-lg border border-gray-100 text-center
      ${sizeClass.container}
      ${animated ? 'transition-all duration-500 hover:shadow-xl hover:-translate-y-1' : ''}
      ${className}
    `}>
      <div className={`
        inline-flex items-center justify-center rounded-full mb-4
        ${sizeClass.icon}
      `} style={{ 
        backgroundColor: `${color}20`,
        color: color 
      }}>
        {getIcon()}
      </div>
      
      <div className={`
        font-bold text-gray-900 mb-1
        ${sizeClass.value}
      `}>
        {value}
      </div>
      
      <div className={`
        font-medium text-gray-600 mb-2
        ${sizeClass.unit}
      `}>
        {unit}
      </div>
      
      <div className={`
        text-gray-500 uppercase tracking-wide
        ${sizeClass.label}
      `}>
        {label}
      </div>
    </div>
  );
}