import React from "react";
import { cn } from "@/lib/utils";
import { SidebarMenuSkeletonProps } from "../../types";

export const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
  ({ showIcon = true, className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex items-center gap-3 px-3 py-2", className)}
      {...props}
    >
      {showIcon && (
        <div className="h-5 w-5 animate-pulse rounded-md bg-muted" />
      )}
      <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
    </div>
  )
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";