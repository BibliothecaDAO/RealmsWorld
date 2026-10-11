import { MetricCard } from "@/components/ui/metric-card";
import { formatNumber } from "@/utils/utils";
import { Users, Vote } from "lucide-react";

/** Delegated votes + token holders represented, as MetricCards. */
export function DelegateStats({
  delegatedVotes,
  tokenHolders,
  className,
}: {
  delegatedVotes: string | number;
  tokenHolders?: string | number | null;
  className?: string;
}) {
  return (
    <div className={className ?? "grid grid-cols-2 gap-3"}>
      <MetricCard
        label="Delegated votes"
        icon={<Vote />}
        value={formatNumber(Number(delegatedVotes)) || "0"}
        hint="Realms"
      />
      <MetricCard
        label="Token holders"
        icon={<Users />}
        value={tokenHolders || "0"}
        hint="Represented"
      />
    </div>
  );
}
