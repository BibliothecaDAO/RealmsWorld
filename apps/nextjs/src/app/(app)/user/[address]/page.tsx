import type { Metadata } from "next";
import L2ERC721Table from "@/app/(app)/collection/[id]/(list)/L2ERC721Table";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { isStarknetAddress } from "@/utils/utils";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
import { Portfolio } from "../../account/assets/Portfolio";

export async function generateMetadata(
  props: {
    params: Promise<{ address: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `${params.address}`,
    description: `${params.address} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page(props: { params: Promise<{ address: string }> }) {
  const params = await props.params;
  const address = getCollectionAddresses(Collections.GOLDEN_TOKEN)?.[
    SUPPORTED_L2_CHAIN_ID
  ];

  if (isStarknetAddress(params.address) && address) {
    return (
      <>
        <Portfolio walletAddress={params.address} />
      </>
    );
  }

  return (
    <div className="w-full">
      <span className="text-3xl">Only Starknet Addresses supported</span>
    </div>
  );
}
