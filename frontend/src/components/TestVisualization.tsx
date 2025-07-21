import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function TestVisualization() {
  const testUrls = [
    {
      title: 'Time-Saving: Invoice Processing',
      description: 'See how AI can reduce invoice processing time from 3 hours to 20 minutes',
      url: '/results?type=time-saving&task=invoices&current=3h&future=20m&frequency=daily&industry=Manufacturing&employees=50-200'
    },
    {
      title: 'Error Reduction: Quality Control',
      description: 'Demonstrate 90% reduction in quality control errors',
      url: '/results?type=error-reduction&task=quality-control&errors=50&reduction=90&industry=Manufacturing&employees=100-500'
    },
    {
      title: 'Cost Reduction: Administrative Tasks',
      description: 'Show monthly cost savings from automated admin processes',
      url: '/results?type=cost-reduction&task=admin&current=€500&future=€150&frequency=monthly&industry=Services&employees=20-50'
    },
    {
      title: 'Response Time: Customer Support',
      description: 'Improve customer response time from 2 hours to 5 minutes',
      url: '/results?type=response-time&task=customer-support&current=2h&future=5m&industry=Retail&employees=10-50'
    },
    {
      title: 'Generic: Data Processing',
      description: 'General business improvement template',
      url: '/results?type=generic&task=data-processing&current=manual&future=automated&industry=Technology&employees=25-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SPAIK AI Visualization System
          </h1>
          <p className="text-lg text-gray-600">
            Test different visualization templates with sample data
          </p>
        </div>

        <div className="grid gap-6">
          {testUrls.map((test, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {test.description}
                  </p>
                  <div className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded mb-4">
                    {test.url}
                  </div>
                </div>
                <Button
                  onClick={() => window.open(test.url, '_blank')}
                  className="ml-4 bg-primary hover:bg-primary-hover"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Demo
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            URL Parameter Guide
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-blue-900">type:</strong> time-saving, error-reduction, capacity-increase, cost-reduction, response-time, generic
            </div>
            <div>
              <strong className="text-blue-900">task:</strong> invoices, quotes, inventory, scheduling, customer-service, quality-control, etc.
            </div>
            <div>
              <strong className="text-blue-900">current:</strong> Current value (e.g., "3h", "50", "€500")
            </div>
            <div>
              <strong className="text-blue-900">future:</strong> Future value (e.g., "20m", "5", "€150")
            </div>
            <div>
              <strong className="text-blue-900">frequency:</strong> daily, weekly, monthly
            </div>
            <div>
              <strong className="text-blue-900">industry:</strong> Manufacturing, Services, Retail, Technology
            </div>
            <div>
              <strong className="text-blue-900">employees:</strong> 10-50, 50-200, 200-500, 500+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}