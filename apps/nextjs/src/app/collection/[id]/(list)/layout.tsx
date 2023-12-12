import React from "react";
import CollectionSummary from "@/app/collection/CollectionSummary";
import type { erc721Tokens } from "@/constants";
import { getTokenContractAddresses } from "@/utils/utils";

//import { Button } from "@realms-world/ui";
import { NavLink } from "@realms-world/ui";

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

  const isMintable = false; // params.id == "goldenToken";
  const tabs = [
    {
      name: "Trade",
      link: isMintable ? "trade" : "",
    },
  ];
  if (isMintable) {
    tabs.unshift({
      name: "Mint",
      link: "",
    });
  }
  if (params.id == "realms") {
    tabs.push(
      { name: "Analytics", link: "analytics" },
      {
        name: "Activity",
        link: "activity",
      },
    );
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
      <div className="relative flex h-full lg:pl-32">
        <div className="flex-grow">
          <CollectionSummary collectionId={params.id} />
          <div className="mb-3 flex justify-center gap-4 overflow-x-auto border-b py-1  ">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                variant={"link"}
                className="hover:text-flamingo/70"
                size={"sm"}
                exact
                href={`/collection/${params.id}${tab.link && "/" + tab.link}`}
              >
                {tab.name}
              </NavLink>
            ))}
          </div>
          <div className="p-2 ">{children}</div>
        </div>
      </div>
    </div>
  );
}
