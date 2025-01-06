import React from "react";
import { cn } from "@/lib/utils";
import { SidebarTriggerProps } from "../../types";

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      data-sidebar="trigger"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
);
SidebarTrigger.displayName = "SidebarTrigger";