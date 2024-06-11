import * as React from "react";

import { cn } from "@realms-world/utils";

export const inputBaseStyles = cn(
  "flex h-10 w-full rounded-md bg-black/20 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visibile:outline-none focus-visibile:ring-1 focus-visibile:ring-ring transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50 border-input border font-sans",
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputBaseStyles, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
