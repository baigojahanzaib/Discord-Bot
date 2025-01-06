import React from "react";
import { cn } from "@/lib/utils";
import { SidebarMenuBadgeProps } from "../../types";

export const SidebarMenuBadge = React.forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "ml-auto flex h-6 items-center justify-center rounded-md bg-primary/10 px-2 text-sm font-medium text-primary",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";