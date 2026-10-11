import { useStarknetWallet } from "@/hooks/use-starknet-wallet";
import { toast } from "@/hooks/use-toast";
import useIsWrongNetwork from "@/hooks/use-wrong-network";
import {
  expectedStarknetChain,
  expectedStarknetChainId,
} from "@/utils/starknet-chain";
import { useSwitchChain } from "@starknet-start/react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function WrongNetworkDialog() {
  const { disconnectWallet } = useStarknetWallet();
  const { isWrongNetwork } = useIsWrongNetwork();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain({
    params: { chainId: expectedStarknetChainId },
  });

  const handleSwitchChain = async () => {
    try {
      await switchChainAsync();
    } catch (error) {
      console.error("Failed to switch network:", error);
      toast({
        variant: "destructive",
        title: "Unable to switch network",
        description: `Please switch to ${expectedStarknetChain.name} manually in your wallet, or disconnect.`,
      });
    }
  };

  return (
    <Dialog open={isWrongNetwork}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Wrong network</DialogTitle>
          <DialogDescription>
            Your wallet is connected to a different network. Please switch to{" "}
            {expectedStarknetChain.name} to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => void disconnectWallet()}>
            Disconnect
          </Button>
          <Button
            onClick={() => void handleSwitchChain()}
            disabled={isSwitchingChain}
          >
            {isSwitchingChain
              ? "Switching…"
              : `Switch to ${expectedStarknetChain.name}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
