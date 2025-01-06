import { VariantProps } from "class-variance-authority";
import { sidebarMenuButtonVariants } from "./variants";

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof import("@/components/ui/tooltip").TooltipContent>;
}