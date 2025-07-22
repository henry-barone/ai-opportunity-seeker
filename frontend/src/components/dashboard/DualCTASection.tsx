import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail, CheckCircle, Send, User, Building } from "lucide-react";
import { DashboardData, formatCurrency } from '@/utils/dashboardHelpers';

interface DualCTASectionProps {
  data: DashboardData;
}

export const DualCTASection = ({ data }: DualCTASectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleBookConsultation = () => {
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
      // Simulate API call - In real app, this would send to SPAIK's email system
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create email content
      const subject = encodeURIComponent('SPAIK Automation Analysis Report');
      const body = encodeURIComponent(`Hi ${formData.name},

Thank you for your interest in SPAIK's automation solutions!

Your Analysis Summary:
• Monthly Savings Potential: ${formatCurrency(data.monthlySavings)}
• Hours Freed Up: ${data.hoursSaved} hours per week
• Recommendation: Accounts Payable Process Automation
• Analysis ID: ${data.id}

We've prepared a detailed automation guide tailored to your business needs. 

Our CEO Jochem would love to discuss how this applies specifically to ${formData.company || 'your business'}.

Schedule a call: https://cal.com/jochem-spaik/discovery

Best regards,
The SPAIK Team

--
SPAIK.ai - Intelligent Business Automation
Email: hello@spaik.ai`);

      // Open email client with pre-filled content
      window.location.href = `mailto:${formData.email}?subject=${subject}&body=${body}`;
      
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Failed to send report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section className="py-12 px-6" style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #3730A3 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-white mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Choose your next step: speak directly with our CEO or get your personalized automation report
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Talk to Our CEO */}
          <Card className="border shadow-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: '#FFFFFF' }}>
            <CardContent className="p-6 text-center h-full flex flex-col">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#2D1B69' }}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3" style={{ color: '#2D1B69' }}>
                Talk to Our CEO
              </h3>
              
              <p className="mb-4 leading-relaxed flex-grow text-sm" style={{ color: '#64748B' }}>
                30-minute discovery call with Jochem, SPAIK's founder. Get personalized insights 
                about your automation opportunities and a custom implementation roadmap.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                  Personal consultation with CEO
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                  Custom automation strategy
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                  Implementation timeline & budget
                </div>
              </div>
              
              <Button 
                onClick={handleBookConsultation}
                size="lg"
                className="w-full text-white text-base py-3 mb-3 rounded-lg"
                style={{ backgroundColor: '#2D1B69' }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Call with Jochem
              </Button>
              
              <p className="text-xs" style={{ color: '#64748B' }}>
                No commitment • Free consultation
              </p>
            </CardContent>
          </Card>

          {/* Get Your Report */}
          <Card className="border shadow-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: '#FFFFFF' }}>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2D1B69' }}>
                  Get Your Report
                </h3>
                
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Receive your personalized automation analysis plus our comprehensive 
                  automation guide with implementation best practices.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

                  <div>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Company Name (Optional)"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="pl-10"
                      />
                    </div>
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
                        Preparing Report...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send My Report
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center" style={{ color: '#64748B' }}>
                    Free report • No spam • Unsubscribe anytime
                  </p>
                </form>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#10B981' }} />
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#2D1B69' }}>
                    Report Sent Successfully!
                  </h4>
                  <p className="mb-4 text-sm" style={{ color: '#64748B' }}>
                    Check your email in 2-3 minutes for your personalized automation report.
                  </p>
                  <Button
                    onClick={handleBookConsultation}
                    variant="outline"
                    className="border text-sm py-2"
                    style={{ borderColor: '#2D1B69', color: '#2D1B69' }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a Call Too
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};