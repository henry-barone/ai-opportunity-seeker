import { Button } from "@/components/ui/button";
import { MessageCircle, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onStartChat: () => void;
}

export function HeroSection({ onStartChat }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-green/5" />
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-dark-grey mb-6 leading-tight animate-fade-in">
            Find Your <span className="text-primary">#1 AI Opportunity</span> in 3 Minutes
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-medium-grey mb-8 max-w-3xl mx-auto animate-slide-up">
            Discover exactly where AI can save you the most time and money
          </p>
          
          {/* CTA Button */}
          <div className="mb-8 animate-scale-in">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onStartChat}
              className="group"
            >
              <MessageCircle className="h-6 w-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Start Chat
            </Button>
          </div>
          
          {/* Trust indicator */}
          <p className="text-medium-grey text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CheckCircle className="inline-block h-5 w-5 text-accent-green mr-2" />
            Trusted by 50+ Dutch SMEs
          </p>
        </div>
      </div>
    </div>
  );
}