import { Button } from "@/components/ui/button";
import { Calendar, Download, Mail, CheckCircle, Target, TrendingUp, Clock } from "lucide-react";

interface ResultsPageProps {
  responses: string[];
}

export function ResultsPage({ responses }: ResultsPageProps) {
  const [industry, employees, mainTask, timeSpent, challenge] = responses;

  // Generate personalized solution based on responses
  const getSolutionName = () => {
    if (mainTask?.includes("Customer service")) return "AI-Powered Customer Support System";
    if (mainTask?.includes("Data entry")) return "Intelligent Data Processing Suite";
    if (mainTask?.includes("Scheduling")) return "Smart Scheduling & Planning Assistant";
    if (mainTask?.includes("Email")) return "AI Email Management System";
    if (mainTask?.includes("Report")) return "Automated Report Generation Platform";
    return "Custom AI Business Automation Solution";
  };

  const getKeyBenefits = () => {
    const benefits = [];
    if (mainTask?.includes("Customer service")) {
      benefits.push("24/7 automated customer support", "80% faster response times", "Consistent service quality");
    } else if (mainTask?.includes("Data entry")) {
      benefits.push("99% accuracy in data processing", "10x faster data entry", "Real-time error detection");
    } else if (mainTask?.includes("Scheduling")) {
      benefits.push("Optimal resource allocation", "Conflict-free scheduling", "Time savings up to 6 hours/day");
    } else {
      benefits.push("Significant time savings", "Improved accuracy", "Enhanced productivity");
    }
    return benefits;
  };

  const handleBookConsultation = () => {
    // In a real app, this would open a calendar booking system
    window.open("https://calendly.com/spaik-ai-consultation", "_blank");
  };

  const handleDownloadGuide = () => {
    // In a real app, this would trigger a PDF download
    alert("Quick Start Guide would be downloaded here");
  };

  const handleEmailResults = () => {
    // In a real app, this would open an email form
    alert("Email form would open here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-grey/30 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-green rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-dark-grey mb-4">
              Your AI Opportunity is Ready!
            </h1>
            <p className="text-xl text-medium-grey">
              Here's your personalized roadmap to AI transformation
            </p>
          </div>

          {/* Solution Card */}
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-8 mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {getSolutionName()}
              </h2>
              <p className="text-lg text-medium-grey">
                Tailored for {industry} companies with {employees} employees
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {getKeyBenefits().map((benefit, index) => (
                <div key={index} className="text-center p-4 bg-light-grey/30 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-accent-green mx-auto mb-3" />
                  <p className="text-dark-grey font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Metrics Preview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-primary/5 rounded-xl">
              <div className="text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-grey">75%</div>
                <div className="text-sm text-medium-grey">Time Reduction</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-accent-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-grey">€48,000</div>
                <div className="text-sm text-medium-grey">Annual Savings</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-grey">6 weeks</div>
                <div className="text-sm text-medium-grey">Implementation</div>
              </div>
            </div>
          </div>

          {/* Action Steps */}
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold text-dark-grey mb-6">
              Your Next Steps
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-light-grey/30 rounded-lg">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-dark-grey">Free 15-Minute Strategy Call</h4>
                  <p className="text-medium-grey">Discuss your specific needs and get expert recommendations</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-light-grey/30 rounded-lg">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-dark-grey">Download Implementation Guide</h4>
                  <p className="text-medium-grey">Get detailed steps and best practices for your AI journey</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-light-grey/30 rounded-lg">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-dark-grey">Start Your Pilot Project</h4>
                  <p className="text-medium-grey">Begin with a small-scale implementation to prove ROI</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleBookConsultation}
              className="w-full animate-scale-in"
            >
              <Calendar className="h-6 w-6 mr-2" />
              Book Free 15-Min Consultation
            </Button>
            <Button 
              variant="outline-primary" 
              size="xl" 
              onClick={handleDownloadGuide}
              className="w-full animate-scale-in"
              style={{ animationDelay: '0.1s' }}
            >
              <Download className="h-6 w-6 mr-2" />
              Download Quick Start Guide
            </Button>
          </div>

          {/* Email Option */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-medium-grey mb-4">Want these results sent to your email?</p>
            <Button 
              variant="ghost" 
              onClick={handleEmailResults}
              className="text-primary hover:text-primary-hover"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Me These Results
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center space-x-6 text-sm text-medium-grey">
              <span>✓ GDPR Compliant</span>
              <span>✓ Free Consultation</span>
              <span>✓ No Commitment Required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}