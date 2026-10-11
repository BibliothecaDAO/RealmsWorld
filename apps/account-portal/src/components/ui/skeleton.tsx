import { cn } from "@/utils/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("bg-muted/70 animate-pulse motion-reduce:animate-none rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
