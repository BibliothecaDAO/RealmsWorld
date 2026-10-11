import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/** Grid for the veLORDS MetricCard tiles: 2 columns on mobile, 3 from sm. */
export function VelordsStats({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="veLORDS metrics"
      className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3"
    >
      {children}
    </section>
  );
}

/** Value placeholder for a MetricCard whose data is still loading. */
export function MetricValueSkeleton() {
  return <Skeleton className="mt-1 h-7 w-20" />;
}
