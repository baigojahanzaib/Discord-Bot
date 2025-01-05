import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import CommandList from "./components/CommandList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/commands"
            element={
              <DashboardLayout>
                <CommandList />
              </DashboardLayout>
            }
          />
          <Route
            path="/roles"
            element={
              <DashboardLayout>
                <div className="text-white">Roles Management (Coming Soon)</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/announcements"
            element={
              <DashboardLayout>
                <div className="text-white">
                  Announcements System (Coming Soon)
                </div>
              </DashboardLayout>
            }
          />
          <Route
            path="/tickets"
            element={
              <DashboardLayout>
                <div className="text-white">Ticket System (Coming Soon)</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/giveaways"
            element={
              <DashboardLayout>
                <div className="text-white">Giveaways (Coming Soon)</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/moderation"
            element={
              <DashboardLayout>
                <div className="text-white">Moderation Tools (Coming Soon)</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <div className="text-white">Bot Settings (Coming Soon)</div>
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;