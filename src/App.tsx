import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import OkrOverviewPage from "./pages/OkrOverviewPage";
import OkrDetailPage from "./pages/OkrDetailPage";
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
            <Route path="/okr/:okrId" element={<OkrDetailPage />} />
            <Route path="/okr/:okrId/metrics" element={<OkrDetailPage />} />
            <Route path="/okr/:okrId/roadmap" element={<OkrDetailPage />} />
            <Route path="/okr/:okrId/findings" element={<OkrDetailPage />} />
            <Route path="/okr/:okrId/action-plan" element={<OkrDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
