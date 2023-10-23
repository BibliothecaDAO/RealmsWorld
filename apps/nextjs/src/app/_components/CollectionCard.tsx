import Image from "next/image";
import Link from "next/link";
import type { Collection, L2Collection } from "@/types";

interface Props {
  collection: Collection | L2Collection;
}

export const CollectionCard = ({ collection }: Props) => {
  return (
    <Link
      href={`/collection/${collection.link ?? "realms"}`} //TODO make dynamic depending on collection url (currently not passed from reservoir collections query)
      className="hover:bg-medium-dark-green bg-dark-green group flex border p-5 duration-300 hover:opacity-80"
    >
      {collection.image && (
        <Image
          src={collection.image}
          alt="An example image"
          width={70}
          height={70}
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
