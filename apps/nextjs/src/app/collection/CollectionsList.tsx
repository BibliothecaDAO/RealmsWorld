import { CollectionCard } from "@/app/_components/CollectionCard";
//import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { api } from "@/trpc/server";

//import { CollectionAddresses } from "@realms-world/constants";

//import { getCollections } from "../../lib/reservoir/getCollections";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function CollectionsList() {
  /*const { collections } = await getCollections([
    {
      contract: CollectionAddresses.realms[
        SUPPORTED_L1_CHAIN_ID
      ] as `0x${string}`,
    },
  ]);*/
  const erc721Collections = await api.erc721Collections.all({});

  const l2Collections = [
    {
      name: "Beasts",
      link: "beasts",
      image: "/collections/beasts.svg",
      marketplaceId: 2,
    },
    {
      name: "Golden Token",
      link: "goldentoken",
      image: "/collections/goldentoken.svg",
      marketplaceId: 1,
    },
    {
      name: "Blobert",
      link: "blobert",
      image: "/collections/blobert.svg",
      marketplaceId: 3,
    },
    {
      name: "Pixel Banners (for Adventurers)",
      link: "banners",
      image: "/collections/banners.svg",
      marketplaceId: 4,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 px-4 sm:px-0">
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
      {erc721Collections.items.map((collection, index) => {
        const collectionInfo = l2Collections.find(
          (collectionInfo) =>
            collectionInfo.marketplaceId == collection.marketplaceId,
        );
        return (
          <CollectionCard
            name={collectionInfo?.name}
            price={collection.floorPrice}
            symbol={"LORDS"}
            image={collectionInfo?.image}
            link={collectionInfo?.link}
            key={index}
          />
        );
      })}
    </div>
  );
}
