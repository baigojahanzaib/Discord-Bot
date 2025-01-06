import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
        
        {!session ? (
          <div className="max-w-md mx-auto bg-discord-dark p-6 rounded-lg shadow-lg">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#5865F2',
                      brandAccent: '#4752C4',
                    },
                  },
                },
              }}
              providers={["discord"]}
              redirectTo={window.location.origin}
            />
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <Button className="bg-discord-blurple hover:bg-discord-blurple/90">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
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