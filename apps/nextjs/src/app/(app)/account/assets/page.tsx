import type { Metadata } from "next";
import AssetL2CollectionPreview from "@/app/(app)/account/assets/AssetL2CollectionPreview";

import { Collections } from "@realms-world/constants";

import { BridgeNftWrapper } from "./BridgeNftWrapper";
import { Portfolio } from "./Portfolio";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <>
      <div className="h-full w-full space-y-20">
        <Portfolio />
        {/*<BridgeNftWrapper collection={Collections.REALMS} />
        <AssetL2CollectionPreview collectionName={Collections.GOLDEN_TOKEN} />
        <AssetL2CollectionPreview collectionName={Collections.BEASTS} />
        <AssetL2CollectionPreview collectionName={Collections.BLOBERT} />
        <AssetL2CollectionPreview collectionName={Collections.BANNERS} />*/}
      </div>
    </>
  );
}
