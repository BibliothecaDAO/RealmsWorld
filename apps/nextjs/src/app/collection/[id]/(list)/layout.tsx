import React from "react";
//import { Button } from "@/app/_components/ui/button";
import { NavLink } from "@/app/_components/ui/nav-link";
import CollectionSummary from "@/app/collection/CollectionSummary";
import type { erc721Tokens } from "@/constants";
import { getTokenContractAddresses } from "@/utils/utils";

//import { NETWORK_NAME } from "@/constants/env";
//import { ChainType } from "@starkware-industries/commons-js-enums";
//import { motion } from "framer-motion";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const defaultImage = "/backgrounds/dummy_background.webp";
  const imageUrl = params.id ? `/backgrounds/${params.id}.png` : defaultImage;

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(42,43,36, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const isMintable = params.id == "goldenToken";
  const tabs = [
    {
      name: "Trade",
      link: isMintable ? "trade" : "",
    },
    { name: "Analytics", link: "analytics" },
    {
      name: "Activity",
      link: "activity",
    },
  ];
  if (isMintable) {
    tabs.unshift({
      name: "Mint",
      link: "",
    });
  }
  return (
    <div
      className="h-full w-full"
      style={
        {
          "--image-url": imageUrl,
        } as React.CSSProperties
      }
    >
      <div
        // initial={{ opacity: 0.2 }}
        // animate={{ opacity: 1 }}
        //className="-mt-24 h-96 w-full"
        className="mask-transparent h-96 w-full before:bg-[url:var(--image-url)] before:bg-cover before:bg-center before:bg-no-repeat"
      />

      <div className="relative -mt-56 flex h-full lg:pl-32">
        <div className="flex-grow">
          <CollectionSummary address={tokenAddresses.L1} />
          <div className="mb-3 flex justify-center gap-4 overflow-x-auto border-b py-4">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                variant={"link"}
                size={"sm"}
                exact
                href={`/collection/${params.id}${tab.link && "/" + tab.link}`}
              >
                {tab.name}
              </NavLink>
            ))}
          </div>
          <div className=" p-4 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
