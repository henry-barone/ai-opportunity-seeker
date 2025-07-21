import React from 'react';
import { BusinessImpactButton } from '../components/BusinessImpactButton';
import { MessageSquare, Bot, User, ArrowRight } from 'lucide-react';

export function VisualizationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Impact Visualization Demo
          </h1>
          <p className="text-xl text-gray-600">
            See how AI recommendations translate to real business value
          </p>
        </div>

        {/* Chat Simulation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Chat Simulation</h2>
          </div>

          <div className="space-y-4 mb-6">
            {/* User Message */}
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 rounded-full p-2">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                <p className="text-sm">
                  Hi! I'm looking to optimize our invoice processing workflow. 
                  Currently, we spend about 6 hours daily on manual invoice processing, 
                  which is causing delays and errors.
                </p>
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="bg-blue-50 rounded-lg p-3 max-w-2xl">
                <p className="text-sm mb-3">
                  Based on your requirements, I recommend implementing an AI-powered invoice processing system. 
                  This solution can automate data extraction, validation, and routing, significantly reducing 
                  manual work and improving accuracy.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">🎯 Recommendation: Automate Invoice Processing</h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Current:</strong> 6 hours manual processing daily</p>
                    <p><strong>Future:</strong> 1 hour automated processing daily</p>
                    <p><strong>Improvement:</strong> 83% time reduction (5 hours saved)</p>
                    <p><strong>Timeline:</strong> 2-4 weeks implementation</p>
                    <p><strong>Confidence:</strong> 85%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Button */}
          <div className="flex justify-center">
            <div className="animate-bounce">
              <ArrowRight className="h-6 w-6 text-gray-400 mb-2 mx-auto" />
            </div>
          </div>
          <div className="text-center">
            <BusinessImpactButton />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Time Savings Visualization</h3>
            <p className="text-sm text-gray-600">
              Interactive charts showing cumulative hours saved over different timeframes
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Business Impact</h3>
            <p className="text-sm text-gray-600">
              Real-time calculations of cost savings and productivity improvements
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Scalable Projections</h3>
            <p className="text-sm text-gray-600">
              Adjustable scale and timeframe controls for different business volumes
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-semibold mb-4">How It Works</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <p>After receiving an AI recommendation, click the "See how this implementation will affect your business!" button</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <p>View interactive charts showing time savings, cost reductions, and business impact over time</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <p>Adjust timeframe (daily, weekly, monthly, yearly) and scale to match your business needs</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <p>Get detailed metrics including total hours saved, cost savings, and implementation timeline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { BarChart3, TrendingUp, Calculator } from 'lucide-react';