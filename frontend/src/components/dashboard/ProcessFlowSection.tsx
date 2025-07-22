import { Search, Settings, TrendingUp, ArrowRight } from 'lucide-react';

interface ProcessFlowSectionProps {}

export const ProcessFlowSection = ({}: ProcessFlowSectionProps) => {
  const steps = [
    {
      icon: Search,
      title: "Assessment & Setup",
      description: "Analyze your current processes and configure the automation system",
      duration: "Week 1"
    },
    {
      icon: Settings,
      title: "Implementation & Training",
      description: "Deploy the solution and train your team on the new automated workflows",
      duration: "Week 2-3"
    },
    {
      icon: TrendingUp,
      title: "Optimization & Results",
      description: "Fine-tune performance and start seeing immediate time and cost savings",
      duration: "Week 4+"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#2D1B69' }}>
            How We'll Transform Your Process
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            A proven 3-step approach to get you from manual processing to full automation
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <div key={index} className="relative">
                  <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 text-center" style={{ borderColor: '#E5E7EB' }}>
                    {/* Step Number */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4 mx-auto" style={{ backgroundColor: '#2D1B69' }}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: '#F0F8FF' }}>
                      <IconComponent className="w-8 h-8" style={{ color: '#2D1B69' }} />
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#F0FDF4', color: '#10B981' }}>
                      {step.duration}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#1F2937' }}>
                      {step.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow between steps */}
                  {!isLast && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md" style={{ borderColor: '#E5E7EB', border: '2px solid' }}>
                        <ArrowRight className="w-4 h-4" style={{ color: '#2D1B69' }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};