import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Calendar, Send, User, Mail, CheckCircle } from "lucide-react";
import { DashboardData } from '@/utils/dashboardHelpers';

interface AboutAndActionsProps {
  data: DashboardData;
}

export const AboutAndActions = ({ data }: AboutAndActionsProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSPAIKWebsite = () => {
    window.open('https://www.spaik.io', '_blank');
  };

  const handleBookCall = () => {
    window.open('https://cal.com/jochem-spaik/discovery', '_blank');
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <section 
      className="py-12 px-6" 
      style={{ 
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F8F9FA 50%, #EEF2FF 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side: About SPAIK */}
          <div 
            className="bg-white rounded-lg border p-8"
            style={{ 
              borderColor: '#2D1B69',
              borderWidth: '2px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div 
              className="flex items-center mb-6 p-4 rounded-lg"
              style={{ backgroundColor: '#EEF2FF' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: '#2D1B69' }}
              >
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#2D1B69' }}>
                About SPAIK
              </h3>
            </div>
            
            <p className="text-base mb-8 font-medium" style={{ color: '#1F2937' }}>
              Specializing in accounts payable automation for European businesses
            </p>

            <div className="space-y-4 mb-8">
              <div 
                className="flex items-center p-3 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#2D1B69' }}
              >
                <span className="text-sm mr-3" style={{ color: '#2D1B69' }}>✓</span>
                <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
                  2+ years in AP automation
                </span>
              </div>
              <div 
                className="flex items-center p-3 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#6366F1' }}
              >
                <span className="text-sm mr-3" style={{ color: '#6366F1' }}>✓</span>
                <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
                  50+ implementations
                </span>
              </div>
              <div 
                className="flex items-center p-3 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#8B5CF6' }}
              >
                <span className="text-sm mr-3" style={{ color: '#8B5CF6' }}>✓</span>
                <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
                  95-98% accuracy
                </span>
              </div>
              <div 
                className="flex items-center p-3 rounded-lg border-l-4"
                style={{ backgroundColor: '#F8F9FA', borderColor: '#A855F7' }}
              >
                <span className="text-sm mr-3" style={{ color: '#A855F7' }}>✓</span>
                <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
                  2-4 week setup
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleSPAIKWebsite}
                variant="outline"
                className="w-full text-sm py-3 font-medium transition-all duration-200"
                style={{ 
                  borderColor: '#2D1B69', 
                  color: '#2D1B69',
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit SPAIK.io Website
              </Button>
              
              <Button 
                onClick={handleBookCall}
                className="w-full text-sm py-3 font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#2D1B69' }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                See How to Implement This
              </Button>
              
              <div className="text-xs text-center mt-2" style={{ color: '#6B7280' }}>
                Free 30-min call • No obligation
              </div>
            </div>
          </div>

          {/* Right Side: Get Report */}
          <div 
            className="bg-white rounded-lg border p-8"
            style={{ 
              borderColor: '#2D1B69',
              borderWidth: '2px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div 
              className="flex items-center mb-6 p-4 rounded-lg"
              style={{ backgroundColor: '#EEF2FF' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: '#2D1B69' }}
              >
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#2D1B69' }}>
                Get Your Report
              </h3>
            </div>
            
            <div 
              className="p-4 rounded-lg border-l-4 mb-8"
              style={{ backgroundColor: '#F8F9FA', borderColor: '#2D1B69' }}
            >
              <p className="text-base font-medium" style={{ color: '#1F2937' }}>
                Receive this analysis plus automation implementation guide and future updates
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                    <Input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`pl-10 py-3 text-sm ${errors.name ? 'border-red-500' : ''}`}
                      style={{ borderColor: errors.name ? '#EF4444' : '#E5E7EB' }}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 py-3 text-sm ${errors.email ? 'border-red-500' : ''}`}
                      style={{ borderColor: errors.email ? '#EF4444' : '#E5E7EB' }}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-xs">{errors.submit}</p>
                )}

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-sm py-3 font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#2D1B69' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send My Report
                    </>
                  )}
                </Button>

                <p className="text-xs text-center" style={{ color: '#6B7280' }}>
                  Free report • No spam • Unsubscribe anytime
                </p>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#10B981' }} />
                <h4 className="text-lg font-bold mb-2" style={{ color: '#1F2937' }}>
                  Report Sent!
                </h4>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Check your email for your personalized automation report and future updates.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};