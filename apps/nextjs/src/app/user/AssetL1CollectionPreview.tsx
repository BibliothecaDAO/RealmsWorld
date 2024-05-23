"use client";

import React from "react";
import { useAccount } from "wagmi";

import { WalletSheet } from "../_components/wallet/WalletSheet";

function AssetL1CollectionPreview() {
  const { address } = useAccount();

  // const { data: realmsData, isLoading: realmsDataIsLoading } = useUserActivity(address);

  return (
    <div>
      <div className="mb-4 flex flex-col items-center justify-center space-x-4 border-b pb-3 text-4xl md:flex-row md:justify-start">
        <h2>Realms (for Adventurers)</h2>
        <WalletSheet showStarknetLoginButton={false} />
      </div>
      <div className="min-h-24">
        {!address ? (
          <h3>Please connect your ethereum wallet</h3>
        ) : (
          <div>
            Not implemented yet {/* TODO: display L1 assets when connected */}
            {/* <UserTokenGrid
          address={"0x0efcc732b7f88bab88886638d2e4faacda44f7ff"}
          continuation=""
        /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssetL1CollectionPreview;
