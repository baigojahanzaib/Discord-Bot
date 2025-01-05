import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserPlus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RoleManagement = () => {
  const { toast } = useToast();
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  const { data: roles, isLoading } = useQuery({
    queryKey: ["server-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("server_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleAddRole = async () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("server_roles").insert({
      role_name: newRoleName,
      description: newRoleDescription,
      role_id: Date.now().toString(), // Temporary ID for demo
      is_self_assignable: false,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Role created successfully",
    });

    setNewRoleName("");
    setNewRoleDescription("");
  };

  const handleToggleSelfAssignable = async (roleId: string, currentValue: boolean) => {
    const { error } = await supabase
      .from("server_roles")
      .update({ is_self_assignable: !currentValue })
      .eq("id", roleId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Role updated successfully",
    });
  };

  const handleDeleteRole = async (roleId: string) => {
    const { error } = await supabase
      .from("server_roles")
      .delete()
      .eq("id", roleId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Role deleted successfully",
    });
  };

  if (isLoading) {
    return <div className="text-white">Loading roles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-discord-dark rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Role</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName" className="text-white">Role Name</Label>
            <Input
              id="roleName"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Enter role name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="roleDescription" className="text-white">Description</Label>
            <Input
              id="roleDescription"
              value={newRoleDescription}
              onChange={(e) => setNewRoleDescription(e.target.value)}
              placeholder="Enter role description"
              className="mt-1"
            />
          </div>
          <Button onClick={handleAddRole} className="w-full">
            <UserPlus className="mr-2" />
            Add Role
          </Button>
        </div>
      </div>

      <div className="bg-discord-dark rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Server Roles</h2>
        <div className="space-y-4">
          {roles?.map((role) => (
            <div
              key={role.id}
              className="flex items-center justify-between bg-discord-darker p-4 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="text-white font-medium">{role.role_name}</h3>
                {role.description && (
                  <p className="text-gray-400 text-sm">{role.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`self-assignable-${role.id}`} className="text-white">
                    Self Assignable
                  </Label>
                  <Switch
                    id={`self-assignable-${role.id}`}
                    checked={role.is_self_assignable}
                    onCheckedChange={() =>
                      handleToggleSelfAssignable(role.id, role.is_self_assignable || false)
                    }
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;