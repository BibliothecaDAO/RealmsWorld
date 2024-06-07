import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@realms-world/utils";

const StatusDot = (status: string | undefined) => {
  let color = "";
  switch (status) {
    case "beta":
    case "alpha":
    case "mainnet":
      color = "bg-green-500"; // Green for beta, alpha, and mainnet
      break;
    case "development":
      color = "bg-red-500"; // Red for development
      break;
    default:
      color = "bg-gray-500"; // Default color for unspecified statuses
  }
  return (
    <span
      className={`h-2 w-2 ${color} mr-2 inline-block animate-pulse rounded-full`}
    ></span>
  );
};

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants, StatusDot };
