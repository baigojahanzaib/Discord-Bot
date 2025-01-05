import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";

export const CommandUsageChart = () => {
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
  );
};