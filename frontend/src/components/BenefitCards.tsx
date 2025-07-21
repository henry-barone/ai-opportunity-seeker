import { Target, Brain, Clock } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Personalized to Your Industry",
    description: "AI solutions tailored specifically to your business sector and unique challenges"
  },
  {
    icon: Brain,
    title: "No Technical Knowledge Needed",
    description: "Simple questions, clear answers. No complex technical jargon or expertise required"
  },
  {
    icon: Clock,
    title: "Get Results in Under 3 Minutes",
    description: "Quick assessment that delivers actionable insights and concrete next steps"
  }
];

export function BenefitCards() {
  return (
    <section className="py-20 bg-light-grey/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:transform hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark-grey mb-4">
                {benefit.title}
              </h3>
              <p className="text-medium-grey leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}