import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CTAButtonProps {}

export const CTAButton = ({}: CTAButtonProps) => {
  const handleBookConsultation = () => {
    window.open('https://cal.com/jochem-spaik/discovery', '_blank');
  };

  return (
    <div className="text-center">
      <Button 
        onClick={handleBookConsultation}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Schedule 15-Minute Discovery Call
      </Button>
      
      <p className="text-sm text-gray-500 mt-3">
        No commitment • Learn about your specific automation opportunities
      </p>
    </div>
  );
};