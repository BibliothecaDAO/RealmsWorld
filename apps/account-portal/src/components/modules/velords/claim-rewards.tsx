import LordsIcon from "@/components/icons/lords.svg?react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useTokenColors } from "@/hooks/use-token-colors";
import useVeLordsClaims from "@/hooks/use-velords-claims";
import { formatNumber } from "@/utils/utils";
import Confetti from "react-confetti";
import { formatEther } from "viem";

export const VelordsRewards = () => {
  const {
    recipient,
    setRecipient,
    isRecipientValid,
    claimCall,
    lordsClaimable,
    claimRewards,
    claimIsSubmitting,
  } = useVeLordsClaims();
  const confettiColors = useTokenColors(
    ["--primary", "--chart-1", "--chart-5", "--realm-accent-ember"],
    ["#e7cf88", "#c4874a", "#f1dc9d"],
  );
  const handleClaimRewards = async () => {
    try {
      const hash = await claimRewards();
      toast({
        description: (
          <div className="flex items-center gap-2">
            LORDS claimed · {hash.transaction_hash}
          </div>
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Unable to claim rewards.",
      });
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {lordsClaimable && Number(lordsClaimable) > 0 ? (
        <Confetti
          colors={confettiColors}
          opacity={0.5}
          width={600} // Adjust width as needed
          height={300} // Adjust height as needed
          numberOfPieces={100}
          recycle={true}
          gravity={0.055}
        />
      ) : null}
      <CardHeader>
        <CardTitle>veLORDS rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <LordsIcon className="w-9 shrink-0" />
            <span className="realm-stat text-3xl font-semibold">
              {lordsClaimable &&
                formatNumber(Number(formatEther(lordsClaimable)))}
            </span>{" "}
            <span className="text-muted-foreground text-sm">LORDS to claim</span>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button className="p-0" variant={"link"}>
                + Change Recipient
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Input
                placeholder="Recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              {!isRecipientValid && (
                <p className="text-destructive mt-2 text-xs">
                  Enter a valid Starknet recipient address.
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>
          <Button
            onClick={() => void handleClaimRewards()}
            className="w-full"
            disabled={
              claimIsSubmitting ||
              !isRecipientValid ||
              !claimCall ||
              lordsClaimable <= 0n
            }
          >
            {claimIsSubmitting ? "Claiming…" : "Claim LORDS"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground flex-col gap-2 text-xs">
        <div className="flex items-center gap-2">
          veLORDS rewards are distributed at weekly epochs
        </div>
      </CardFooter>
    </Card>
  );
};
