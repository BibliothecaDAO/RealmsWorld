'use client'
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount } from "wagmi";

import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import UserTokenGrid from "@/app/user/[address]/UserTokenGrid";
import { EthereumLoginButton } from "@/app/_components/wallet/EthereumLoginButton";



export const UserAssets =() => {
    const { address: l1Address } = useAccount();
    const { address: l2Address } = useL2Account();

    if (!l1Address) {
      return (
        <EthereumLoginButton />
      )
    }

    return (
      <div className="w-full">
        {l1Address &&(
          <>
          <h2>Realms</h2>
             <UserTokenGrid address={l1Address} continuation="" /></>
        )}
      </div>
    );
  }
  