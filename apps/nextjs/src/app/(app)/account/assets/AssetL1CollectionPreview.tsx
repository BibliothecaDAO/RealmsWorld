"use client";

import React from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { L1ERC721Table } from "@/app/(app)/collection/[id]/(list)/L1ERC721Table";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useUserTokens } from "@/hooks/reservoir/useUserTokens";
import { useAccount } from "wagmi";

import { CollectionAddresses } from "@realms-world/constants";
import {
  Alert,
  AlertDescription,
  AlertTitle, Button, ScrollArea
} from "@realms-world/ui";
import { useUIStore } from "@/providers/UIStoreProvider";
import { TriangleAlert } from "lucide-react";
import { useStaking } from "@/hooks/staking/useStaking";

//import UserTokenCard from "../../user/[address]/UserTokenCard";

function AssetL1CollectionPreview() {
  const { address: l1Address } = useAccount();

  const { tokens, isLoading } = useUserTokens({
    address: l1Address,
    //continuation: "",
  });
  // const { data: realmsData, isLoading: realmsDataIsLoading } = useUserActivity(address);
  const { toggleStakingMigration } = useUIStore((state) => state);
  const { data, loading } = useStaking();

  return (
    <div className="min-h-24">
      {!l1Address ? (
        <h3>Please connect your ethereum wallet</h3>
      ) : (
        <div>
          {data?.wallet && (data.wallet.bridgedRealmsHeld > 0 || data.wallet.bridgedV2RealmsHeld > 0) && (<Alert variant={"warning"} className="my-4">
            <TriangleAlert className="h-5 w-5" />
            <AlertTitle className="text-lg">
              You have Realms in legacy contracts
            </AlertTitle>
            <AlertDescription>
              To start earning Lords you must unstake and bridge
              <Button
                size={"xs"}
                className="ml-2"
                onClick={toggleStakingMigration}
              >
                Unstake Now
              </Button>
            </AlertDescription>
          </Alert>)}

          {tokens?.tokens?.length ? (
            <>
              <ScrollArea>
                {isLoading ? (
                  <LoadingSkeletonGrid />
                ) : (
                  <L1ERC721Table
                    address={
                      CollectionAddresses.realms[SUPPORTED_L1_CHAIN_ID] ?? "0x"
                    }
                    tokens={tokens.tokens}
                    selectable
                  />
                )}
              </ScrollArea>
            </>
          ) : (
            "No tokens"
          )}
        </div>
      )}
    </div>
  );
}

export default AssetL1CollectionPreview;
