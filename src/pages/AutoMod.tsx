import DashboardLayout from "@/components/DashboardLayout";
import AutoModSettings from "@/components/automod/AutoModSettings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AutoMod = () => {
  const { data: servers } = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discord_servers")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">AutoMod Settings</h2>
        {servers && servers.length > 0 ? (
          <AutoModSettings serverId={servers[0].id} />
        ) : (
          <div className="text-white">No active servers found</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AutoMod;