import { Users, MessageSquare, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  description: string;
}

const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => (
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

export const StatCards = () => {
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
      return data || [];
    },
  });

  const successRate = commandCount
    ? Math.round(
        ((commandCount -
          (commandStats?.reduce((acc, stat) => acc + (stat.success ? 0 : 1), 0) ||
            0)) /
          commandCount) *
          100
      )
    : 0;

  return (
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
        value={`${successRate}%`}
        icon={Shield}
        description="Command success rate"
      />
    </div>
  );
};