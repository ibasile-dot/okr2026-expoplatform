import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import OkrOverviewPage from "./pages/OkrOverviewPage";
import OkrPlaceholderPage from "./pages/OkrPlaceholderPage";
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
            <Route path="/" element={<OkrOverviewPage />} />
            {/* OKR 1, 2, 3, 5 placeholder pages */}
            <Route path="/okr/:okrId" element={<OkrPlaceholderPage />} />
            {/* OKR 4 — Full build-out */}
            <Route path="/okr/4/overview" element={<Index />} />
            <Route path="/okr/4/findings" element={<FindingsPage />} />
            <Route path="/okr/4/action-plan" element={<ActionPlanPage />} />
            <Route path="/okr/4/automation-ideas" element={<AutomationIdeasPage />} />
            <Route path="/okr/4/workarounds" element={<WorkaroundsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
