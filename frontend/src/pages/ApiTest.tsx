import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

interface TestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  data?: any;
  error?: string;
  duration?: number;
}

export function ApiTest() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-opportunity-seeker.vercel.app';

  const tests = [
    {
      name: 'Health Check',
      endpoint: '/health',
      method: 'GET'
    },
    {
      name: 'API Root',
      endpoint: '/',
      method: 'GET'
    },
    {
      name: 'Create Test Data',
      endpoint: '/api/test-data',
      method: 'GET'
    },
    {
      name: 'Webhook Status',
      endpoint: '/webhook/status',
      method: 'GET'
    },
    {
      name: 'Test Webhook',
      endpoint: '/webhook/visualization-data',
      method: 'POST',
      body: {
        userInfo: {
          name: "Test User",
          email: "test@example.com"
        },
        recommendation: {
          type: "time_saving",
          title: "API Test Process",
          description: "Testing the webhook integration",
          currentState: {
            metrics: {
              timeSpent: 10
            }
          },
          futureState: {
            metrics: {
              timeSpent: 3
            }
          }
        }
      }
    }
  ];

  const runSingleTest = async (test: typeof tests[0]): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      const options: RequestInit = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(test.body && { body: JSON.stringify(test.body) })
      };

      const response = await fetch(`${apiUrl}${test.endpoint}`, options);
      const data = await response.json();
      const duration = Date.now() - startTime;

      if (response.ok) {
        return {
          endpoint: test.name,
          status: 'success',
          data,
          duration
        };
      } else {
        return {
          endpoint: test.name,
          status: 'error',
          error: `HTTP ${response.status}: ${data.message || data.error || 'Unknown error'}`,
          duration
        };
      }
    } catch (error) {
      return {
        endpoint: test.name,
        status: 'error',
        error: error instanceof Error ? error.message : 'Network error',
        duration: Date.now() - startTime
      };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);

    // Initialize all tests as pending
    const pendingResults: TestResult[] = tests.map(test => ({
      endpoint: test.name,
      status: 'pending'
    }));
    setResults(pendingResults);

    // Run tests sequentially
    for (let i = 0; i < tests.length; i++) {
      const result = await runSingleTest(tests[i]);
      
      setResults(prev => 
        prev.map((item, index) => 
          index === i ? result : item
        )
      );

      // Small delay between tests
      if (i < tests.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SPAIK API Test Suite
          </h1>
          <p className="text-gray-600 mb-4">
            Test the complete integration between frontend and Vercel API
          </p>
          <p className="text-sm text-gray-500">
            API URL: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{apiUrl}</span>
          </p>
        </div>

        <div className="mb-6 text-center">
          <Button 
            onClick={runAllTests} 
            disabled={isRunning}
            size="lg"
            className="px-8"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Running Tests...
              </>
            ) : (
              'Run All Tests'
            )}
          </Button>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={index} className="transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    {result.endpoint}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {result.duration && (
                      <span>{result.duration}ms</span>
                    )}
                    <span className={getStatusColor(result.status)}>
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              {(result.data || result.error) && (
                <CardContent>
                  {result.status === 'success' && result.data && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-700">Response:</span>
                        {result.data.viewUrl && (
                          <a 
                            href={`/visualization/${result.data.id}`}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Visualization
                          </a>
                        )}
                      </div>
                      <pre className="bg-green-50 p-3 rounded text-xs overflow-auto text-green-800">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {result.status === 'error' && result.error && (
                    <div>
                      <span className="text-sm font-medium text-red-700">Error:</span>
                      <pre className="bg-red-50 p-3 rounded text-xs overflow-auto text-red-800 mt-1">
                        {result.error}
                      </pre>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {results.length > 0 && (
          <div className="mt-8 text-center">
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <CardDescription>
                  <strong>Test Summary:</strong>{' '}
                  {results.filter(r => r.status === 'success').length} passed, {' '}
                  {results.filter(r => r.status === 'error').length} failed, {' '}
                  {results.filter(r => r.status === 'pending').length} pending
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>1. <strong>All tests pass?</strong> Your API is working correctly!</p>
              <p>2. <strong>Got a visualization ID?</strong> Click "View Visualization" to see the frontend display.</p>
              <p>3. <strong>Ready for Voiceflow?</strong> Use the webhook URL: <code className="bg-gray-200 px-1 rounded">{apiUrl}/webhook/visualization-data</code></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}