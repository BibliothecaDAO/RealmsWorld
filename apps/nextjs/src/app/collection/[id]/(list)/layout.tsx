import React from "react";
import CollectionSummary from "@/app/collection/[id]/(list)/CollectionSummary";
import { env } from "@/env";

import { Collections } from "@realms-world/constants";
import { NavLink } from "@realms-world/ui";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const isMintable =
    env.NEXT_PUBLIC_IS_TESTNET == "true" &&
    params.id == (Collections.GOLDEN_TOKEN as string);
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
  /*tabs.push(
    { name: "Analytics", link: "analytics" },
    {
      name: "Activity",
      link: "activity",
    },
  );*/

  return (
    <div className=" w-full pt-24 sm:pl-32 sm:pt-24">
      <div className="flex-grow">
        <CollectionSummary collectionId={params.id} />
        <div className="mb-3 flex gap-4 overflow-x-auto border-b py-1  ">
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
        <div className="p-2 ">{children}</div>
      </div>
    </div>
  );
}
