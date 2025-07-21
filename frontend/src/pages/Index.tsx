import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitCards } from "@/components/BenefitCards";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Footer } from "@/components/Footer";
import { ChatInterface } from "@/components/ChatInterface";
import { ResultsPage } from "@/components/ResultsPage";

type AppState = 'landing' | 'chat' | 'visualization' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [chatResponses, setChatResponses] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartChat = () => {
    setIsChatOpen(true);
    setAppState('chat');
  };

  const handleChatComplete = (responses: string[]) => {
    setChatResponses(responses);
    setIsChatOpen(false);
    setAppState('results');
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setAppState('landing');
  };

  if (appState === 'results') {
    return <ResultsPage responses={chatResponses} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onStartChat={handleStartChat} />
      <BenefitCards />
      <ProcessSteps />
      <Footer />
      
      <ChatInterface
        isOpen={isChatOpen}
        onClose={handleChatClose}
        onComplete={handleChatComplete}
        autoMessage="Hello! I'm looking to implement AI into my business, where can I start?"
      />
    </div>
  );
};

export default Index;
