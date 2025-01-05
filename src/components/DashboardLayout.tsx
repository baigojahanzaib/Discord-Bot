import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-discord-darker">
        <div className="flex h-full">
          {/* Mobile sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30`}
          >
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;