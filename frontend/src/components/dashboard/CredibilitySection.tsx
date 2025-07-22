import { CheckCircle, Award, Clock, Users, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const CredibilitySection = () => {
  const credibilityPoints = [
    {
      icon: Award,
      text: "2+ Years Specializing in Accounts Payable Automation",
      bgColor: "#6366F1"
    },
    {
      icon: Target,
      text: "95-98% Processing Accuracy Improvement",
      bgColor: "#10B981"
    },
    {
      icon: Clock,
      text: "2-4 Week Implementation Timeline",
      bgColor: "#8B5CF6"
    },
    {
      icon: Users,
      text: "50+ Successful Business Transformations",
      bgColor: "#2D1B69"
    },
    {
      icon: CheckCircle,
      text: "CEO-Led Discovery Process",
      bgColor: "#6366F1"
    }
  ];

  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#2D1B69' }}>
            Why Choose SPAIK?
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            We specialize in accounts payable automation with a proven track record 
            of successful implementations across Europe
          </p>
        </div>

        <Card className="border shadow-sm" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credibilityPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: point.bgColor }}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold leading-relaxed" style={{ color: '#2D1B69' }}>
                        {point.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Credibility Elements */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-xl font-bold mb-1" style={{ color: '#10B981' }}>€2M+</div>
                  <div className="text-sm" style={{ color: '#64748B' }}>Total Savings Generated</div>
                </div>
                <div>
                  <div className="text-xl font-bold mb-1" style={{ color: '#6366F1' }}>98%</div>
                  <div className="text-sm" style={{ color: '#64748B' }}>Client Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-xl font-bold mb-1" style={{ color: '#2D1B69' }}>24/7</div>
                  <div className="text-sm" style={{ color: '#64748B' }}>System Reliability</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};