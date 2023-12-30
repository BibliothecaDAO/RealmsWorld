import * as React from "react";

import { cn } from "@realms-world/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const inputBaseStyles = cn(
  "flex h-10 w-full rounded-md bg-black/20 px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-bright-yellow",
  "focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-bright-yellow dark:text-bright-yellow dark:border-bright-yellow dark:focus:border-bright-yellow font-sans",
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input className={cn(inputBaseStyles, className)} ref={ref} {...props} />
    );
  },
);
Input.displayName = "Input";

export { Input, inputBaseStyles };
