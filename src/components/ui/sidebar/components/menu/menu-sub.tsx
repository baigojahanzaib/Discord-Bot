import React from "react";
import { cn } from "@/lib/utils";
import { SidebarMenuSubProps, SidebarMenuSubItemProps, SidebarMenuSubButtonProps } from "../../types";

export const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";

export const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-sidebar="menu-sub-item" className={cn("relative", className)} {...props} />
  )
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ asChild = false, size = "md", isActive = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
          size === "sm" && "gap-1.5 px-3 py-1 text-xs",
          isActive && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";