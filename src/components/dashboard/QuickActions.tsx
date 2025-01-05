import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuickActions = () => {
  return (
    <Card className="bg-discord-dark border-discord-blurple">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
            Add New Command
          </button>
          <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
            View Server List
          </button>
          <button className="w-full rounded-lg bg-discord-blurple px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
            View Command Logs
          </button>
        </div>
      </CardContent>
    </Card>
  );
};