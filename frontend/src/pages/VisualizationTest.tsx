import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Eye, FileText, Loader2, BarChart3, ExternalLink, Globe } from 'lucide-react';
import { BusinessImpactButton } from '../components/BusinessImpactButton';
import { sendToWebhookSite, WEBHOOK_TEST_URL } from '../utils/webhook-test';

export function VisualizationTest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [webhookSiteResult, setWebhookSiteResult] = useState<any>(null);

  // New webhook format data
  const webhookData = `task:invoice_processing
current:3_hours
future:20_minutes
type:time_saving
frequency:daily`;

  // Legacy format data
  const sampleData = {
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
  };

  const sendTestData = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // For demonstration, we'll store in localStorage since we don't have a running server
      const dataWithId = {
        ...sampleData,
        id: `vis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for demo purposes
      localStorage.setItem(`visualization_${dataWithId.id}`, JSON.stringify(dataWithId));

      // Simulate API call
      const response = await new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            id: dataWithId.id,
            message: 'Visualization data received successfully'
          });
        }, 1000);
      });

      setResult(response);
    } catch (err) {
      console.error('Error sending test data:', err);
      setError(err instanceof Error ? err.message : 'Failed to send test data');
    } finally {
      setLoading(false);
    }
  };

  const sendToAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/visualization-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      console.error('Error sending to API:', err);
      setError(err instanceof Error ? err.message : 'Failed to send to API');
    } finally {
      setLoading(false);
    }
  };

  const sendToWebhook = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/webhook/visualization-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      console.error('Error sending to webhook:', err);
      setError(err instanceof Error ? err.message : 'Failed to send to webhook');
    } finally {
      setLoading(false);
    }
  };

  const sendWebhookFormat = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/webhook/visualization-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: webhookData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      console.error('Error sending webhook format:', err);
      setError(err instanceof Error ? err.message : 'Failed to send webhook format');
    } finally {
      setLoading(false);
    }
  };

  const sendToWebhookSiteTest = async (format: 'new' | 'legacy') => {
    setLoading(true);
    setError(null);
    setWebhookSiteResult(null);

    try {
      const result = await sendToWebhookSite(format);
      setWebhookSiteResult(result);
    } catch (err) {
      console.error('Error sending to webhook.site:', err);
      setError(err instanceof Error ? err.message : 'Failed to send to webhook.site');
    } finally {
      setLoading(false);
    }
  };

  const viewVisualization = (id: string) => {
    navigate(`/visualization/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Visualization HTTP POST Test
          </h1>

          {/* API Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Webhook Endpoint Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Primary URL:</strong> <code>POST /webhook/visualization-data</code></p>
              <p><strong>Legacy URL:</strong> <code>POST /api/visualization-data</code></p>
              <p><strong>Content-Type:</strong> <code>application/json</code></p>
              <p><strong>Security:</strong> <code>X-Webhook-Signature (SHA256 HMAC)</code></p>
              <p><strong>Expected Response:</strong> <code>{'{ "success": true, "id": "vis_xxx", "viewUrl": "/visualization/xxx" }'}</code></p>
            </div>
          </div>

          {/* Webhook.site Testing */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              External Webhook Testing
            </h2>
            <div className="space-y-3 text-sm mb-4">
              <p><strong>Test URL:</strong> <code>{WEBHOOK_TEST_URL}</code></p>
              <p className="text-green-700">Send webhook data to external service for testing and inspection</p>
              <a 
                href={WEBHOOK_TEST_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 underline"
              >
                <ExternalLink className="h-4 w-4" />
                View webhook.site dashboard
              </a>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => sendToWebhookSiteTest('new')}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Test New Format
              </button>
              <button
                onClick={() => sendToWebhookSiteTest('legacy')}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Test Legacy Format
              </button>
            </div>
          </div>

          {/* Sample Data */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sample Data Structures</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">New Webhook Format</h3>
              <pre className="bg-white p-4 rounded border text-xs overflow-x-auto">
                {webhookData}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Legacy JSON Format</h3>
              <pre className="bg-white p-4 rounded border text-xs overflow-x-auto">
                {JSON.stringify(sampleData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={sendTestData}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              Test with Local Storage
            </button>
            <button
              onClick={sendWebhookFormat}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              Test New Format
            </button>
            <button
              onClick={sendToWebhook}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              Send to Webhook (JSON)
            </button>
            <button
              onClick={sendToAPI}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              Send to API (Legacy)
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Success Response
              </h2>
              <pre className="bg-white p-4 rounded border text-sm overflow-x-auto mb-4">
                {JSON.stringify(result, null, 2)}
              </pre>
              {result.id && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => viewVisualization(result.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    View Visualization
                  </button>
                  
                  <div className="border-t pt-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Business Impact Visualization:</h3>
                    <BusinessImpactButton visualizationId={result.id} />
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-red-800 mb-4">Error</h2>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Webhook.site Results */}
          {webhookSiteResult && (
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Webhook.site Response
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    webhookSiteResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {webhookSiteResult.success ? 'SUCCESS' : 'FAILED'}
                  </span>
                  <a 
                    href={WEBHOOK_TEST_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 underline text-sm"
                  >
                    View on webhook.site
                  </a>
                </div>
                
                {webhookSiteResult.success && (
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Status:</strong> Successfully sent to webhook.site
                    </p>
                    <p className="text-sm text-gray-600">
                      Check the webhook.site dashboard to see the received data and headers.
                    </p>
                  </div>
                )}
                
                {webhookSiteResult.error && (
                  <div className="bg-red-50 p-4 rounded border border-red-200">
                    <p className="text-sm text-red-700">
                      <strong>Error:</strong> {webhookSiteResult.error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documentation */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Integration Instructions
            </h2>
            <div className="space-y-4 text-sm text-yellow-700">
              <p>
                <strong>1. Send POST request to:</strong> <code>/api/visualization-data</code>
              </p>
              <p>
                <strong>2. Include JSON data with:</strong> userInfo, recommendation (with type, title, description, currentState, futureState, improvement, implementationTimeline, confidence)
              </p>
              <p>
                <strong>3. Receive response with:</strong> success status, generated ID, and confirmation message
              </p>
              <p>
                <strong>4. Use the ID to view:</strong> <code>/visualization/{'{id}'}</code>
              </p>
              <p>
                <strong>5. Supported recommendation types:</strong> time_saving, error_reduction, capacity_increase, cost_reduction, response_time, generic
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}