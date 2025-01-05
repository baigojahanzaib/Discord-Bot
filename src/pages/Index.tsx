import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Moderation",
      description: "Powerful tools to keep your server safe and clean",
    },
    {
      icon: Users,
      title: "Role Management",
      description: "Easily manage and assign roles to your members",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Built for performance and 99.9% uptime",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-discord-darker to-discord-dark">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-float mb-8">
          <Bot className="mx-auto h-24 w-24 text-discord-blurple" />
        </div>
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Next Bot Dashboard
        </h1>
        <p className="mb-8 text-lg text-gray-300 md:text-xl">
          The most powerful Discord bot for your server management needs
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
            <Button className="bg-discord-blurple hover:bg-discord-blurple/90">
              Open Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg bg-discord-dark p-6 text-center transition-transform hover:scale-105"
              >
                <div className="mb-4 flex justify-center">
                  <Icon className="h-12 w-12 text-discord-blurple" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;