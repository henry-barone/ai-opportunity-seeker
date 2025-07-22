import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Zap, Eye, Bell, TrendingUp, Target, TestTube, MessageCircle } from 'lucide-react';
import { testWebhookIntegration, testSimplifiedWebhook } from '../utils/webhookTester';
import { testWebhookWithDirectNotification, simulateChatExit } from '../utils/directNotificationTrigger';
import universalNotificationSystem from '../utils/universalNotificationSystem';

export function EnhancedDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const handleTestRealWebhook = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      console.log('Testing real webhook integration...');
      setTestResults(prev => [...prev, 'Starting webhook integration test...']);
      
      const visualizationId = await testWebhookIntegration();
      setTestResults(prev => [...prev, `✅ Webhook test successful! Visualization ID: ${visualizationId}`]);
      setTestResults(prev => [...prev, `📱 Watch for notification popup in top-right corner`]);
      
    } catch (error) {
      console.error('Webhook test failed:', error);
      setTestResults(prev => [...prev, `❌ Test failed: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSimplified = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      console.log('Testing simplified webhook format...');
      setTestResults(prev => [...prev, 'Testing simplified format...']);
      
      const visualizationId = await testSimplifiedWebhook();
      setTestResults(prev => [...prev, `✅ Simplified test successful! ID: ${visualizationId}`]);
      
    } catch (error) {
      console.error('Simplified test failed:', error);
      setTestResults(prev => [...prev, `❌ Test failed: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUniversalTest = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      setTestResults(prev => [...prev, '🎯 Starting Universal Notification Test...']);
      setTestResults(prev => [...prev, '🌐 Environment: ' + (window.location.hostname === 'localhost' ? 'Localhost' : 'Production')]);
      setTestResults(prev => [...prev, '⏳ Sending webhook data...']);
      
      const visualizationId = await universalNotificationSystem.testWebhookIntegration();
      setTestResults(prev => [...prev, `✅ Webhook successful! ID: ${visualizationId}`]);
      setTestResults(prev => [...prev, `📱 Notification popup should appear now!`]);
      setTestResults(prev => [...prev, `🔗 Click "View Full Analysis" to see enhanced visualization`]);
      
      // Show system status
      const status = universalNotificationSystem.getStatus();
      setTestResults(prev => [...prev, `📊 System Status: ${JSON.stringify(status, null, 2)}`]);
      
    } catch (error) {
      console.error('Universal test failed:', error);
      setTestResults(prev => [...prev, `❌ Test failed: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualNotification = () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      setTestResults(prev => [...prev, '📱 Triggering manual notification...']);
      const id = universalNotificationSystem.triggerManualNotification();
      setTestResults(prev => [...prev, `✅ Manual notification triggered! ID: ${id}`]);
      setTestResults(prev => [...prev, `👀 Watch for popup in top-right corner`]);
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Manual trigger failed: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateWebhook = () => {
    setIsLoading(true);
    
    // Call the global function to simulate webhook data
    if ((window as any).simulateWebhook) {
      const data = (window as any).simulateWebhook();
      console.log('Simulated webhook data:', data);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      console.error('Webhook simulator not available');
      setIsLoading(false);
    }
  };

  const handleOpenTestVisualization = () => {
    // Create test visualization ID
    const testId = `vis_${Date.now()}_demo`;
    window.open(`/visualization/${testId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Visualization Features Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test the new "wow factor" features including popup notifications, 
            animated charts, ROI timelines, and comprehensive impact dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Universal Test - Works on localhost and production */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Universal Integration Test
              </CardTitle>
              <CardDescription>
                🎯 Works on localhost AND production: webhook → popup → visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleUniversalTest}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 mb-2"
              >
                {isLoading ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Running Universal Test...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Test Complete Flow
                  </>
                )}
              </Button>
              <Button 
                onClick={handleManualNotification}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                <Bell className="h-4 w-4 mr-2" />
                Manual Popup Test
              </Button>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                ⭐ Main test - works everywhere!
              </p>
            </CardContent>
          </Card>

          {/* Individual Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-blue-600" />
                Individual Tests
              </CardTitle>
              <CardDescription>
                Test specific components separately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleTestRealWebhook}
                disabled={isLoading}
                variant="outline"
                className="w-full mb-2"
              >
                <TestTube className="h-4 w-4 mr-2" />
                Test Webhook Only
              </Button>
              <Button 
                onClick={handleTestSimplified}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                Test Simplified Format
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Individual component testing
              </p>
            </CardContent>
          </Card>

          {/* Local Simulation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Local Simulation
              </CardTitle>
              <CardDescription>
                Simulate notification popup without API call
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSimulateWebhook}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Simulate Locally
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Quick test of notification popup only
              </p>
            </CardContent>
          </Card>

          {/* Visualization Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Enhanced Visualization
              </CardTitle>
              <CardDescription>
                View the complete enhanced visualization with all new features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleOpenTestVisualization}
                variant="outline"
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                Open Test Visualization
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Opens a new tab with the enhanced visualization display
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-8 font-mono text-sm">
            <h3 className="text-white font-semibold mb-2">Test Results:</h3>
            {testResults.map((result, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {result}
              </div>
            ))}
          </div>
        )}

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">New Features Included</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Notifications</h3>
              <p className="text-sm text-gray-600">
                Popup notifications when new analysis is ready with direct link to visualization
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Animated Charts</h3>
              <p className="text-sm text-gray-600">
                Before/after comparisons with smooth animations and transition effects
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ROI Timeline</h3>
              <p className="text-sm text-gray-600">
                Interactive investment timeline showing break-even point and cumulative savings
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trust Builders</h3>
              <p className="text-sm text-gray-600">
                Implementation timeline, expertise badges, and success stories
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">🌐 Universal Integration Test Guide</h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-green-800 mb-2">⭐ Main Test - "Test Complete Flow"</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-green-700">
              <li>Click the green "Test Complete Flow" button</li>
              <li>System auto-detects your environment (localhost/production)</li>
              <li>Watch the test results appear in real-time</li>
              <li>A notification popup will appear in the top-right corner</li>
              <li>Click "View Full Analysis" to open the enhanced visualization</li>
              <li>Explore all the "wow factor" features!</li>
            </ol>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">🔧 What Gets Tested:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>✅ Real webhook endpoint</li>
                <li>✅ Pre-calculated data processing</li>
                <li>✅ Immediate notification trigger</li>
                <li>✅ Enhanced visualization display</li>
                <li>✅ New tab opening functionality</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-purple-800 mb-2">🎨 Enhanced Features:</h4>
              <ul className="space-y-1 text-purple-700">
                <li>🎭 Animated before/after charts</li>
                <li>📈 Interactive ROI timeline</li>
                <li>📊 Tabbed metrics dashboard</li>
                <li>🏆 Trust builders & expertise</li>
                <li>⚖️ Business scale slider</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-800">
              <strong>💡 Pro Tip:</strong> Open browser console (F12) to see detailed logs of the integration test process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Also export as default for routing
export default EnhancedDemo;