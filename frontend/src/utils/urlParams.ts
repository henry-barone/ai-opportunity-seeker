export interface VisualizationParams {
  type: 'time-saving' | 'error-reduction' | 'capacity-increase' | 'cost-reduction' | 'response-time' | 'generic';
  task: string;
  current: string;
  future: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  unit?: string;
  errors?: string;
  reduction?: string;
  businessType?: string;
  industry?: string;
  employees?: string;
}

export const DEFAULT_PARAMS: VisualizationParams = {
  type: 'generic',
  task: 'business process',
  current: '2h',
  future: '30m',
  frequency: 'daily',
  unit: 'hours',
  errors: '10',
  reduction: '80',
  businessType: 'manufacturing',
  industry: 'Manufacturing',
  employees: '50-200'
};

export function parseUrlParams(searchParams: URLSearchParams): VisualizationParams {
  const params: VisualizationParams = {
    type: validateType(searchParams.get('type')) || DEFAULT_PARAMS.type,
    task: searchParams.get('task') || DEFAULT_PARAMS.task,
    current: searchParams.get('current') || DEFAULT_PARAMS.current,
    future: searchParams.get('future') || DEFAULT_PARAMS.future,
    frequency: validateFrequency(searchParams.get('frequency')) || DEFAULT_PARAMS.frequency,
    unit: searchParams.get('unit') || DEFAULT_PARAMS.unit,
    errors: searchParams.get('errors') || DEFAULT_PARAMS.errors,
    reduction: searchParams.get('reduction') || DEFAULT_PARAMS.reduction,
    businessType: searchParams.get('businessType') || DEFAULT_PARAMS.businessType,
    industry: searchParams.get('industry') || DEFAULT_PARAMS.industry,
    employees: searchParams.get('employees') || DEFAULT_PARAMS.employees
  };

  return params;
}

function validateType(type: string | null): VisualizationParams['type'] | null {
  const validTypes: VisualizationParams['type'][] = [
    'time-saving', 'error-reduction', 'capacity-increase', 'cost-reduction', 'response-time', 'generic'
  ];
  return type && validTypes.includes(type as VisualizationParams['type']) 
    ? type as VisualizationParams['type'] 
    : null;
}

function validateFrequency(frequency: string | null): VisualizationParams['frequency'] | null {
  const validFrequencies: VisualizationParams['frequency'][] = ['daily', 'weekly', 'monthly'];
  return frequency && validFrequencies.includes(frequency as VisualizationParams['frequency'])
    ? frequency as VisualizationParams['frequency']
    : null;
}

export function parseTimeValue(timeStr: string): { value: number; unit: string } {
  const match = timeStr.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
  if (!match) {
    return { value: 0, unit: 'minutes' };
  }
  
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  
  // Normalize units
  const normalizedUnit = unit.includes('hour') || unit === 'h' ? 'hours' :
                        unit.includes('minute') || unit === 'm' ? 'minutes' :
                        unit.includes('second') || unit === 's' ? 'seconds' :
                        unit;
  
  return { value, unit: normalizedUnit };
}

export function formatTime(value: number, unit: string): string {
  if (unit === 'hours' && value >= 1) {
    return `${value}h`;
  } else if (unit === 'hours' && value < 1) {
    return `${Math.round(value * 60)}m`;
  } else if (unit === 'minutes') {
    return `${Math.round(value)}m`;
  } else if (unit === 'seconds') {
    return `${Math.round(value)}s`;
  }
  return `${value} ${unit}`;
}

export function calculateTimeSavings(current: string, future: string, frequency: string): {
  dailySavings: number;
  weeklySavings: number;
  monthlySavings: number;
  yearlySavings: number;
  unit: string;
} {
  const currentTime = parseTimeValue(current);
  const futureTime = parseTimeValue(future);
  
  // Convert everything to minutes for calculation
  const currentMinutes = currentTime.unit === 'hours' ? currentTime.value * 60 : currentTime.value;
  const futureMinutes = futureTime.unit === 'hours' ? futureTime.value * 60 : futureTime.value;
  
  const savingsPerTask = Math.max(0, currentMinutes - futureMinutes);
  
  // Calculate based on frequency
  const dailyTasks = frequency === 'daily' ? 1 : frequency === 'weekly' ? 1/7 : 1/30;
  const dailySavings = savingsPerTask * dailyTasks;
  
  return {
    dailySavings: dailySavings,
    weeklySavings: dailySavings * 7,
    monthlySavings: dailySavings * 30,
    yearlySavings: dailySavings * 365,
    unit: savingsPerTask >= 60 ? 'hours' : 'minutes'
  };
}

export function calculateCostSavings(timeSavings: number, hourlyRate: number = 25): number {
  // Convert minutes to hours if needed
  const hoursSaved = timeSavings >= 60 ? timeSavings / 60 : timeSavings / 60;
  return hoursSaved * hourlyRate;
}