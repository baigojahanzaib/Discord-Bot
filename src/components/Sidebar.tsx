import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  MessageSquare,
  Gift,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Roles", href: "/roles", icon: Users },
    { name: "Announcements", href: "/announcements", icon: Bell },
    { name: "Tickets", href: "/tickets", icon: MessageSquare },
    { name: "Giveaways", href: "/giveaways", icon: Gift },
    { name: "Moderation", href: "/moderation", icon: Shield },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-discord-dark">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-bold text-white">Next Bot</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                location.pathname === item.href
                  ? "bg-discord-blurple text-white"
                  : "text-gray-300 hover:bg-discord-darker hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-6 w-6 flex-shrink-0",
                  location.pathname === item.href
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;