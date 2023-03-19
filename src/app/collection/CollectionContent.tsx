"use client";

import { Collection, Token } from "@/types";
import { TokenTable } from "../components/TokenTable";
import { Tab } from "@headlessui/react";
import { CollectionActivity } from "./CollectionActivity";
import Image from "next/image";
import { Attributes } from "../components/Attributes";

interface Props {
  collection: Collection;
  tokens: Token[];
  attributes: any;
}

export const CollectionContent = ({
  collection,
  tokens,
  attributes,
}: Props) => {
  const tabs = [
    {
      name: "Trade",
      content: (
        <div className="flex">
          <Attributes address={collection.id} attributes={attributes} />
          <TokenTable
            address={collection.id}
            collection={collection}
            tokens={tokens}
          />
        </div>
      ),
    },
    { name: "Analytics", content: <div>coming soon</div> },
    {
      name: "Activity",
      content: <CollectionActivity address={collection.id} />,
    },
  ];

  return (
    <div className="flex-grow p-8">
      <div className="sm:flex">
        <div className="self-center flex-none pr-10">
          <Image
            src={collection.image} // Use the path to your image
            alt="An example image" // Provide a descriptive alt text
            width={200} // Set the original width of the image
            height={200} // Set the original height of the image'fill')
            className="mx-auto border rounded "
          />
        </div>

        <div>
          <h1>{collection.name}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: collection.description }}
            className="hidden sm:block"
          />
        </div>
      </div>

      <Tab.Group>
        <Tab.List
          className={"w-full flex text-xl justify-center py-3 border-b mb-4"}
        >
          {tabs.map((tab, index) => (
            <Tab className={"px-4"} key={index}>
              {tab.name}
            </Tab>
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
