import { Card, CardContent } from "@/components/ui/card";
import { Settings, Target, FileText } from "lucide-react";

interface AutomationOverviewProps {
  automationData?: {
    title: string;
    focus: string;
    description: string;
  };
}

export const AutomationOverview = ({ 
  automationData = {
    title: "Accounts Payable Process Automation",
    focus: "Invoice processing & approval workflows",
    description: "Automate invoice data extraction, validation, and approval workflows to eliminate manual data entry and reduce processing time by 80%"
  }
}: AutomationOverviewProps) => {
  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: '#2D1B69' }}>
            Recommended Automation
          </h2>
        </div>

        <Card className="border shadow-sm" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Title */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6366F1' }}>
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#64748B' }}>Title</div>
                  <div className="font-semibold" style={{ color: '#2D1B69' }}>
                    {automationData.title}
                  </div>
                </div>
              </div>

              {/* Focus */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8B5CF6' }}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#64748B' }}>Focus</div>
                  <div className="font-semibold" style={{ color: '#2D1B69' }}>
                    {automationData.focus}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-1 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#10B981' }}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#64748B' }}>Description</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    {automationData.description}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};