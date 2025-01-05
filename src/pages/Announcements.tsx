import DashboardLayout from "@/components/DashboardLayout";
import { AnnouncementForm } from "@/components/announcements/AnnouncementForm";
import { AnnouncementList } from "@/components/announcements/AnnouncementList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Announcements() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold text-white">Announcements</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-discord-dark border-discord-blurple">
            <CardHeader>
              <CardTitle className="text-white">Create Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <AnnouncementForm />
            </CardContent>
          </Card>

          <Card className="bg-discord-dark border-discord-blurple">
            <CardHeader>
              <CardTitle className="text-white">Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <AnnouncementList />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}