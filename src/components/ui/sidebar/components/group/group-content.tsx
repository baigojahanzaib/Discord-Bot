import React from "react";
import { cn } from "@/lib/utils";
import { SidebarGroupContentProps } from "../../types";

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("space-y-1", className)} {...props} />
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";