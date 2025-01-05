import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const GiveawayForm = () => {
  const [prize, setPrize] = useState("");
  const [description, setDescription] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [duration, setDuration] = useState(24); // Duration in hours
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createGiveaway = useMutation({
    mutationFn: async () => {
      const endsAt = new Date();
      endsAt.setHours(endsAt.getHours() + duration);

      const { data, error } = await supabase.from("giveaways").insert([
        {
          prize,
          description,
          winner_count: winnerCount,
          ends_at: endsAt.toISOString(),
          channel_id: "default", // This would be set based on selected channel
          created_by: "system", // This would be set based on authenticated user
        },
      ]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giveaways"] });
      toast({
        title: "Success",
        description: "Giveaway created successfully!",
      });
      setPrize("");
      setDescription("");
      setWinnerCount(1);
      setDuration(24);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create giveaway. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating giveaway:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGiveaway.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Prize"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          required
          className="bg-discord-dark text-white"
        />
      </div>
      <div>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-discord-dark text-white"
        />
      </div>
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="Winner Count"
          value={winnerCount}
          onChange={(e) => setWinnerCount(parseInt(e.target.value))}
          min={1}
          required
          className="bg-discord-dark text-white"
        />
        <Input
          type="number"
          placeholder="Duration (hours)"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          min={1}
          required
          className="bg-discord-dark text-white"
        />
      </div>
      <Button
        type="submit"
        disabled={createGiveaway.isPending}
        className="w-full"
      >
        {createGiveaway.isPending ? "Creating..." : "Create Giveaway"}
      </Button>
    </form>
  );
};

export default GiveawayForm;