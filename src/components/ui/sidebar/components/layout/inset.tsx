import React from "react";
import { cn } from "@/lib/utils";
import { SidebarInsetProps } from "../../types";

export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="inset"
      className={cn("-mx-4 border-y px-4 py-4", className)}
      {...props}
    />
  )
);
SidebarInset.displayName = "SidebarInset";