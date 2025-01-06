import React from "react";
import { cn } from "@/lib/utils";
import { SidebarRailProps } from "../../types";

export const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      data-sidebar="rail"
      className={cn(
        "absolute -right-3 top-6 z-40 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm",
        className
      )}
      {...props}
    />
  )
);
SidebarRail.displayName = "SidebarRail";