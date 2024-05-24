"use client";

import { useState } from "react";
import { WalletSheet } from "@/app/_components/wallet/WalletSheet";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount } from "wagmi";

import { Collections } from "@realms-world/constants";
import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

import AssetL1CollectionPreview from "./AssetL1CollectionPreview";
import AssetL2CollectionPreview from "./AssetL2CollectionPreview";

export const BridgeNftWrapper = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();
  const [activeChain, setActiveChain] = useState("l1");
  return (
    <div>
      <div className="mb-4 flex flex-col items-center justify-center space-x-4 border-b pb-3 text-3xl md:flex-row md:justify-start">
        <h2>Realms (for Adventurers)</h2>
        {!l1Address && <WalletSheet showStarknetLoginButton={false} />}
      </div>
      <Tabs
        value={activeChain}
        onValueChange={(value) => setActiveChain(value)}
        className="col-span-full"
      >
        <TabsList>
          <TabsTrigger className="text-xl" value="l1">
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
          <TabsTrigger className="text-xl" value="l2">
            <Badge variant={activeChain == "l2" ? "default" : "outline"}>
              <div className="flex p-1">
                <StarknetLogo className="mr-3 w-8" />{" "}
                <span className="text-2xl">Starknet</span>
              </div>
            </Badge>
          </TabsTrigger>
        </TabsList>

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
