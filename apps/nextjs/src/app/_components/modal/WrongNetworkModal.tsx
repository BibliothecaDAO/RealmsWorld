import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useDisconnect, useSwitchChain } from "@starknet-react/core";
import { constants } from "starknet";

import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
import {
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@realms-world/ui";

export const WrongNetworkModal = () => {
  const { switchChain, data, error, isPending } = useSwitchChain({
    params: { chainId: constants.StarknetChainId.SN_SEPOLIA },
  });
  const { disconnect } = useDisconnect()
  return (
    <AlertDialog open>
      <AlertDialogContent className="z-50 h-72 w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Wrong Network</AlertDialogTitle>
        </AlertDialogHeader>
        <span>
          {error && <Alert variant={'warning'} className="mb-6">{error.toString()}</Alert>}
          Realms.World currently supports{" "}
          <span>{CHAIN_IDS_TO_NAMES[SUPPORTED_L2_CHAIN_ID]}</span>, please
          change the connected network in your Starknet wallet, or:
        </span>
        <AlertDialogFooter>
          <AlertDialogAction disabled={isPending} onClick={() => switchChain()}>
            {isPending ? "Switching..." : "Switch Chain"}
          </AlertDialogAction>
          <AlertDialogAction disabled={isPending} onClick={() => disconnect()}>
            Disconnect
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
