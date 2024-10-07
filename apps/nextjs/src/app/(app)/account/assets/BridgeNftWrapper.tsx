"use client";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import { useEffect, useState } from "react";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { TriangleAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { TransactionFinalityStatus } from "starknet";

import { CollectionAddresses } from "@realms-world/constants";

import AssetL1CollectionPreview from "./AssetL1CollectionPreview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui/components/ui/tabs";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@realms-world/ui/components/ui/alert";
import { Badge } from "@realms-world/ui/components/ui/badge";
import { Button } from "@realms-world/ui/components/ui/button";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { Portfolio } from "./Portfolio";
import { useUserTokens } from "@/hooks/reservoir/useUserTokens";

export const BridgeNftWrapper = () => {
  const [activeChain, setActiveChain] = useState("l2");
  const { address: l1Address } = useAccount();
  const { data: pendingWithdrawals } = usePendingRealmsWithdrawals({
    address: l1Address,
    status: TransactionFinalityStatus.ACCEPTED_ON_L1,
  });
  const { toggleAccount } = useUIStore((state) => state);
  const { tokens, isLoading } = useUserTokens({
    address: l1Address,
    //continuation: "",
  });
  useEffect(() => {
    if (tokens?.tokens?.length) {
      setActiveChain("l1");
    }
  }, [tokens]);
  return (
    <div>
      <div className="flex flex-col items-center justify-center space-x-4 border-b p-3 text-3xl md:flex-row md:justify-start">
        <h2>Realms (for Adventurers)</h2>
        {/*!l1Address && <WalletSheet showStarknetLoginButton={false} />*/}
      </div>
      <Tabs
        value={activeChain}
        onValueChange={(value) => setActiveChain(value)}
        className="col-span-full"
      >
        <TabsList className="mb-0 justify-center pb-2 sm:space-x-1">
          <TabsTrigger disabled={!tokens?.tokens?.length} value="l1">
            <Badge
              variant={activeChain == "l1" ? "default" : "outline"}
              className="mr-2"
            >
              <div className="flex p-1">
                <EthereumLogo className="mr-3 w-8" />{" "}
                <span className="text-2xl">Ethereum</span>
              </div>
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="l2">
            <Badge variant={activeChain == "l2" ? "default" : "outline"}>
              <div className="flex p-1">
                <StarknetLogo className="mr-3 w-8" />{" "}
                <span className="text-2xl">Starknet</span>
              </div>
            </Badge>
          </TabsTrigger>
        </TabsList>
        {pendingWithdrawals?.length ? (
          <Alert variant={"warning"} className="mt-4">
            <TriangleAlert className="h-5 w-5" />
            <AlertTitle className="text-lg">
              You have Realms to Withdraw on L1
            </AlertTitle>
            <AlertDescription>
              Check your account transaction sidebar to finalize your{" "}
              <Button onClick={() => toggleAccount()}>
                {pendingWithdrawals.length} withdrawals
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}

        <TabsContent className="mt-0" value={"l1"}>
          <AssetL1CollectionPreview isLoading={isLoading} tokens={tokens} />
        </TabsContent>
        <TabsContent className="mt-0" value={"l2"}>
          <Portfolio
            selectable
            collectionAddress={
              CollectionAddresses.realms[SUPPORTED_L2_CHAIN_ID]
            }
          />
        </TabsContent>
      </Tabs>
      <div className="flex w-full justify-center"></div>
    </div>
  );
};
