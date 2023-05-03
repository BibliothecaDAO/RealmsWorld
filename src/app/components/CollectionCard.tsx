import { Collection } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
    collection: Collection
}

export const CollectionCard = ({ collection }: Props) => {
    return (
        <Link
            href={`/collection/${collection.primaryContract}`}
            className="flex p-5 duration-300 border-4 bg-black/50 rounded-xl hover:opacity-80 shadow-white/10 group border-white/10"
        >
            {" "}
            <Image
                src={collection.image}
                alt="An example image"
                width={70}
                height={70}
                className="rounded-full"
            />
            <div className="flex justify-between flex-grow pl-4">
                <h5 className="self-center">{collection.name}</h5>
            </div>
        </Link>
    );
}