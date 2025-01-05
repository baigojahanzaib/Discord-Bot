import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CommandList = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { data: commands, isLoading } = useQuery({
    queryKey: ["commands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bot_commands")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const toggleCommand = async (id: string, enabled: boolean) => {
    const { error } = await supabase
      .from("bot_commands")
      .update({ enabled })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update command status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Command status updated",
      });
    }
  };

  if (isLoading) {
    return <div>Loading commands...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Bot Commands</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Command
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commands?.map((command) => (
            <TableRow key={command.id}>
              <TableCell className="font-medium">{command.name}</TableCell>
              <TableCell>{command.description}</TableCell>
              <TableCell>
                <Switch
                  checked={command.enabled}
                  onCheckedChange={(checked) =>
                    toggleCommand(command.id, checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommandList;