import React from "react";
import { motion } from "framer-motion";
import CollectionSummary from "@/app/collection/CollectionSummary";
import { Button } from "@/app/components/ui/button";
import { NavLink } from "@/app/components/ui/nav-link";
import { erc721Tokens } from "@/constants";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType } from "@starkware-industries/commons-js-enums";
import { getTokenContractAddresses } from "@/app/lib/utils";

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
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(5,5,5, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens
  );
  const tabs = [
    {
      name: "Trade",
      link: "",
    },
    { name: "Analytics", link: "analytics" },
    {
      name: "Activity",
      link: "activity",
    },
  ];
  return (
    <div className="w-full h-full bg-theme-gray">
      <div
        // initial={{ opacity: 0.2 }}
        // animate={{ opacity: 1 }}
        className="w-full -mt-24 h-96"
        style={backgroundImageStyle}
      />

      <div className="flex h-full lg:pl-32 -mt-56">
        <div className="flex-grow p-4 sm:p-8">
          <CollectionSummary address={tokenAddresses.L1} />
          <div className="flex gap-4 justify-center py-4 border-b mb-3">
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
          {children}
        </div>
      </div>
    </div>
  );
}
