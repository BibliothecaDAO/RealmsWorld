import { cn } from "@realms-world/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-background-stronger animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
