import type { Collection, L2Collection } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  collection: Collection | L2Collection;
}

export const CollectionCard = ({ collection }: Props) => {
  return (
    <Link
      href={`/collection/${collection.link ?? "realms"}`} //TODO make dynamic depending on collection url (currently not passed from reservoir collections query)
      className="group flex border-2 bg-dark-green p-5 duration-300 hover:border-bright-yellow hover:bg-medium-dark-green hover:opacity-80"
    >
      {collection.image && (
        <Image
          src={collection.image}
          alt={collection.name}
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
      <div className="flex flex-grow justify-between pl-4">
        <h5 className="self-center">{collection.name}</h5>
      </div>
      <div className="self-center">
        {collection.floorAsk?.price?.amount.native}{" "}
        {collection.floorAsk?.price?.currency.symbol}
      </div>
    </Link>
  );
};
