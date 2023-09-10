import { CollectionCard } from "@/app/_components/CollectionCard";
import { erc721Tokens } from "@/constants";
import type { Collection } from "@/types";

import { getCollections } from "../../lib/reservoir/getCollections";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  //const l1Collections = await getCollections();
  const l1Collections = {};
  const collections: Collection[] = l1Collections?.collections;
  const defaultImage = "/backgrounds/map.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(5,5,5, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <main>
      <div className="-mt-24 h-screen w-full" style={backgroundImageStyle}>
        <div className="container mx-auto px-8 pt-72">
          <h1>Collections</h1>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {collections?.map((collection: Collection, index) => {
              return <CollectionCard collection={collection} key={index} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
