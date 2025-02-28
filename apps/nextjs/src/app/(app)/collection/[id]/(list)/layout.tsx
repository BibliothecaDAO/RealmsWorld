import React from "react";
import CollectionSummary from "@/app/(app)/collection/[id]/(list)/CollectionSummary";
import { env } from "env";

import { Collections } from "@realms-world/constants";
import { NavLink } from "@realms-world/ui/components/ui/nav-link";

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const isMintable =
    env.NEXT_PUBLIC_IS_TESTNET == "true" &&
    params.id == (Collections.GOLDEN_TOKEN as string);
  const tabs = [
    {
      name: "Items",
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
    <div className="flex-grow pt-4">
      <CollectionSummary collectionId={params.id} />
      <div className="flex gap-4 overflow-x-auto border-b py-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            variant={"link"}
            exact
            href={`/collection/${params.id}${tab.link && "/" + tab.link}`}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
      {children}
    </div>
  );
}
