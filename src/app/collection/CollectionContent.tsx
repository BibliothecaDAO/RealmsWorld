"use client";

import { Collection, Token } from "@/types";
import { TokenTable } from "../components/TokenTable";
import { Tab } from "@headlessui/react";
import { CollectionActivity } from "./CollectionActivity";

interface Props {
  collection: Collection;
  tokens: Token[]
}

export const CollectionContent = ({ collection, tokens }: Props) => {
  const tabs = [
    {
      name: "Trade",
      content: <TokenTable address={collection.id} collection={collection} tokens={tokens} />,
    },
    { name: "Analytics", content: <CollectionActivity address={collection.id}/>},
  ];

  return (
    <div className="flex-grow p-8">
      <h1>{collection.name}</h1> 
      <p>{collection.description}</p>
      <Tab.Group>
        <Tab.List className={"w-full flex text-xl justify-center py-3 border-b mb-4"}>
          {tabs.map((tab, index) => (
            <Tab className={"px-4"} key={index}>{tab.name}</Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index}>{tab.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
