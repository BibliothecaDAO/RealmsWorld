import type { ReactNode } from "react";
import { SectionCard } from "@/components/ui/section-card";

export interface VelordsPositionProps {
  balance?: ReactNode;
  sharePercent?: ReactNode;
  locked?: ReactNode;
  unlockDate?: ReactNode;
  estimatedWeeklyRewards?: ReactNode;
}

/** The connected wallet's veLORDS lock summary. Missing values render "—". */
export function VelordsPosition({
  balance,
  sharePercent,
  locked,
  unlockDate,
  estimatedWeeklyRewards,
}: VelordsPositionProps) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: "veLORDS balance", value: balance },
    { label: "Supply share", value: sharePercent },
    { label: "Locked LORDS", value: locked },
    { label: "Unlocks", value: unlockDate },
    { label: "Est. weekly rewards", value: estimatedWeeklyRewards },
  ];

  return (
    <SectionCard
      title="Your position"
      description="Your lock and share of weekly rewards."
    >
      <dl className="divide-border divide-y">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="realm-label">{row.label}</dt>
            <dd className="realm-stat truncate text-sm font-semibold">
              {row.value ?? <span className="text-muted-foreground">—</span>}
            </dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
