"use client";

import { useState } from "react";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { TriangleAlert } from "lucide-react";
import { useAccount } from "wagmi";

import { Collections } from "@realms-world/constants";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

import AssetL1CollectionPreview from "./AssetL1CollectionPreview";
import AssetL2CollectionPreview from "./AssetL2CollectionPreview";

export const BridgeNftWrapper = () => {
  const [activeChain, setActiveChain] = useState("l1");
  const { address } = useAccount();
  const { data: pendingWithdrawals } = usePendingRealmsWithdrawals({
    address,
    status: "ACCEPTED_ON_L1",
  });
  const { toggleAccount } = useUIStore((state) => state);

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-x-4 border-b pb-3 text-3xl md:flex-row md:justify-start">
        <h2>Realms (for Adventurers)</h2>
        {/*!l1Address && <WalletSheet showStarknetLoginButton={false} />*/}
      </div>
      <Tabs
        value={activeChain}
        onValueChange={(value) => setActiveChain(value)}
        className="col-span-full"
      >
        <TabsList className="justify-center sm:space-x-1">
          <TabsTrigger value="l1">
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

        <TabsContent value={"l1"}>
          <AssetL1CollectionPreview />
        </TabsContent>
        <TabsContent value={"l2"}>
          <AssetL2CollectionPreview
            hideTitle
            collectionName={Collections.REALMS}
          />
        </TabsContent>
      </Tabs>
      <div className="flex w-full justify-center"></div>
    </div>
  );
};
