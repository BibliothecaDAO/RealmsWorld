import { getData } from "@/functions";
import { Collection } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = await getData(
    {
      contracts: [
        {
          contract: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
        },
        {
          contract: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
        },
        {
          contract: "0x8db687aceb92c66f013e1d614137238cc698fedb",
        },
        {
          contract: "0x86f7692569914b5060ef39aab99e62ec96a6ed45",
        },
        {
          contract: "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40",
        },
      ],
    },
    "collection"
  );

  const collections: Collection[] = data.collections;
  const defaultImage = "/backgrounds/dummy_background.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <main>
      <div className="w-full -mt-24 h-96" style={backgroundImageStyle} />
      <div className="container px-8 mx-auto">
        <h1>Relic</h1>
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
    </main>
  );
}
