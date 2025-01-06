import React from "react";
import { cn } from "@/lib/utils";
import { SidebarFooterProps } from "../../types";

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex items-center border-t p-4", className)}
      {...props}
    />
  )
);
SidebarFooter.displayName = "SidebarFooter";