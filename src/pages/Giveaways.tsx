import DashboardLayout from "@/components/DashboardLayout";
import GiveawayForm from "@/components/giveaways/GiveawayForm";
import GiveawayList from "@/components/giveaways/GiveawayList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Giveaways = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Giveaways</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-discord-dark border-discord-blurple">
            <CardHeader>
              <CardTitle className="text-white">Create Giveaway</CardTitle>
            </CardHeader>
            <CardContent>
              <GiveawayForm />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Active Giveaways</h3>
            <GiveawayList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Giveaways;