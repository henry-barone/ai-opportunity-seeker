// Utility function to trigger notification when new visualization is created
export function triggerNewVisualizationNotification(visualizationId: string, solutionTitle: string) {
  const event = new CustomEvent('newVisualization', {
    detail: {
      visualizationId,
      solutionTitle,
      timestamp: Date.now()
    }
  });
  
  window.dispatchEvent(event);
}

// Function to simulate webhook data arrival for testing
export function simulateWebhookData() {
  const testData = {
    id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
    timestamp: new Date().toISOString(),
    userInfo: {
      name: "Test User",
      email: "test@example.com",
      company: "Test Company",
      industry: "Technology"
    },
    recommendation: {
      type: "time_saving" as const,
      title: "Customer Support Automation",
      description: "Automated customer support system to handle common inquiries",
      currentState: {
        description: "Currently spending 8 hours per day on customer support",
        painPoints: [
          "High volume of repetitive questions",
          "Long response times",
          "Staff burnout from routine tasks",
          "Inconsistent response quality"
        ],
        metrics: {
          timeSpent: 8,
          errorRate: 15,
          cost: 1200
        }
      },
      futureState: {
        description: "Automated system handles 80% of inquiries instantly",
        benefits: [
          "Instant response to common questions",
          "24/7 availability",
          "Consistent service quality",
          "Staff focus on complex issues"
        ],
        metrics: {
          timeSpent: 2,
          errorRate: 3,
          cost: 300
        }
      },
      improvement: {
        percentage: 75,
        absoluteValue: 6,
        unit: "hours",
        description: "Save 6 hours per day"
      },
      implementationTimeline: "2-3 weeks",
      confidence: 0.9
    },
    calculatedMetrics: {
      weeklySavings: {
        hours: 30,
        cost: 4500
      },
      yearlySavings: {
        hours: 1560,
        cost: 234000
      },
      roi: {
        implementationCost: 8000,
        breakEvenWeeks: 2,
        yearOneROI: 2825
      }
    }
  };

  // Store in localStorage to simulate API data
  localStorage.setItem(`visualization_${testData.id}`, JSON.stringify(testData));
  
  // Trigger notification
  triggerNewVisualizationNotification(testData.id, testData.recommendation.title);
  
  return testData;
}

// Make it available globally for testing
(window as any).simulateWebhook = simulateWebhookData;