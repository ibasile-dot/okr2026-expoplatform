import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import FindingsPage from "./pages/FindingsPage";
import ActionPlanPage from "./pages/ActionPlanPage";
import AutomationIdeasPage from "./pages/AutomationIdeasPage";
import WorkaroundsPage from "./pages/WorkaroundsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/findings" element={<FindingsPage />} />
            <Route path="/action-plan" element={<ActionPlanPage />} />
            <Route path="/automation-ideas" element={<AutomationIdeasPage />} />
            <Route path="/workarounds" element={<WorkaroundsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
