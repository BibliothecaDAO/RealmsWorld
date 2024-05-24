import type { Metadata } from "next";
import AssetL1CollectionPreview from "@/app/account/assets/AssetL1CollectionPreview";
import AssetL2CollectionPreview from "@/app/account/assets/AssetL2CollectionPreview";

import { Collections } from "@realms-world/constants";

import { BridgeNftWrapper } from "./BridgeNftWrapper";
import { UserAssets } from "./UserAssets";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page() {
  return (
    <>
      <div className="mt-8 h-full w-full space-y-16">
        <BridgeNftWrapper /*collection={Collections.REALMS}*/ />
        <AssetL2CollectionPreview collectionName={Collections.GOLDEN_TOKEN} />
        <AssetL2CollectionPreview collectionName={Collections.BEASTS} />
        <AssetL2CollectionPreview collectionName={Collections.BLOBERT} />
        <AssetL2CollectionPreview collectionName={Collections.BANNERS} />
      </div>
    </>
  );
}
