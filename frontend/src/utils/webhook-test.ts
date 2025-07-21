/**
 * Webhook Testing Utility
 * Sends test data to external webhook URLs for testing
 */

export const WEBHOOK_TEST_URL = 'https://webhook.site/9c9dd13f-b6f0-41f4-a647-cb10bd929677';

export interface WebhookTestData {
  format: 'new' | 'legacy';
  data: any;
}

export const testWebhookFormats = {
  new: {
    name: 'New Webhook Format',
    contentType: 'text/plain',
    data: `task:invoice_processing
current:3_hours
future:20_minutes
type:time_saving
frequency:daily`
  },
  legacy: {
    name: 'Legacy JSON Format',
    contentType: 'application/json',
    data: {
      userInfo: {
        email: "test@example.com",
        name: "John Doe",
        company: "Tech Corp",
        industry: "Software Development"
      },
      recommendation: {
        type: "time_saving",
        title: "Automated Document Processing",
        description: "Implement AI-powered document processing to reduce manual data entry",
        currentState: {
          description: "Manual document review and data entry taking 6 hours daily",
          painPoints: [
            "Time-consuming manual work",
            "High error rates in data entry",
            "Bottlenecks during peak periods",
            "Employee burnout from repetitive tasks"
          ],
          metrics: {
            timeSpent: 6,
            errorRate: 12,
            capacity: 100,
            cost: 800
          }
        },
        futureState: {
          description: "AI-powered document processing with automated extraction and validation",
          benefits: [
            "Automated data extraction",
            "Real-time processing",
            "Consistent accuracy",
            "Scalable to any volume"
          ],
          metrics: {
            timeSpent: 1,
            errorRate: 2,
            capacity: 500,
            cost: 300
          }
        },
        improvement: {
          percentage: 83,
          absoluteValue: 5,
          unit: "hours",
          description: "Save 5 hours per day"
        },
        implementationTimeline: "2-4 weeks",
        confidence: 0.85
      },
      chatHistory: [
        "Hello! I'm looking to automate our document processing workflow.",
        "We currently spend 6 hours daily on manual data entry from invoices and contracts.",
        "This is causing delays and errors in our workflow.",
        "Based on your needs, I recommend implementing AI-powered document processing..."
      ],
      sessionId: "session_123456"
    }
  }
};

export async function sendToWebhookSite(format: 'new' | 'legacy'): Promise<{
  success: boolean;
  response?: any;
  error?: string;
}> {
  try {
    const testFormat = testWebhookFormats[format];
    
    const payload = format === 'new' 
      ? testFormat.data 
      : JSON.stringify(testFormat.data);

    const response = await fetch(WEBHOOK_TEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': testFormat.contentType,
        'User-Agent': 'AI-Opportunity-Seeker/1.0.0',
        'X-Test-Format': format,
        'X-Test-Timestamp': new Date().toISOString()
      },
      body: payload
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    
    return {
      success: true,
      response: result
    };
  } catch (error) {
    console.error('Error sending to webhook.site:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function sendCustomDataToWebhookSite(data: any, contentType: string = 'application/json'): Promise<{
  success: boolean;
  response?: any;
  error?: string;
}> {
  try {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);

    const response = await fetch(WEBHOOK_TEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'User-Agent': 'AI-Opportunity-Seeker/1.0.0',
        'X-Test-Custom': 'true',
        'X-Test-Timestamp': new Date().toISOString()
      },
      body: payload
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    
    return {
      success: true,
      response: result
    };
  } catch (error) {
    console.error('Error sending custom data to webhook.site:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}