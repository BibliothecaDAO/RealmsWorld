import type { Metadata } from "next";
import { isStarknetAddress } from "@/utils/utils";

import GoldenToken from "./goldenToken/page";
import UserTokenGrid from "./UserTokenGrid";

export async function generateMetadata({
  params,
}: {
  params: { address: string };
}): Promise<Metadata> {
  return {
    title: `${params.address}`,
    description: `${params.address} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  if (isStarknetAddress(params.address)) {
    return <GoldenToken params={params} />;
  }

  return (
    <div className="w-full">
      <span>{isStarknetAddress(params.address)}</span>
      <UserTokenGrid address={params.address} continuation="" />
    </div>
  );
}
