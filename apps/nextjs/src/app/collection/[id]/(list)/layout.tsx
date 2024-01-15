import React from "react";
import CollectionSummary from "@/app/collection/[id]/(list)/CollectionSummary";
import { NETWORK_NAME } from "@/constants/env";

import { NavLink } from "@realms-world/ui";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const defaultImage = "/backgrounds/dummy_background.webp";
  const imageUrl = params.id ? `/backgrounds/${params.id}.png` : defaultImage;

  const isMintable = NETWORK_NAME == "SEPOLIA" && params.id == "goldenToken";
  const tabs = [
    {
      name: "Trade",
      link: "",
    },
  ];
  if (isMintable) {
    tabs.push({
      name: "Mint",
      link: "mint",
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
