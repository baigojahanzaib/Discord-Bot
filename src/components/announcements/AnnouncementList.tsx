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

export function AnnouncementList() {
  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements?.map((announcement) => (
          <TableRow key={announcement.id}>
            <TableCell>{announcement.title}</TableCell>
            <TableCell>{announcement.channel_id}</TableCell>
            <TableCell>
              {new Date(announcement.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {announcement.scheduled_for
                ? new Date(announcement.scheduled_for) > new Date()
                  ? "Scheduled"
                  : "Sent"
                : "Sent"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}