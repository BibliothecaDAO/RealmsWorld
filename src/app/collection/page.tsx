import { allWhiteListed } from "@/constants";
import { getData } from "@/functions";
import { Collection } from "@/types";
import { CollectionCard } from "../components/CollectionCard";
import { getCollections } from "../lib/reservoir/getCollections";

export const metadata = {
  title: "Atlas - Collections of the Lootverse",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  const data = await getCollections(allWhiteListed);

  const collections: Collection[] = data.collections;
  const defaultImage = "/backgrounds/map.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <main>
      <div className="w-full h-screen -mt-24" style={backgroundImageStyle}>
        <div className="container px-8 mx-auto pt-72">
          <h1>Atlas</h1>
          <div className="grid w-full grid-cols-1 gap-3">
            {collections.map((collection: Collection, index) => {
              return <CollectionCard collection={collection} key={index} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
