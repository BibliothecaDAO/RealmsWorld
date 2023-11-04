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
    title: `Atlas - Collections Profile: ${params.address}`,
    description: `Collection Details page for ${params.address} - Created for Adventurers by Bibliotheca DAO`,
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
    <div>
      <span>{isStarknetAddress(params.address)}</span>
      <UserTokenGrid address={params.address} continuation="" />
    </div>
  );
}
