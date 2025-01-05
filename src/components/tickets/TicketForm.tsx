import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TicketFormData {
  subject: string;
  message: string;
}

const TicketForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<TicketFormData>();

  const createTicket = useMutation({
    mutationFn: async (data: TicketFormData) => {
      // First create the ticket
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert([
          {
            subject: data.subject,
            creator_id: "user123", // Replace with actual user ID
            creator_name: "User", // Replace with actual username
            channel_id: "channel123", // Replace with actual channel ID
            status: "open",
          },
        ])
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Then create the initial message
      const { error: messageError } = await supabase
        .from("ticket_messages")
        .insert([
          {
            ticket_id: ticket.id,
            content: data.message,
            author_id: "user123", // Replace with actual user ID
            author_name: "User", // Replace with actual username
          },
        ]);

      if (messageError) throw messageError;

      return ticket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast({
        title: "Success",
        description: "Ticket created successfully",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive",
      });
      console.error("Error creating ticket:", error);
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    try {
      await createTicket.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Ticket subject"
          {...register("subject", { required: true })}
        />
      </div>
      <div>
        <Textarea
          placeholder="Describe your issue..."
          {...register("message", { required: true })}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Ticket"}
      </Button>
    </form>
  );
};

export default TicketForm;