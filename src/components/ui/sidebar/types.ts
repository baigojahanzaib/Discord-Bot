import { VariantProps } from "class-variance-authority";
import { sidebarMenuButtonVariants } from "./variants";
import { TooltipContent } from "@/components/ui/tooltip";

// Base props interface
interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SidebarProps extends BaseProps {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "none" | "icon" | "offcanvas";
}

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface SidebarRailProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface SidebarInsetProps extends BaseProps {}

export interface SidebarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface SidebarHeaderProps extends BaseProps {}

export interface SidebarFooterProps extends BaseProps {}

export interface SidebarContentProps extends BaseProps {}

export interface SidebarGroupProps extends BaseProps {}

export interface SidebarGroupLabelProps extends BaseProps {
  asChild?: boolean;
}

export interface SidebarGroupActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface SidebarGroupContentProps extends BaseProps {}

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

export interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  showOnHover?: boolean;
}

export interface SidebarMenuBadgeProps extends BaseProps {}

export interface SidebarMenuSkeletonProps extends BaseProps {
  showIcon?: boolean;
}

export interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLUListElement> {}

export interface SidebarMenuSubItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export interface SidebarMenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}