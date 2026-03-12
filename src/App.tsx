import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AppLayout from "./components/AppLayout";
import OkrOverviewPage from "./pages/OkrOverviewPage";
import OkrDetailPage from "./pages/OkrDetailPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<OkrOverviewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/okr/:okrId" element={<OkrDetailPage />} />
        <Route path="/okr/:okrId/metrics" element={<OkrDetailPage />} />
        <Route path="/okr/:okrId/roadmap" element={<OkrDetailPage />} />
        <Route path="/okr/:okrId/findings" element={<OkrDetailPage />} />
        <Route path="/okr/:okrId/action-plan" element={<OkrDetailPage />} />
        <Route path="/okr/:okrId/updates" element={<OkrDetailPage />} />
        <Route path="/okr/:okrId/automation-ideas" element={<OkrDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProtectedApp />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
