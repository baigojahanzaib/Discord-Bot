import DashboardLayout from "@/components/DashboardLayout";
import { StatCards } from "@/components/dashboard/StatCards";
import { CommandUsageChart } from "@/components/dashboard/CommandUsageChart";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
        
        <StatCards />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <CommandUsageChart />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;