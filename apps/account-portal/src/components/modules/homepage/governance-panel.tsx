import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { Link } from "@tanstack/react-router";
import { Vote } from "lucide-react";

/** Empty governance state shown when the wallet has not delegated its Realms. */
export function NoDelegateCard() {
  return (
    <SectionCard
      title="Governance"
      description="Delegate your Realms to take part in DAO votes."
      className="h-full"
      contentClassName="flex flex-col items-center justify-center gap-3 py-6 text-center"
    >
      <span className="bg-muted text-primary flex size-10 items-center justify-center rounded-full">
        <Vote className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="realm-group-title">No delegate selected</p>
        <p className="text-muted-foreground text-sm">
          Choose a delegate or delegate to yourself to vote.
        </p>
      </div>
      <Button asChild className="w-full sm:w-auto">
        <Link to="/delegate/list">Choose a delegate</Link>
      </Button>
    </SectionCard>
  );
}
