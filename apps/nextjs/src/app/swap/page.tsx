import type { Metadata } from "next";

import { SwapTokens } from "./SwapTokens";

export const metadata: Metadata = {
  title: "Realm NFT Staking for $LORDS rewards",
};

export default async function Page() {

  return (
    <SwapTokens />
  );
}
