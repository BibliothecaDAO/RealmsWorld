import type { Metadata } from "next";
import L2ERC721Table from "@/app/collection/[id]/(list)/L2ERC721Table";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { isStarknetAddress } from "@/utils/utils";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

import UserTokenGrid from "./UserTokenGrid";

export function generateMetadata({
  params,
}: {
  params: { address: string };
}): Metadata {
  return {
    title: `${params.address}`,
    description: `${params.address} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page({ params }: { params: { address: string } }) {
  const address = getCollectionAddresses(Collections.GOLDEN_TOKEN)?.[
    SUPPORTED_L2_CHAIN_ID
  ];

  if (isStarknetAddress(params.address) && address) {
    return (
      <L2ERC721Table contractAddress={address} ownerAddress={params.address} />
    );
  }

  return (
    <div className="w-full">
      <span>{isStarknetAddress(params.address)}</span>
      <UserTokenGrid address={params.address} continuation="" />
    </div>
  );
}
