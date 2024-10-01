import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@realms-world/utils";

interface PageLayoutProps
  extends VariantProps<typeof baseLayerWrapperVariants> {
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "default";
}
const baseLayerWrapperVariants = cva([], {
  variants: {
    size: {
      default: "w-full",
      sm: "max-w-7xl container",
      full: "w-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const PageLayout = ({ title, children, size }: PageLayoutProps) => {
  return (
    <div className="relative flex w-full flex-col space-y-6 pt-24 sm:pl-32 ">
      <div
        className={cn(
          "mx-auto px-8",
          baseLayerWrapperVariants({ size }),
        )}
      >
        {title && (
          <>
            <h1 className="mb-8 text-4xl font-bold">{title}</h1>
            <hr className="my-8 border" />
          </>
        )}
        {children}
      </div>
    </div>
  );
};
