import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { DynamicResultsPage } from "./components/DynamicResultsPage";
import { TestVisualization } from "./components/TestVisualization";
import { VisualizationView } from "./pages/VisualizationView";
import { VisualizationTest } from "./pages/VisualizationTest";
import { VisualizationDemo } from "./pages/VisualizationDemo";
import { ApiTest } from "./pages/ApiTest";
import { EnhancedDemo } from "./pages/EnhancedDemo";
import { NotificationManager } from "./components/NotificationManager";
import "./utils/console-webhook-test";
import "./utils/notificationTrigger";
import "./utils/webhookBridge";
import "./utils/webhookTester";
import "./utils/directNotificationTrigger";
import "./utils/universalNotificationSystem";
import "./utils/webhookSimulator";

const queryClient = new QueryClient();

function AppContent() {
  const navigate = useNavigate();

  const handleViewVisualization = (id: string) => {
    // Open in new tab
    window.open(`/visualization/${id}`, '_blank');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/results" element={<DynamicResultsPage />} />
        <Route path="/test" element={<TestVisualization />} />
        <Route path="/visualization/:id" element={<VisualizationView />} />
        <Route path="/visualization-test" element={<VisualizationTest />} />
        <Route path="/visualization-demo" element={<VisualizationDemo />} />
        <Route path="/api-test" element={<ApiTest />} />
        <Route path="/enhanced-demo" element={<EnhancedDemo />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationManager onViewVisualization={handleViewVisualization} />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
