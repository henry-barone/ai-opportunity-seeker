import { ImpactStatement } from '@/types/visualization';
import { VisualizationParams } from './urlParams';

interface ImpactTemplate {
  task: string[];
  impacts: ImpactStatement[];
}

const IMPACT_TEMPLATES: ImpactTemplate[] = [
  {
    task: ['invoices', 'invoice', 'billing', 'accounting'],
    impacts: [
      {
        before: 'Missing family dinner due to late invoice processing',
        after: 'Home by 6pm every day with automated invoicing',
        category: 'time'
      },
      {
        before: 'Stressed about month-end invoice rush',
        after: 'Calm and organized month-end process',
        category: 'stress'
      },
      {
        before: 'Manual errors in invoice calculations',
        after: '99.9% accuracy with AI validation',
        category: 'quality'
      },
      {
        before: 'Delayed payments due to invoice errors',
        after: 'Faster payments with error-free invoices',
        category: 'financial'
      }
    ]
  },
  {
    task: ['quotes', 'quotation', 'estimates', 'pricing'],
    impacts: [
      {
        before: 'Weekend work to prepare urgent quotes',
        after: 'Weekends free with instant quote generation',
        category: 'time'
      },
      {
        before: 'Losing deals due to slow quote turnaround',
        after: 'Winning more deals with 5-minute quotes',
        category: 'growth'
      },
      {
        before: 'Pricing mistakes leading to lost profit',
        after: 'Consistent profit margins with smart pricing',
        category: 'financial'
      },
      {
        before: 'Stress from complex quote calculations',
        after: 'Confident quotes with automated calculations',
        category: 'stress'
      }
    ]
  },
  {
    task: ['inventory', 'stock', 'warehouse', 'supply'],
    impacts: [
      {
        before: 'Stockouts causing customer disappointment',
        after: 'Always having what customers need',
        category: 'quality'
      },
      {
        before: 'Hours spent on manual stock counts',
        after: 'Real-time inventory tracking',
        category: 'time'
      },
      {
        before: 'Overstock tying up valuable cash',
        after: 'Optimized inventory levels',
        category: 'financial'
      },
      {
        before: 'Warehouse chaos and lost items',
        after: 'Organized, efficient warehouse operations',
        category: 'stress'
      }
    ]
  },
  {
    task: ['scheduling', 'planning', 'calendar', 'appointments'],
    impacts: [
      {
        before: 'Double-bookings embarrassing your business',
        after: 'Perfect scheduling with no conflicts',
        category: 'quality'
      },
      {
        before: 'Hours spent juggling schedules',
        after: 'Automated scheduling saves 2+ hours daily',
        category: 'time'
      },
      {
        before: 'Stressed employees dealing with schedule chaos',
        after: 'Happy team with predictable schedules',
        category: 'stress'
      },
      {
        before: 'Underutilized resources due to poor planning',
        after: 'Maximum efficiency with optimal planning',
        category: 'growth'
      }
    ]
  },
  {
    task: ['customer service', 'support', 'help desk', 'complaints'],
    impacts: [
      {
        before: 'Angry customers waiting hours for responses',
        after: 'Happy customers with instant support',
        category: 'quality'
      },
      {
        before: 'Burnout from handling repetitive queries',
        after: 'Focus on complex issues that matter',
        category: 'stress'
      },
      {
        before: 'Losing customers due to poor service',
        after: 'Retaining customers with excellent service',
        category: 'growth'
      },
      {
        before: 'Working evenings to catch up on tickets',
        after: 'AI handles routine queries 24/7',
        category: 'time'
      }
    ]
  },
  {
    task: ['quality control', 'inspection', 'testing', 'defects'],
    impacts: [
      {
        before: 'Defective products reaching customers',
        after: 'Zero defects with AI-powered inspection',
        category: 'quality'
      },
      {
        before: 'Costly product recalls and complaints',
        after: 'Protected reputation and reduced costs',
        category: 'financial'
      },
      {
        before: 'Stress from quality issues',
        after: 'Confidence in product quality',
        category: 'stress'
      },
      {
        before: 'Slow manual inspection processes',
        after: 'Instant quality verification',
        category: 'time'
      }
    ]
  },
  {
    task: ['orders', 'order processing', 'fulfillment', 'shipping'],
    impacts: [
      {
        before: 'Turning away orders due to capacity limits',
        after: 'Room to grow with automated processing',
        category: 'growth'
      },
      {
        before: 'Late nights processing order backlogs',
        after: 'Orders processed automatically 24/7',
        category: 'time'
      },
      {
        before: 'Shipping errors and unhappy customers',
        after: 'Perfect order accuracy every time',
        category: 'quality'
      },
      {
        before: 'Stressed team during busy periods',
        after: 'Calm operations even during peak times',
        category: 'stress'
      }
    ]
  },
  {
    task: ['data entry', 'data processing', 'admin', 'paperwork'],
    impacts: [
      {
        before: 'Tedious hours of manual data entry',
        after: 'Instant data processing with AI',
        category: 'time'
      },
      {
        before: 'Human errors in data entry',
        after: '99.9% accuracy with automated processing',
        category: 'quality'
      },
      {
        before: 'Employees dreading repetitive tasks',
        after: 'Staff focused on meaningful work',
        category: 'stress'
      },
      {
        before: 'Data delays affecting decisions',
        after: 'Real-time insights for better decisions',
        category: 'growth'
      }
    ]
  }
];

