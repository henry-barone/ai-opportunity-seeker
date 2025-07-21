import { MessageSquare, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Answer 5 Simple Questions",
    description: "Tell us about your business, industry, and biggest time-consuming tasks"
  },
  {
    icon: BarChart3,
    title: "See Your Personalized Analysis",
    description: "Get a clear before/after visualization of your potential AI transformation"
  },
  {
    icon: CheckCircle,
    title: "Get Your Action Plan",
    description: "Receive specific recommendations and next steps for implementation"
  }
];

export function ProcessSteps() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-grey mb-4">
            How It Works
          </h2>
          <p className="text-xl text-medium-grey">
            Three simple steps to discover your AI opportunity
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary via-primary to-primary transform -translate-y-1/2 z-0" />
            
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center relative z-10 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-purple)]">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-dark-grey mb-4">
                  {step.title}
                </h3>
                <p className="text-medium-grey leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}