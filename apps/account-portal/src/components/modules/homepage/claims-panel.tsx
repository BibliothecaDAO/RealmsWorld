import type { ReactNode } from "react";
import LordsIcon from "@/components/icons/lords.svg?react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface ClaimsPanelProps {
  realmsClaimable: ReactNode;
  veLordsClaimable: ReactNode;
  canClaimRealms: boolean;
  canClaimVeLords: boolean;
  isClaimingRealms?: boolean;
  isClaimingVeLords?: boolean;
  onClaimRealms?: () => void;
  onClaimVeLords?: () => void;
}

function ClaimRow({
  to,
  title,
  description,
  amount,
}: {
  to: "/realms/claims" | "/velords";
  title: string;
  description: string;
  amount: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="realm-interactive-row group focus-visible:ring-ring/50 flex items-center justify-between gap-3 rounded-md p-3 outline-none focus-visible:ring-[3px]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
          <LordsIcon className="size-5" />
        </span>
        <div className="min-w-0">
          <div className="realm-group-title truncate">{title}</div>
          <div className="realm-label truncate">{description}</div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="realm-stat text-lg font-semibold">{amount}</span>
        <ChevronRight className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
      </div>
    </Link>
  );
}

/** Claimable LORDS rewards with one-click claim actions. */
export function ClaimsPanel({
  realmsClaimable,
  veLordsClaimable,
  canClaimRealms,
  canClaimVeLords,
  isClaimingRealms = false,
  isClaimingVeLords = false,
  onClaimRealms,
  onClaimVeLords,
}: ClaimsPanelProps) {
  return (
    <SectionCard
      title="Available claims"
      description="LORDS rewards ready to collect on Starknet."
      contentClassName="space-y-2"
      footer={
        <>
          <Button
            className="w-full sm:flex-1"
            variant="outline"
            onClick={onClaimRealms}
            disabled={isClaimingRealms || !canClaimRealms}
          >
            {isClaimingRealms ? "Claiming…" : "Claim Realms"}
          </Button>
          <Button
            className="w-full sm:flex-1"
            variant="outline"
            onClick={onClaimVeLords}
            disabled={isClaimingVeLords || !canClaimVeLords}
          >
            {isClaimingVeLords ? "Claiming…" : "Claim veLORDS"}
          </Button>
        </>
      }
    >
      <ClaimRow
        to="/realms/claims"
        title="Realms emissions"
        description="Rewards for Realms held on Starknet"
        amount={realmsClaimable}
      />
      <ClaimRow
        to="/velords"
        title="veLORDS rewards"
        description="Staking rewards from your lock"
        amount={veLordsClaimable}
      />
    </SectionCard>
  );
}
