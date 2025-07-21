import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DynamicResultsPage } from "./components/DynamicResultsPage";
import { TestVisualization } from "./components/TestVisualization";
import { VisualizationView } from "./pages/VisualizationView";
import { VisualizationTest } from "./pages/VisualizationTest";
import { VisualizationDemo } from "./pages/VisualizationDemo";
import "./utils/console-webhook-test";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/results" element={<DynamicResultsPage />} />
          <Route path="/test" element={<TestVisualization />} />
          <Route path="/visualization/:id" element={<VisualizationView />} />
          <Route path="/visualization-test" element={<VisualizationTest />} />
          <Route path="/visualization-demo" element={<VisualizationDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
