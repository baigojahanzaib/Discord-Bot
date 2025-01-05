import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Bell, Shield } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  icon: any;
  description: string;
}) => (
  <Card className="bg-discord-dark border-discord-blurple">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <Icon className="h-4 w-4 text-discord-blurple" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Members"
            value="1,234"
            icon={Users}
            description="Active server members"
          />
          <StatCard
            title="Active Tickets"
            value="23"
            icon={MessageSquare}
            description="Open support tickets"
          />
          <StatCard
            title="Announcements"
            value="156"
            icon={Bell}
            description="Total announcements sent"
          />
          <StatCard
            title="Mod Actions"
            value="89"
            icon={Shield}
            description="Actions in last 30 days"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="col-span-2 bg-discord-dark border-discord-blurple">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 rounded-lg bg-discord-darker p-4"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        New member joined
                      </p>
                      <p className="text-sm text-muted-foreground">
                        User#1234 joined the server
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">2h ago</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-discord-dark border-discord-blurple">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
                  Create Announcement
                </button>
                <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
                  Start Giveaway
                </button>
                <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
                  View Logs
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;