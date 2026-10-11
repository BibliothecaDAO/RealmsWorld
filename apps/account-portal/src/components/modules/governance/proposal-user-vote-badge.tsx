import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MinusCircle, XCircle } from "lucide-react";

export const ProposalUserVoteBadge = ({ choice }: { choice: 1 | 2 | 3 }) => {
  return (
    <>
      {choice === 1 && (
        <Badge
          variant="outline"
          className="border-success text-success hover:bg-success/20 flex w-fit rounded py-2"
        >
          <CheckCircle2 className="text-success mr-2 h-5 w-5" /> Yes
        </Badge>
      )}

      {choice === 2 && (
        <Badge
          variant="outline"
          className="border-destructive bg-destructive/10 hover:bg-destructive/20 flex rounded py-2"
        >
          <XCircle className="text-destructive mr-2 h-5 w-5" /> No
        </Badge>
      )}

      {choice === 3 && (
        <Badge
          variant="outline"
          className="border-muted-foreground bg-muted/20 hover:bg-muted flex rounded py-2"
        >
          <MinusCircle className="text-muted-foreground mr-2 h-5 w-5" /> Abstain
        </Badge>
      )}
    </>
  );
};
