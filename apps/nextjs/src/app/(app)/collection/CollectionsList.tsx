/*import { CollectionCard } from "@/app/_components/CollectionCard";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";

import { CollectionAddresses } from "@realms-world/constants";

import { getCollections } from "@/lib/reservoir/getCollections";*/
import { ArkCollectionCardFetcher } from "@/app/_components/ArkCollectionCardFetcher";
import { REALMS_L2_COLLECTIONS } from "@realms-world/constants/src/Collections";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default function CollectionsList() {
  /*const { collections } = await getCollections([
    {
      contract: CollectionAddresses.realms[
        SUPPORTED_L1_CHAIN_ID
      ] as `0x${string}`,
    },
  ]);*/

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-0">
      {/*collections?.map((collection, index) => {
        return (
          <CollectionCard
            price={collection.floorAsk?.price?.amount?.native}
            symbol={collection.floorAsk?.price?.currency?.symbol}
            name={collection.name}
            link={"/realms"}
            image={collection.image}
            key={index}
          />
        );
      })*/}
      {REALMS_L2_COLLECTIONS.map((collection, index) => (
        <ArkCollectionCardFetcher source={collection} key={index} />
      ))}
    </div>
  );
}
