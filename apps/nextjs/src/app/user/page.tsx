import { Collections } from "@realms-world/constants";

import AssetL1CollectionPreview from "./AssetL1CollectionPreview";
import AssetL2CollectionPreview from "./AssetL2CollectionPreview";

export default async function Page() {
  return (
    <div
      className="h-full w-full space-y-11 px-4 sm:mt-0 sm:pl-32"
      style={{ marginTop: "6rem" }}
    >
      <AssetL1CollectionPreview />
      <AssetL2CollectionPreview collectionName={Collections.GOLDEN_TOKEN} />
      <AssetL2CollectionPreview collectionName={Collections.BEASTS} />
      <AssetL2CollectionPreview collectionName={Collections.BLOBERT} />
      <AssetL2CollectionPreview collectionName={Collections.BANNERS} />
    </div>
  );
}
