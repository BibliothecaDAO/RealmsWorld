import { cn } from "@realms-world/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

interface PageLayoutProps
  extends VariantProps<typeof baseLayerWrapperVariants> {
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "default";
}
const baseLayerWrapperVariants = cva([], {
  variants: {
    size: {
      default: "container",
      sm: "max-w-7xl w-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const PageLayout = ({ title, children, size }: PageLayoutProps) => {
  return (
    <div className="relative flex w-full flex-col space-y-6 overflow-y-hidden pt-24 sm:pl-32 sm:pt-24">
      <div className={cn("container mx-auto px-4", baseLayerWrapperVariants({ size }))}>
        {title && (
          <>
            <h1 className="mb-8">{title}</h1>
            <hr className="my-8 border" />
          </>
        )}
        {children}
      </div>
    </div>
  );
};
