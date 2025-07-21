import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Mail, ArrowLeft, ExternalLink } from 'lucide-react';
import { parseUrlParams, DEFAULT_PARAMS } from '@/utils/urlParams';
import { getTemplateForType, validateTemplateMetrics } from '@/types/visualization';
import { generateImpactStatements } from '@/utils/impactGenerator';
import { TimeSavingTemplate } from './visualization/templates/TimeSavingTemplate';
import { ErrorReductionTemplate } from './visualization/templates/ErrorReductionTemplate';
import type { VisualData } from '@/types/visualization';

export function DynamicResultsPage() {
  const [searchParams] = useSearchParams();
  const [visualData, setVisualData] = useState<VisualData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Parse URL parameters
      const params = parseUrlParams(searchParams);
      
      // Get appropriate template
      const template = getTemplateForType(params.type);
      
      // Validate required metrics
      if (!validateTemplateMetrics(template, params)) {
        console.warn('Missing required metrics, using defaults');
        // Fill in missing metrics with defaults
        Object.keys(template.defaultMetrics).forEach(key => {
          if (!params[key as keyof typeof params]) {
            (params as any)[key] = template.defaultMetrics[key];
          }
        });
      }

      // Generate impact statements
      const impacts = generateImpactStatements(params);

      // Create visual data
      const data: VisualData = {
        template,
        metrics: {
          primary: { value: 0, unit: '', label: '' }, // Will be filled by template
          improvement: { value: 0, unit: '', label: '' }
        },
        impacts,
        params
      };

      setVisualData(data);
      setLoading(false);

      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'results_page_view', {
          event_category: 'visualization',
          event_label: params.type,
          custom_parameter_task: params.task,
          custom_parameter_frequency: params.frequency
        });
      }

    } catch (err) {
      console.error('Error processing visualization parameters:', err);
      setError('Failed to load visualization. Please check your parameters.');
      setLoading(false);
    }
  }, [searchParams]);

  const handleBookConsultation = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'book_consultation_click', {
        event_category: 'cta',
        event_label: visualData?.params.type || 'unknown'
      });
    }
    window.open('https://calendly.com/spaik-ai-consultation', '_blank');
  };

  const handleDownloadGuide = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download_guide_click', {
        event_category: 'cta',
        event_label: visualData?.params.type || 'unknown'
      });
    }
    // In production, this would trigger actual PDF download
    alert('Implementation Guide would be downloaded here');
  };

  const handleEmailResults = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'email_results_click', {
        event_category: 'cta',
        event_label: visualData?.params.type || 'unknown'
      });
    }
    // In production, this would open email form
    alert('Email form would open here');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const renderTemplate = () => {
    if (!visualData) return null;

    switch (visualData.template.component) {
      case 'TimeSavingTemplate':
        return <TimeSavingTemplate data={visualData} />;
      case 'ErrorReductionTemplate':
        return <ErrorReductionTemplate data={visualData} />;
      case 'CapacityIncreaseTemplate':
        // TODO: Implement CapacityIncreaseTemplate
        return <div>Capacity Increase Template (Coming Soon)</div>;
      case 'CostReductionTemplate':
        // TODO: Implement CostReductionTemplate
        return <div>Cost Reduction Template (Coming Soon)</div>;
      case 'ResponseTimeTemplate':
        // TODO: Implement ResponseTimeTemplate
        return <div>Response Time Template (Coming Soon)</div>;
      default:
        return <div>Generic Template (Coming Soon)</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Back Button */}
          <div className="mb-6">
            <Button onClick={handleGoBack} variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessment
            </Button>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            {renderTemplate()}
          </div>

          {/* Call-to-Action Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get personalized guidance from our AI experts and start your automation journey today.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Button 
                onClick={handleBookConsultation}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 hover:shadow-lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Free 15-Min Strategy Call
              </Button>
              <Button 
                onClick={handleDownloadGuide}
                variant="outline"
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Implementation Guide
              </Button>
            </div>

            {/* Email Option */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Want these results sent to your email?</p>
              <Button 
                onClick={handleEmailResults}
                variant="ghost"
                className="text-primary hover:text-primary-hover hover:bg-primary/10"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Me These Results
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  GDPR Compliant
                </span>
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Free Consultation
                </span>
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  No Commitment Required
                </span>
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  50+ SMEs Served
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>© 2024 SPAIK.io - AI Opportunity Spotter for Dutch SMEs</p>
          </div>
        </div>
      </div>
    </div>
  );
}