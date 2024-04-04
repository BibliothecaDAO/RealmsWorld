import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string | undefined;
  link: string | undefined;
  price?: string | number | null;
  symbol?: string | undefined;
  image: string | undefined;
}

export const CollectionCard = ({ name, link, price, symbol, image }: Props) => {
  return (
    <Link
      href={`/collection/${link ?? "realms"}`} //TODO make dynamic depending on collection url (currently not passed from reservoir collections query)
      className="group flex border-2 bg-dark-green p-5 duration-300 hover:border-bright-yellow hover:bg-medium-dark-green hover:opacity-80"
    >
      {image && (
        <Image
          src={image}
          alt={name ?? ''}
          width={50}
          height={50}
          className="w-24 rounded-full"
        />
      )}
      <div className="flex flex-grow justify-between pl-4">
        <h5 className="self-center">{name}</h5>
      </div>
      <div className="self-center">
        {price} {symbol}
      </div>
    </Link>
  );
};
