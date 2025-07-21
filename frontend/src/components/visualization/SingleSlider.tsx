import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

interface SingleSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
  description?: string;
  className?: string;
}

export function SingleSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  description,
  className = ''
}: SingleSliderProps) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    const val = newValue[0];
    setCurrentValue(val);
    onChange(val);
  };

  const formatValue = (val: number) => {
    if (unit === 'hours' && val >= 1) {
      return `${val}h`;
    } else if (unit === 'minutes' || (unit === 'hours' && val < 1)) {
      const minutes = unit === 'hours' ? val * 60 : val;
      return `${Math.round(minutes)}m`;
    }
    return `${val} ${unit}`;
  };

  return (
    <div className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-gray-900">
            {label}
          </label>
          <div className="text-2xl font-bold text-primary">
            {formatValue(currentValue)}
          </div>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentValue]}
            onValueChange={handleValueChange}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        </div>

        {description && (
          <p className="text-sm text-gray-600 mt-3">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}