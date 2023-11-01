import { CollectionCard } from "@/app/_components/CollectionCard";
import type { Collection, L2Collection } from "@/types";
import { getTokenContractAddresses } from "@/utils/utils";
import { string } from "zod";

import { getCollections } from "../../lib/reservoir/getCollections";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
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
      link: "goldenToken",
      image: "/collections/goldenToken.svg",
    },
  ];

  return (
    <>
      <div className="mask-transparent h-96 w-full before:bg-[url(/backgrounds/map.png)] before:bg-cover before:bg-center before:bg-no-repeat" />
      <div className="-mt-24 h-screen w-full">
        <div className="container mx-auto px-8 ">
          <h1>Collections</h1>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {collections?.map((collection: Collection, index) => {
              return <CollectionCard collection={collection} key={index} />;
            })}
            {l2Collections?.map((collection: L2Collection, index) => {
              return <CollectionCard collection={collection} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
