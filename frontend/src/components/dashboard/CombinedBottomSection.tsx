import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Mail, Send, ExternalLink, User, CheckCircle } from "lucide-react";
import { DashboardData } from '@/utils/dashboardHelpers';

interface CombinedBottomSectionProps {
  data: DashboardData;
}

export const CombinedBottomSection = ({ data }: CombinedBottomSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleBookConsultation = () => {
    window.open('https://cal.com/jochem-spaik/discovery', '_blank');
  };

  const handleSPAIKWebsite = () => {
    window.open('https://spaik.ai', '_blank');
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Failed to send report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const credibilityPoints = [
    "2+ years in AP automation",
    "50+ successful implementations", 
    "95-98% accuracy improvement",
    "2-4 week implementation timeline"
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* About SPAIK */}
          <div className="border rounded-lg p-8 bg-white" style={{ borderColor: '#E5E7EB' }}>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1F2937' }}>
              About SPAIK
            </h2>
            
            <p className="text-lg mb-8" style={{ color: '#6B7280' }}>
              We specialize in accounts payable automation for European businesses.
            </p>

            <div className="space-y-4 mb-8">
              {credibilityPoints.map((point, index) => (
                <div key={index} className="text-base" style={{ color: '#1F2937' }}>
                  • {point}
                </div>
              ))}
            </div>

            <Button 
              onClick={handleSPAIKWebsite}
              variant="outline"
              className="w-full border text-base py-3"
              style={{ borderColor: '#E5E7EB', color: '#1F2937' }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit SPAIK Website
            </Button>
          </div>

          {/* Ready to Explore Automation */}
          <div className="border rounded-lg p-8 bg-white" style={{ borderColor: '#E5E7EB' }}>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1F2937' }}>
              Ready to Explore Automation?
            </h2>
            
            <p className="text-lg mb-8" style={{ color: '#6B7280' }}>
              Schedule a discovery call or get your personalized report emailed
            </p>

            <div className="space-y-6">
              {/* Calendar Booking */}
              <Button 
                onClick={handleBookConsultation}
                className="w-full text-white text-base py-4 rounded-lg"
                style={{ backgroundColor: '#1F2937' }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Discovery Call with CEO
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: '#E5E7EB' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white" style={{ color: '#64748B' }}>or</span>
                </div>
              </div>

              {/* Email Report Form */}
              {!isSubmitted ? (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="email"
                        placeholder="Business Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white text-base py-3 rounded-lg"
                    style={{ backgroundColor: '#10B981' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending Report...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Email My Report
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center" style={{ color: '#64748B' }}>
                    Get your report + SPAIK updates • Unsubscribe anytime
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#10B981' }} />
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#2D1B69' }}>
                    Report Sent!
                  </h4>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    Check your email for your personalized automation report and SPAIK updates.
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-center mt-4" style={{ color: '#64748B' }}>
              No commitment • Free consultation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};