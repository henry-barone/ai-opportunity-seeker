import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, DollarSign, Users, AlertTriangle, CheckCircle, Zap } from "lucide-react";

interface BeforeAfterVisualizationProps {
  responses: string[];
  onContinue: () => void;
}

export function BeforeAfterVisualization({ responses, onContinue }: BeforeAfterVisualizationProps) {
  const [timeSlider, setTimeSlider] = useState(6); // hours saved per day
  const [efficiencySlider, setEfficiencySlider] = useState(40); // efficiency improvement

  // Calculate metrics based on sliders
  const dailyTimeSaved = timeSlider;
  const weeklyTimeSaved = dailyTimeSaved * 5;
  const monthlyTimeSaved = weeklyTimeSaved * 4.3;
  const annualTimeSaved = monthlyTimeSaved * 12;
  const costSavings = annualTimeSaved * 50; // €50 per hour saved

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-grey/30 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-grey mb-4">
            Your AI Transformation Preview
          </h1>
          <p className="text-xl text-medium-grey">
            See how AI could transform your daily operations
          </p>
        </div>

        {/* Before/After Split */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Before */}
          <div className="bg-gradient-to-br from-accent-red/10 to-accent-red/5 rounded-2xl p-8 border border-accent-red/20">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-accent-red mr-3" />
              <h2 className="text-2xl font-bold text-dark-grey">Your Current Day</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-accent-red mr-3" />
                  <span className="text-dark-grey">Manual tasks per day</span>
                </div>
                <span className="font-bold text-accent-red text-xl">8+ hours</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <TrendingDown className="h-6 w-6 text-accent-red mr-3" />
                  <span className="text-dark-grey">Team efficiency</span>
                </div>
                <span className="font-bold text-accent-red text-xl">60%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-accent-red mr-3" />
                  <span className="text-dark-grey">Annual opportunity cost</span>
                </div>
                <span className="font-bold text-accent-red text-xl">€{costSavings.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-accent-red mr-3" />
                  <span className="text-dark-grey">Staff satisfaction</span>
                </div>
                <span className="font-bold text-accent-red text-xl">Low</span>
              </div>
            </div>
            
            {/* Stress indicators */}
            <div className="mt-6 p-4 bg-accent-red/10 rounded-lg">
              <p className="text-accent-red font-medium text-center">
                Overwhelmed • Reactive • Time-consuming
              </p>
            </div>
          </div>

          {/* After */}
          <div className="bg-gradient-to-br from-accent-green/10 to-accent-green/5 rounded-2xl p-8 border border-accent-green/20">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 text-accent-green mr-3" />
              <h2 className="text-2xl font-bold text-dark-grey">With AI Automation</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-accent-green mr-3" />
                  <span className="text-dark-grey">Manual tasks per day</span>
                </div>
                <span className="font-bold text-accent-green text-xl">{8 - dailyTimeSaved} hours</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-accent-green mr-3" />
                  <span className="text-dark-grey">Team efficiency</span>
                </div>
                <span className="font-bold text-accent-green text-xl">{60 + efficiencySlider}%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-accent-green mr-3" />
                  <span className="text-dark-grey">Annual time value</span>
                </div>
                <span className="font-bold text-accent-green text-xl">€{costSavings.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-accent-green mr-3" />
                  <span className="text-dark-grey">Staff satisfaction</span>
                </div>
                <span className="font-bold text-accent-green text-xl">High</span>
              </div>
            </div>
            
            {/* Success indicators */}
            <div className="mt-6 p-4 bg-accent-green/10 rounded-lg">
              <p className="text-accent-green font-medium text-center">
                Proactive • Efficient • Strategic focus
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)] mb-8">
          <h3 className="text-2xl font-bold text-dark-grey mb-6 text-center">
            Adjust Your Potential Savings
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-dark-grey font-medium mb-2">
                Hours saved per day: {dailyTimeSaved}h
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={timeSlider}
                onChange={(e) => setTimeSlider(Number(e.target.value))}
                className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-medium-grey mt-1">
                <span>1h</span>
                <span>8h</span>
              </div>
            </div>
            
            <div>
              <label className="block text-dark-grey font-medium mb-2">
                Efficiency improvement: +{efficiencySlider}%
              </label>
              <input
                type="range"
                min="10"
                max="80"
                value={efficiencySlider}
                onChange={(e) => setEfficiencySlider(Number(e.target.value))}
                className="w-full h-2 bg-light-grey rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-medium-grey mt-1">
                <span>+10%</span>
                <span>+80%</span>
              </div>
            </div>
          </div>
          
          {/* Annual Impact Summary */}
          <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <h4 className="text-lg font-semibold text-dark-grey mb-4 text-center">
              Annual Impact Summary
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{annualTimeSaved.toFixed(0)}h</div>
                <div className="text-sm text-medium-grey">Time Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-green">€{costSavings.toLocaleString()}</div>
                <div className="text-sm text-medium-grey">Value Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{efficiencySlider}%</div>
                <div className="text-sm text-medium-grey">Efficiency Gain</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onContinue}
            className="animate-bounce-gentle"
          >
            See My Personalized Action Plan
          </Button>
        </div>
      </div>
    </div>
  );
}