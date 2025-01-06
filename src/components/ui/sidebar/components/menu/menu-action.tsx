import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { SidebarMenuActionProps } from "../../types";

export const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ asChild = false, showOnHover = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-sidebar="menu-action"
        data-show-on-hover={showOnHover}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground",
          showOnHover && "opacity-0 group-hover/menu-item:opacity-100",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarMenuAction.displayName = "SidebarMenuAction";