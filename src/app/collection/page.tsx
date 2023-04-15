import { allWhiteListed } from "@/constants";
import { getData } from "@/functions";
import { Collection } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Atlas - Collections of the Lootverse',
  description: 'Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO'
}

export default async function Page() {
  const data = await getData(
    {
      contracts: allWhiteListed,
    },
    "collection"
  );

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
              return (
                <Link
                  key={index}
                  href={`/collection/${collection.primaryContract}`}
                  className="flex p-5 border-2 bg-black/50 rounded-xl border-white/10 hover:bg-black/60"
                >
                  {" "}
                  <Image
                    src={collection.image} // Use the path to your image
                    alt="An example image" // Provide a descriptive alt text
                    width={70} // Set the original width of the image
                    height={70} // Set the original height of the image'fill')
                    className="rounded-full"
                  />
                  <div className="flex justify-between flex-grow pl-4">
                    <h5 className="self-center">{collection.name}</h5>
                    {/* <div className="self-center text-xl font-semibold">
                    {formatEther(
                      collection.floorAsk
                        ? collection.floorAsk.price.amount.raw
                        : ""
                    )}{" "}
                    ETH
                  </div> */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
