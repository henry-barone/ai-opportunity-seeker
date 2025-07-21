import { useState } from 'react';
import { RecommendationVisualization } from './RecommendationVisualization';
import { parseLleverageMessage } from '../utils/lleverage-parser';
import { generateVisualizationLink } from '../utils/visualization-link-generator';

export function TestVisualizationDemo() {
  const [showVisualization, setShowVisualization] = useState(false);
  const [selectedType, setSelectedType] = useState('time_saving');

  const generateTestData = (type: string) => {
    const testData = {
      time_saving: {
        type: 'chat_complete',
        recommendation: {
          task: 'Document Processing Automation',
          currentState: {
            description: 'Manual document review and data entry taking 6 hours daily',
            painPoints: ['Time-consuming manual work', 'High error rates', 'Bottlenecks during peak periods'],
            metrics: { timeSpent: 6, errorRate: 12 }
          },
          futureState: {
            description: 'AI-powered document processing with automated extraction',
            benefits: ['Automated data extraction', 'Reduced processing time', 'Consistent accuracy'],
            metrics: { timeSpent: 1, errorRate: 2 }
          }
        },
        message: 'I can help automate your document processing to save 5 hours per day and reduce errors by 10%.'
      },
      error_reduction: {
        type: 'session_complete',
        recommendation: {
          task: 'Quality Control Enhancement',
          currentState: {
            description: 'Manual quality checks with 15% error rate',
            painPoints: ['Inconsistent quality checks', 'Human oversight errors', 'Delayed error detection'],
            metrics: { errorRate: 15, capacity: 100 }
          },
          futureState: {
            description: 'AI-powered quality control with automated validation',
            benefits: ['Consistent quality standards', 'Real-time error detection', 'Improved customer satisfaction'],
            metrics: { errorRate: 3, capacity: 100 }
          }
        },
        message: 'AI quality control can reduce your error rate from 15% to 3%, improving customer satisfaction significantly.'
      },
      capacity_increase: {
        type: 'recommendation_ready',
        recommendation: {
          task: 'Customer Service Scaling',
          currentState: {
            description: 'Limited customer service capacity handling 100 requests daily',
            painPoints: ['Limited support hours', 'Queue delays', 'Scalability constraints'],
            metrics: { capacity: 100, responseTime: 4 }
          },
          futureState: {
            description: 'AI-powered customer service handling 500+ requests daily',
            benefits: ['24/7 availability', 'Instant responses', 'Unlimited scalability'],
            metrics: { capacity: 500, responseTime: 0.5 }
          }
        },
        message: 'AI customer service can increase your capacity from 100 to 500+ requests daily while reducing response time.'
      },
      cost_reduction: {
        type: 'chat_complete',
        recommendation: {
          task: 'Operations Cost Optimization',
          currentState: {
            description: 'Monthly operational costs of €2,500 for manual processes',
            painPoints: ['High labor costs', 'Inefficient resource usage', 'Scaling expenses'],
            metrics: { cost: 2500, timeSpent: 40 }
          },
          futureState: {
            description: 'Automated operations reducing costs to €800 monthly',
            benefits: ['Reduced labor costs', 'Efficient resource usage', 'Scalable automation'],
            metrics: { cost: 800, timeSpent: 10 }
          }
        },
        message: 'Automation can reduce your monthly operational costs from €2,500 to €800, saving €1,700 per month.'
      },
      response_time: {
        type: 'session_complete',
        recommendation: {
          task: 'Customer Response Optimization',
          currentState: {
            description: 'Average customer response time of 24 hours',
            painPoints: ['Long response delays', 'Business hours limitation', 'Customer frustration'],
            metrics: { responseTime: 24, capacity: 50 }
          },
          futureState: {
            description: 'AI-powered instant responses within 2 minutes',
            benefits: ['Instant acknowledgment', '24/7 availability', 'Improved customer experience'],
            metrics: { responseTime: 0.033, capacity: 50 }
          }
        },
        message: 'AI can reduce your customer response time from 24 hours to 2 minutes, dramatically improving customer satisfaction.'
      }
    };

    return testData[type as keyof typeof testData];
  };

  const handleTestVisualization = () => {
    setShowVisualization(true);
  };

  const handleCloseVisualization = () => {
    setShowVisualization(false);
  };

  const testData = generateTestData(selectedType);
  const parsedData = parseLleverageMessage(testData);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        AI Recommendation Visualization Demo
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Different Scenarios</h2>
        <p className="text-medium-grey mb-6">
          Select a recommendation type to see how the visualization adapts to different AI suggestions:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setSelectedType('time_saving')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'time_saving' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-blue-600 text-2xl mb-2">⏰</div>
              <div className="font-medium">Time Saving</div>
              <div className="text-sm text-gray-600">Document Processing</div>
            </div>
          </button>
          
          <button
            onClick={() => setSelectedType('error_reduction')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'error_reduction' 
                ? 'border-yellow-500 bg-yellow-50' 
                : 'border-gray-200 hover:border-yellow-300'
            }`}
          >
            <div className="text-center">
              <div className="text-yellow-600 text-2xl mb-2">⭐</div>
              <div className="font-medium">Error Reduction</div>
              <div className="text-sm text-gray-600">Quality Control</div>
            </div>
          </button>
          
          <button
            onClick={() => setSelectedType('capacity_increase')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'capacity_increase' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="text-center">
              <div className="text-green-600 text-2xl mb-2">📈</div>
              <div className="font-medium">Capacity Increase</div>
              <div className="text-sm text-gray-600">Customer Service</div>
            </div>
          </button>
          
          <button
            onClick={() => setSelectedType('cost_reduction')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'cost_reduction' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="text-center">
              <div className="text-purple-600 text-2xl mb-2">💰</div>
              <div className="font-medium">Cost Reduction</div>
              <div className="text-sm text-gray-600">Operations</div>
            </div>
          </button>
          
          <button
            onClick={() => setSelectedType('response_time')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'response_time' 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="text-center">
              <div className="text-indigo-600 text-2xl mb-2">⚡</div>
              <div className="font-medium">Response Time</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
          </button>
        </div>
        
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTestVisualization}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              Show Visualization
            </button>
            <button
              onClick={() => {
                const testData = generateTestData(selectedType);
                const link = generateVisualizationLink({
                  type: selectedType as any,
                  taskName: testData.recommendation.task,
                  message: testData.message,
                  currentState: testData.recommendation.currentState,
                  futureState: testData.recommendation.futureState
                });
                window.open(link, '_blank');
              }}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
            >
              Test Link (New Tab)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
            <div>
              <strong>Chat Completion:</strong> When users complete their chat with the Lleverage AI, 
              the chatbot includes a link to view the impact visualization.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
            <div>
              <strong>Link Click:</strong> Users click the visualization link at the end of the recommendation 
              to see the personalized impact analysis.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
            <div>
              <strong>Data Parsing:</strong> The recommendation data is parsed to extract key information 
              like improvement type, current state, future state, and impact metrics.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
            <div>
              <strong>Visualization:</strong> A beautiful before/after comparison appears with 
              interactive elements, showing the personalized impact of implementing the AI solution.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</div>
            <div>
              <strong>Engagement:</strong> Users can adjust the business scale slider to see how 
              benefits scale with their specific situation, leading to consultation booking.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">For Chatbot Integration</h3>
        <p className="text-sm text-blue-700 mb-4">
          To integrate with your chatbot, include a link like this at the end of your recommendations:
        </p>
        <div className="bg-white rounded border p-4 mb-4">
          <code className="text-sm text-gray-800">
            {`<a href="${window.location.origin}/visualization?data=..." target="_blank" style="color: #8B5CF6; text-decoration: underline; font-weight: bold;">View Impact Visualization</a>`}
          </code>
        </div>
        <p className="text-xs text-blue-600">
          Use the utility functions in <code>visualization-link-generator.ts</code> to generate these links programmatically.
        </p>
      </div>

      {showVisualization && (
        <RecommendationVisualization
          recommendation={parsedData}
          isVisible={showVisualization}
          onClose={handleCloseVisualization}
        />
      )}
    </div>
  );
}