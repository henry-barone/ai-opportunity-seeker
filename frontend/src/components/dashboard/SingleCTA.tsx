import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface SingleCTAProps {}

export const SingleCTA = ({}: SingleCTAProps) => {
  const handleBookConsultation = () => {
    window.open('https://cal.com/jochem-spaik/discovery', '_blank');
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#2D1B69' }}>
          Ready to Explore Automation?
        </h2>
        
        <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#1F2937' }}>
          Schedule a 30-minute discovery call with our CEO, Jochem
        </p>

        <Button 
          onClick={handleBookConsultation}
          size="lg"
          className="text-white text-lg px-8 py-4 rounded-lg"
          style={{ backgroundColor: '#2D1B69' }}
        >
          <Calendar className="w-5 h-5 mr-3" />
          Schedule Discovery Call
        </Button>

        <p className="text-sm mt-6" style={{ color: '#1F2937' }}>
          No commitment • Free consultation
        </p>
      </div>
    </section>
  );
};