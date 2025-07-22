import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitCards } from "@/components/BenefitCards";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Footer } from "@/components/Footer";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleChatComplete = (responses: string[]) => {
    setIsChatOpen(false);
    // Handle chat completion logic here
  };

  return (
    <div className="min-h-screen bg-light-grey">
      <Header />
      <HeroSection onStartChat={handleStartChat} />
      <BenefitCards />
      <ProcessSteps />
      <Footer />
      
      <ChatInterface 
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onComplete={handleChatComplete}
      />
    </div>
  );
};

export default Index;