import React from "react";
import { cn } from "@/lib/utils";
import { SidebarHeaderProps } from "../../types";

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex h-14 items-center border-b px-4", className)}
      {...props}
    />
  )
);
SidebarHeader.displayName = "SidebarHeader";