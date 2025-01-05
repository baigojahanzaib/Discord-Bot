import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AutoModSettingsForm {
  trustedDomains: string;
  bannedWords: string;
  maxMentions: number;
  maxLinks: number;
}

const AutoModSettings = ({ serverId }: { serverId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<AutoModSettingsForm>({
    defaultValues: {
      trustedDomains: "",
      bannedWords: "",
      maxMentions: 5,
      maxLinks: 3,
    },
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ["automod-settings", serverId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("automod_settings")
        .select("*")
        .eq("server_id", serverId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (values: AutoModSettingsForm) => {
      const { error } = await supabase.from("automod_settings").upsert({
        server_id: serverId,
        trusted_domains: values.trustedDomains.split(",").map((d) => d.trim()),
        banned_words: values.bannedWords.split(",").map((w) => w.trim()),
        max_mentions: values.maxMentions,
        max_links: values.maxLinks,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automod-settings"] });
      toast({
        title: "Settings Updated",
        description: "Automod settings have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update automod settings.",
        variant: "destructive",
      });
      console.error("Error updating automod settings:", error);
    },
  });

  const onSubmit = (values: AutoModSettingsForm) => {
    updateSettings.mutate(values);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-discord-dark border-discord-blurple">
      <CardHeader>
        <CardTitle className="text-white">AutoMod Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="trustedDomains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Trusted Domains</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example.com, example.org"
                      className="bg-discord-darker text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of trusted domains
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bannedWords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Banned Words</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="word1, word2"
                      className="bg-discord-darker text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of banned words
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxMentions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Max Mentions</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-discord-darker text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum number of mentions allowed per message
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Max Links</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-discord-darker text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum number of links allowed per message
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-discord-blurple hover:bg-discord-blurple/90"
              disabled={updateSettings.isPending}
            >
              {updateSettings.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AutoModSettings;