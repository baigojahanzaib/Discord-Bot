import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Bell, Shield } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string | number;
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
  const { data: serverCount } = useQuery({
    queryKey: ["serverCount"],
    queryFn: async () => {
      const { count } = await supabase
        .from("discord_servers")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: commandCount } = useQuery({
    queryKey: ["commandCount"],
    queryFn: async () => {
      const { count } = await supabase
        .from("command_logs")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: activeCommands } = useQuery({
    queryKey: ["activeCommands"],
    queryFn: async () => {
      const { count } = await supabase
        .from("bot_commands")
        .select("*", { count: "exact", head: true })
        .eq("enabled", true);
      return count || 0;
    },
  });

  const { data: commandStats } = useQuery({
    queryKey: ["commandStats"],
    queryFn: async () => {
      const { data } = await supabase
        .from("command_logs")
        .select("executed_at, success")
        .order("executed_at", { ascending: true })
        .limit(30);

      // Group by day and count successes/failures
      const stats = (data || []).reduce((acc: any[], log) => {
        const date = new Date(log.executed_at).toLocaleDateString();
        const existing = acc.find((item) => item.date === date);
        
        if (existing) {
          if (log.success) existing.success++;
          else existing.failures++;
        } else {
          acc.push({
            date,
            success: log.success ? 1 : 0,
            failures: log.success ? 0 : 1,
          });
        }
        
        return acc;
      }, []);

      return stats;
    },
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Servers"
            value={serverCount || 0}
            icon={Users}
            description="Connected Discord servers"
          />
          <StatCard
            title="Commands Used"
            value={commandCount || 0}
            icon={MessageSquare}
            description="Total commands executed"
          />
          <StatCard
            title="Active Commands"
            value={activeCommands || 0}
            icon={Bell}
            description="Enabled bot commands"
          />
          <StatCard
            title="Success Rate"
            value={`${commandCount ? Math.round((commandCount - (commandStats?.reduce((acc, stat) => acc + stat.failures, 0) || 0)) / commandCount * 100) : 0}%`}
            icon={Shield}
            description="Command success rate"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="col-span-2 bg-discord-dark border-discord-blurple">
            <CardHeader>
              <CardTitle className="text-white">Command Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  className="h-full"
                  config={{
                    success: { theme: { light: "#5865F2", dark: "#5865F2" } },
                    failures: { theme: { light: "#ED4245", dark: "#ED4245" } },
                  }}
                >
                  <AreaChart data={commandStats || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="success"
                      stackId="1"
                      stroke="#5865F2"
                      fill="#5865F2"
                    />
                    <Area
                      type="monotone"
                      dataKey="failures"
                      stackId="1"
                      stroke="#ED4245"
                      fill="#ED4245"
                    />
                  </AreaChart>
                </ChartContainer>
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
                  Add New Command
                </button>
                <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
                  View Server List
                </button>
                <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
                  View Command Logs
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