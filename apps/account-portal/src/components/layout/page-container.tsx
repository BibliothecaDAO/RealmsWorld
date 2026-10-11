import type { ReactNode } from "react";
import { cn } from "@/utils/utils";

const widths = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  full: "max-w-none",
} as const;

/** Shared page shell: one max width, 16/24px gutters and a 24px section rhythm. */
export function PageContainer({
  children,
  width = "default",
  className,
}: {
  children: ReactNode;
  width?: keyof typeof widths;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
