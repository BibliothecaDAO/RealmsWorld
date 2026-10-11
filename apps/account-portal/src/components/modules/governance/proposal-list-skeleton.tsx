import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder rows matching ProposalRow's layout. */
export function ProposalListSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="divide-border flex flex-col divide-y">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-full max-w-md" />
            <Skeleton className="h-4 w-48" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <Skeleton className="h-1.5 w-full sm:w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
