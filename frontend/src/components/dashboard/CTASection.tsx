import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Download, Share2, Phone, Mail, Clock, CheckCircle, Send } from "lucide-react";
import { DashboardData, formatCurrency } from '@/utils/dashboardHelpers';

interface CTASectionProps {
  data: DashboardData;
}

export const CTASection = ({ data }: CTASectionProps) => {
  const [isShared, setIsShared] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleBookConsultation = () => {
    window.open('https://cal.com/jochem-spaik/discovery', '_blank');
  };

  const handleEmailReport = () => {
    const subject = encodeURIComponent('My SPAIK Automation Analysis');
    const body = encodeURIComponent(`Hi,

I've completed an automation analysis with SPAIK and wanted to share the results:

• Recommendation: Accounts Payable Process Automation
• Potential Monthly Savings: ${formatCurrency(data.monthlySavings)}
• Hours Freed Up: ${data.hoursSaved} hours per week
• Analysis ID: ${data.id}

View full dashboard: ${window.location.href}

Best regards`);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setIsEmailSent(true);
    setTimeout(() => setIsEmailSent(false), 3000);
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF report
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = `My AI Automation Impact: ${formatCurrency(data.monthlySavings)}/month savings!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out my AI automation potential: ${data.recommendation} could save me ${formatCurrency(data.monthlySavings)} per month!`,
          url: url
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard');
      }
    }
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-slate-700 to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA */}
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Learn More About Automation
          </h2>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
            See how <span className="font-semibold text-slate-100">accounts payable automation</span> fits your business. 
            Schedule a conversation to explore your options.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Primary CTA */}
          <Card className="border border-slate-200 shadow-lg bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Discovery Consultation
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                30-minute conversation to understand your current processes and explore automation opportunities. 
                No sales pressure, just insights.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-500" />
                  30-minute discussion
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-slate-500" />
                  Process analysis & recommendations
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-slate-500" />
                  Implementation timeline discussion
                </div>
              </div>
              <Button 
                onClick={handleBookConsultation}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white text-lg py-4 rounded-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Discovery Call
              </Button>
              <p className="text-xs text-slate-500 mt-3">
                Free consultation • No commitment required
              </p>
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          <Card className="border border-slate-200 shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Share This Analysis
                </h3>
                <p className="text-slate-600">
                  Save or share your automation insights
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleEmailReport}
                  variant="outline" 
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-4 text-lg"
                >
                  {isEmailSent ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Email Prepared!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Email Report to Myself
                    </>
                  )}
                </Button>

                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline" 
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-4 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Print Report
                </Button>

                <Button 
                  onClick={handleShare}
                  variant="outline" 
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-4 text-lg"
                >
                  {isShared ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-5 h-5 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>

                {/* Contact Options */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-center text-sm text-slate-600 mb-3">
                    Questions? Contact us directly:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="ghost" 
                      className="flex-1 text-slate-600 hover:bg-slate-100 text-sm"
                      onClick={() => window.location.href = 'mailto:hello@spaik.ai'}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="flex-1 text-slate-600 hover:bg-slate-100 text-sm"
                      onClick={() => window.location.href = 'tel:+31612345678'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-6 bg-slate-600/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-100">50+</div>
              <div className="text-xs text-slate-300">Businesses</div>
            </div>
            <div className="w-px h-6 bg-slate-400"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-100">3-5</div>
              <div className="text-xs text-slate-300">Years Experience</div>
            </div>
            <div className="w-px h-6 bg-slate-400"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-100">2-4</div>
              <div className="text-xs text-slate-300">Week Setup</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 max-w-2xl mx-auto">
            Results based on similar automation implementations. Individual results may vary depending on current processes and business requirements.
          </p>
        </div>
      </div>
    </div>
  );
};