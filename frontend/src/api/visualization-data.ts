export interface VisualizationData {
  id: string;
  timestamp: string;
  userInfo: {
    email?: string;
    name?: string;
    company?: string;
    industry?: string;
  };
  recommendation: {
    type: 'time_saving' | 'error_reduction' | 'capacity_increase' | 'cost_reduction' | 'response_time' | 'generic';
    title: string;
    description: string;
    currentState: {
      description: string;
      painPoints: string[];
      metrics: {
        timeSpent?: number;
        errorRate?: number;
        capacity?: number;
        cost?: number;
        responseTime?: number;
      };
    };
    futureState: {
      description: string;
      benefits: string[];
      metrics: {
        timeSpent?: number;
        errorRate?: number;
        capacity?: number;
        cost?: number;
        responseTime?: number;
      };
    };
    improvement: {
      percentage: number;
      absoluteValue: number;
      unit: string;
      description: string;
    };
    implementationTimeline: string;
    confidence: number;
  };
  chatHistory?: string[];
  sessionId?: string;
}

// In-memory storage for demonstration (in production, use a database)
let visualizationDataStore: VisualizationData[] = [];

export const visualizationDataAPI = {
  // Store new visualization data
  store: (data: VisualizationData): Promise<{ success: boolean; id: string }> => {
    return new Promise((resolve) => {
      // Generate ID if not provided
      if (!data.id) {
        data.id = `vis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Add timestamp if not provided
      if (!data.timestamp) {
        data.timestamp = new Date().toISOString();
      }

      // Store the data
      visualizationDataStore.push(data);
      
      // Keep only last 100 entries to prevent memory issues
      if (visualizationDataStore.length > 100) {
        visualizationDataStore = visualizationDataStore.slice(-100);
      }

      resolve({ success: true, id: data.id });
    });
  },

  // Retrieve visualization data by ID
  getById: (id: string): Promise<VisualizationData | null> => {
    return new Promise((resolve) => {
      const data = visualizationDataStore.find(item => item.id === id);
      resolve(data || null);
    });
  },

  // Get all visualization data (for admin purposes)
  getAll: (): Promise<VisualizationData[]> => {
    return new Promise((resolve) => {
      resolve([...visualizationDataStore]);
    });
  },

  // Clear all data (for testing purposes)
  clear: (): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      visualizationDataStore = [];
      resolve({ success: true });
    });
  }
};

// Validation function
export const validateVisualizationData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!data.recommendation) {
    errors.push('recommendation is required');
  } else {
    if (!data.recommendation.type) {
      errors.push('recommendation.type is required');
    }
    if (!data.recommendation.title) {
      errors.push('recommendation.title is required');
    }
    if (!data.recommendation.description) {
      errors.push('recommendation.description is required');
    }
  }

  // Validate recommendation type
  const validTypes = ['time_saving', 'error_reduction', 'capacity_increase', 'cost_reduction', 'response_time', 'generic'];
  if (data.recommendation?.type && !validTypes.includes(data.recommendation.type)) {
    errors.push(`recommendation.type must be one of: ${validTypes.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
};