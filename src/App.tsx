import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import CommandList from "./components/CommandList";
import Announcements from "./pages/Announcements";
import AutoMod from "./pages/AutoMod";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/automod" element={<AutoMod />} />
          <Route
            path="/roles"
            element={
              <DashboardLayout>
                <div className="text-white">Roles Management (Coming Soon)</div>
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
            path="/tickets"
            element={
              <DashboardLayout>
                <div className="text-white">Support Tickets (Coming Soon)</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <div className="text-white">Settings (Coming Soon)</div>
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;