import type { Collection, L2Collection } from "@/types";
import { CollectionCard } from "@/app/_components/CollectionCard";
import { getTokenContractAddresses } from "@/utils/utils";

import { getCollections } from "../../lib/reservoir/getCollections";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function CollectionsList() {
  const l1Collections = await getCollections([
    { contract: getTokenContractAddresses("realms").L1! },
  ]);

  // TODO refine collection display logic (with l2 collections included)
  const collections: Collection[] = l1Collections?.collections;
  const l2Collections: L2Collection[] = [
    {
      name: "Beasts",
      link: "beasts",
      image: "/collections/beasts.svg",
    },
    {
      name: "Golden Token",
      link: "goldentoken",
      image: "/collections/goldenToken.svg",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 ">
      {collections?.map((collection: Collection, index) => {
        return <CollectionCard collection={collection} key={index} />;
      })}
      {l2Collections?.map((collection: L2Collection, index) => {
        return <CollectionCard collection={collection} key={index} />;
      })}
    </div>
  );
}
