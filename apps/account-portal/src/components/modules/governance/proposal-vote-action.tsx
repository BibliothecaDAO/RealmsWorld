import type { Proposal } from "@/gql/graphql";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useVoteProposal } from "@/hooks/governance/use-vote-proposal";
import { useStarknetWallet } from "@/hooks/use-starknet-wallet";
import { Choice } from "@/types/snapshot";
import { useAccount } from "@starknet-start/react";
import { Check, Minus, X } from "lucide-react";

export const ProposalVoteAction = ({ proposal }: { proposal: Proposal }) => {
  const { vote, selectedChoice, setSelectedChoice } = useVoteProposal(proposal);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [voteReason, setVoteReason] = useState("");
  const proposalTitle =
    (proposal as { metadata?: { title?: string } }).metadata?.title ??
    "this proposal";
  const { address } = useAccount();
  const { requestConnect } = useStarknetWallet();

  const openVoteDialog = async (choice: Choice) => {
    if (!address && !(await requestConnect())) {
      return;
    }

    setSelectedChoice(choice);
    setVoteReason(
      choice === Choice.For
        ? "I support this proposal"
        : choice === Choice.Against
          ? "I oppose this proposal"
          : "I abstain from this proposal",
    );
    setDialogOpen(true);
  };

  const handleVoteSubmit = async () => {
    if (selectedChoice !== null) {
      await vote(voteReason)
        .then(() => {
          setDialogOpen(false);
        })
        .catch((error) => {
          console.error("Error submitting vote:", error);
        });
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => openVoteDialog(Choice.For)}
          variant="outline"
          size="icon"
          className="border-success bg-success/10 hover:bg-success/20 size-11 rounded-full sm:size-9"
          title="Vote FOR"
        >
          <Check className="text-success h-5 w-5" />
        </Button>
        <Button
          onClick={() => openVoteDialog(Choice.Abstain)}
          variant="outline"
          size="icon"
          className="border-muted-foreground bg-muted hover:bg-muted/80 size-11 rounded-full sm:size-9"
          title="Vote ABSTAIN"
        >
          <Minus className="text-muted-foreground h-5 w-5" />
        </Button>
        <Button
          onClick={() => openVoteDialog(Choice.Against)}
          variant="outline"
          size="icon"
          className="border-destructive bg-destructive/10 hover:bg-destructive/20 size-11 rounded-full sm:size-9"
          title="Vote AGAINST"
        >
          <X className="text-destructive h-5 w-5" />
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              <span className="break-words">
                You are voting on: {proposalTitle}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <RadioGroup
              value={selectedChoice?.toString()}
              onValueChange={(value) =>
                setSelectedChoice(Number(value) as Choice)
              }
              className="grid grid-cols-3 gap-2 sm:gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={Choice.For.toString()}
                  id="vote-for"
                  className="border-success"
                />
                <Label
                  htmlFor="vote-for"
                  className="text-success flex items-center"
                >
                  <Check className="mr-1 h-4 w-4" /> For
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={Choice.Abstain.toString()}
                  id="vote-abstain"
                  className="border-muted-foreground"
                />
                <Label
                  htmlFor="vote-abstain"
                  className="text-muted-foreground flex items-center"
                >
                  <Minus className="mr-1 h-4 w-4" /> Abstain
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={Choice.Against.toString()}
                  id="vote-against"
                  className="border-destructive"
                />
                <Label
                  htmlFor="vote-against"
                  className="text-destructive flex items-center"
                >
                  <X className="mr-1 h-4 w-4" /> Against
                </Label>
              </div>
            </RadioGroup>

            <div className="grid gap-2">
              <Label htmlFor="vote-reason">Reason for your vote</Label>
              <Input
                id="vote-reason"
                value={voteReason}
                onChange={(e) => setVoteReason(e.target.value)}
                placeholder="Enter your reason for voting this way"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button onClick={() => setDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleVoteSubmit}>Submit Vote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
