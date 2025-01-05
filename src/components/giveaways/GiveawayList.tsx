import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const GiveawayList = () => {
  const { data: giveaways, isLoading } = useQuery({
    queryKey: ["giveaways"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("giveaways")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading giveaways...</div>;
  }

  return (
    <div className="space-y-4">
      {giveaways?.map((giveaway) => (
        <Card key={giveaway.id} className="bg-discord-dark border-discord-blurple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              {giveaway.prize}
            </CardTitle>
            <Badge
              variant={giveaway.status === "active" ? "default" : "secondary"}
            >
              {giveaway.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">{giveaway.description}</p>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Winners: {giveaway.winner_count}</span>
              <span>
                Ends: {formatDistanceToNow(new Date(giveaway.ends_at))} from now
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GiveawayList;