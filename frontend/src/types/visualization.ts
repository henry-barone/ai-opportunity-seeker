import { VisualizationParams } from '@/utils/urlParams';

export interface VisualTemplate {
  id: string;
  name: string;
  description: string;
  requiredMetrics: string[];
  component: string;
  theme: {
    beforeColor: string;
    afterColor: string;
    accentColor: string;
  };
  defaultMetrics: {
    [key: string]: string | number;
  };
}

export interface ImpactStatement {
  before: string;
  after: string;
  category: 'time' | 'stress' | 'quality' | 'growth' | 'financial';
}

export interface VisualData {
  template: VisualTemplate;
  metrics: {
    primary: { value: number; unit: string; label: string };
    secondary?: { value: number; unit: string; label: string };
    improvement: { value: number; unit: string; label: string };
  };
  impacts: ImpactStatement[];
  params: VisualizationParams;
}

export const VISUAL_TEMPLATES: Record<string, VisualTemplate> = {
  'time-saving': {
    id: 'time-saving',
    name: 'Time Savings',
    description: 'Shows how much time will be saved with AI automation',
    requiredMetrics: ['current', 'future', 'frequency'],
    component: 'TimeSavingTemplate',
    theme: {
      beforeColor: '#EF4444', // Red
      afterColor: '#10B981', // Green
      accentColor: '#6B46C1'  // Purple
    },
    defaultMetrics: {
      current: '3h',
      future: '30m',
      frequency: 'daily'
    }
  },
  'error-reduction': {
    id: 'error-reduction',
    name: 'Error Reduction',
    description: 'Demonstrates quality improvements and error reduction',
    requiredMetrics: ['errors', 'reduction'],
    component: 'ErrorReductionTemplate',
    theme: {
      beforeColor: '#F59E0B', // Amber
      afterColor: '#059669', // Emerald
      accentColor: '#6B46C1'
    },
    defaultMetrics: {
      errors: '50',
      reduction: '90'
    }
  },
  'capacity-increase': {
    id: 'capacity-increase',
    name: 'Capacity Increase',
    description: 'Shows throughput and capacity improvements',
    requiredMetrics: ['current', 'future', 'unit'],
    component: 'CapacityIncreaseTemplate',
    theme: {
      beforeColor: '#DC2626', // Red
      afterColor: '#0891B2', // Cyan
      accentColor: '#6B46C1'
    },
    defaultMetrics: {
      current: '20',
      future: '50',
      unit: 'orders per day'
    }
  },
  'cost-reduction': {
    id: 'cost-reduction',
    name: 'Cost Reduction',
    description: 'Highlights financial savings and cost reductions',
    requiredMetrics: ['current', 'future', 'frequency'],
    component: 'CostReductionTemplate',
    theme: {
      beforeColor: '#B91C1C', // Red
      afterColor: '#047857', // Green
      accentColor: '#6B46C1'
    },
    defaultMetrics: {
      current: '€500',
      future: '€150',
      frequency: 'monthly'
    }
  },
  'response-time': {
    id: 'response-time',
    name: 'Response Time',
    description: 'Shows improvements in customer service response times',
    requiredMetrics: ['current', 'future'],
    component: 'ResponseTimeTemplate',
    theme: {
      beforeColor: '#EA580C', // Orange
      afterColor: '#0D9488', // Teal
      accentColor: '#6B46C1'
    },
    defaultMetrics: {
      current: '2 hours',
      future: '5 minutes'
    }
  },
  'generic': {
    id: 'generic',
    name: 'Business Improvement',
    description: 'General template for various business improvements',
    requiredMetrics: ['current', 'future'],
    component: 'GenericTemplate',
    theme: {
      beforeColor: '#7C2D12', // Red-brown
      afterColor: '#065F46', // Green-dark
      accentColor: '#6B46C1'
    },
    defaultMetrics: {
      current: 'Manual process',
      future: 'AI-powered automation'
    }
  }
};

export function getTemplateForType(type: string): VisualTemplate {
  return VISUAL_TEMPLATES[type] || VISUAL_TEMPLATES['generic'];
}

export function validateTemplateMetrics(template: VisualTemplate, params: VisualizationParams): boolean {
  return template.requiredMetrics.every(metric => {
    const value = params[metric as keyof VisualizationParams];
    return value !== undefined && value !== null && value !== '';
  });
}