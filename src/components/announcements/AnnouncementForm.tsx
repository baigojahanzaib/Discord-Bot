import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AnnouncementFormData {
  title: string;
  content: string;
  channelId: string;
  scheduledFor?: string;
  image?: File;
}

export function AnnouncementForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<AnnouncementFormData>();

  const onSubmit = async (data: AnnouncementFormData) => {
    setIsLoading(true);
    try {
      let imageUrl = null;
      
      if (data.image) {
        const fileExt = data.image.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('announcements')
          .upload(filePath, data.image);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('announcements')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      const { error } = await supabase.from('announcements').insert({
        title: data.title,
        content: data.content,
        channel_id: data.channelId,
        scheduled_for: data.scheduledFor,
        image_url: imageUrl,
        created_by: "user", // TODO: Replace with actual user ID
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Announcement created successfully",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Announcement title" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Announcement content" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="channelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Discord channel ID" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduledFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule For (Optional)</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Announcement"}
        </Button>
      </form>
    </Form>
  );
}