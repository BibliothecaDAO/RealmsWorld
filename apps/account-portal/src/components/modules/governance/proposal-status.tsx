import type { Proposal } from "@/gql/snapshot/graphql";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { CheckCircle2, Clock, MinusCircle, XCircle } from "lucide-react";

export type ProposalScores = Pick<
  Proposal,
  "max_end" | "scores_total" | "scores_1" | "scores_2" | "scores_3"
>;

export interface ProposalStatus {
  label: string;
  className: string;
  icon: LucideIcon;
}

/** Snapshot quorum used to decide whether a closed proposal passed. */
const QUORUM = 1500;

export function isProposalActive(proposal: Pick<Proposal, "max_end">) {
  return proposal.max_end * 1000 > Date.now();
}

/** Outcome of a proposal: Active while voting is open, otherwise Passed / Failed / Quorum not met. */
export function getProposalStatus(proposal: ProposalScores): ProposalStatus {
  if (isProposalActive(proposal)) {
    return {
      label: "Active",
      className: "border-primary text-primary",
      icon: Clock,
    };
  }
  const total = proposal.scores_total ?? 0;
  if (
    total >= QUORUM &&
    Number(proposal.scores_1 ?? 0) > Number(proposal.scores_2 ?? 0)
  ) {
    return {
      label: "Passed",
      className: "border-success text-success",
      icon: CheckCircle2,
    };
  }
  if (total < QUORUM) {
    return {
      label: "Quorum not met",
      className: "border-border-strong text-muted-foreground",
      icon: XCircle,
    };
  }
  return {
    label: "Failed",
    className: "border-destructive text-destructive",
    icon: MinusCircle,
  };
}

export function ProposalStatusBadge({
  status,
  className,
}: {
  status: ProposalStatus;
  className?: string;
}) {
  const Icon = status.icon;
  return (
    <Badge variant="outline" className={cn(status.className, className)}>
      <Icon />
      {status.label}
    </Badge>
  );
}
