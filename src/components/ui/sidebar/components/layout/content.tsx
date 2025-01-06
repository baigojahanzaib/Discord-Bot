import React from "react";
import { cn } from "@/lib/utils";
import { SidebarContentProps } from "../../types";

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn("flex flex-1 flex-col overflow-hidden", className)}
      {...props}
    />
  )
);
SidebarContent.displayName = "SidebarContent";