const GENERIC_IMPACTS: ImpactStatement[] = [
  {
    before: 'Working late to handle manual processes',
    after: 'Home on time with automated workflows',
    category: 'time'
  },
  {
    before: 'Stress from repetitive, error-prone tasks',
    after: 'Peace of mind with reliable automation',
    category: 'stress'
  },
  {
    before: 'Inconsistent results from manual work',
    after: 'Consistent, high-quality outcomes',
    category: 'quality'
  },
  {
    before: 'Limited capacity constraining growth',
    after: 'Scalable operations enabling expansion',
    category: 'growth'
  },
  {
    before: 'High operational costs from inefficiency',
    after: 'Reduced costs through automation',
    category: 'financial'
  }
];

export function generateImpactStatements(params: VisualizationParams): ImpactStatement[] {
  const { task, type } = params;
  
  // Find matching template based on task keywords
  const matchingTemplate = IMPACT_TEMPLATES.find(template =>
    template.task.some(keyword => 
      task.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  let impacts = matchingTemplate?.impacts || GENERIC_IMPACTS;

  // Filter impacts based on visualization type
  if (type === 'time-saving') {
    impacts = impacts.filter(impact => impact.category === 'time' || impact.category === 'stress');
  } else if (type === 'error-reduction') {
    impacts = impacts.filter(impact => impact.category === 'quality' || impact.category === 'stress');
  } else if (type === 'capacity-increase') {
    impacts = impacts.filter(impact => impact.category === 'growth' || impact.category === 'time');
  } else if (type === 'cost-reduction') {
    impacts = impacts.filter(impact => impact.category === 'financial' || impact.category === 'growth');
  } else if (type === 'response-time') {
    impacts = impacts.filter(impact => impact.category === 'quality' || impact.category === 'time');
  }

  // Ensure we have at least 3 impacts
  if (impacts.length < 3) {
    impacts = [...impacts, ...GENERIC_IMPACTS.slice(0, 3 - impacts.length)];
  }

  // Return up to 4 impacts
  return impacts.slice(0, 4);
}

export function generateCustomImpact(
  beforeText: string,
  afterText: string,
  category: ImpactStatement['category']
): ImpactStatement {
  return {
    before: beforeText,
    after: afterText,
    category
  };
}

export function getImpactsByCategory(impacts: ImpactStatement[], category: ImpactStatement['category']): ImpactStatement[] {
  return impacts.filter(impact => impact.category === category);
}

export function getPersonalizedImpacts(
  params: VisualizationParams,
  businessType?: string,
  employeeCount?: string
): ImpactStatement[] {
  const baseImpacts = generateImpactStatements(params);
  
  // Customize based on business type
  if (businessType === 'manufacturing') {
    baseImpacts.forEach(impact => {
      if (impact.category === 'time') {
        impact.before = impact.before.replace('Working late', 'Missing production targets');
        impact.after = impact.after.replace('Home on time', 'Meeting production goals');
      }
    });
  } else if (businessType === 'retail') {
    baseImpacts.forEach(impact => {
      if (impact.category === 'quality') {
        impact.before = impact.before.replace('errors', 'customer complaints');
        impact.after = impact.after.replace('accuracy', 'customer satisfaction');
      }
    });
  }

  // Customize based on employee count
  if (employeeCount && employeeCount.includes('50+')) {
    baseImpacts.forEach(impact => {
      if (impact.category === 'growth') {
        impact.before = impact.before.replace('Limited capacity', 'Complex coordination across teams');
        impact.after = impact.after.replace('Scalable operations', 'Streamlined team coordination');
      }
    });
  }

  return baseImpacts;
}