import { Collections } from "@realms-world/constants";

import AssetL1CollectionPreview from "../account/assets/AssetL1CollectionPreview";
import AssetL2CollectionPreview from "../account/assets/AssetL2CollectionPreview";

export default async function Page() {
  return (
    <div className="h-full w-full space-y-16 sm:mt-6">
      <AssetL1CollectionPreview />
      <AssetL2CollectionPreview collectionName={Collections.GOLDEN_TOKEN} />
      <AssetL2CollectionPreview collectionName={Collections.BEASTS} />
      <AssetL2CollectionPreview collectionName={Collections.BLOBERT} />
      <AssetL2CollectionPreview collectionName={Collections.BANNERS} />
    </div>
  );
}
