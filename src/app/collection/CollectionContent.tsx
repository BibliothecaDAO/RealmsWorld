"use client";

import { Collection, Token } from "@/types";
import { TokenTable } from "../components/TokenTable";
import { Tab } from "@headlessui/react";
import { CollectionActivity } from "./CollectionActivity";
import Image from "next/image";
import { Attributes } from "../components/Attributes";
import { Globe, Twitter } from "lucide-react";
import Link from "next/link";
import { formatEther } from "ethers/lib/utils.js";
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

  const links = [
    {
      icon: <Twitter />,
      value: `https://etherscan.io/address/${collection.id}`,
    },
    { icon: <Twitter />, value: collection.discordUrl },
    { icon: <Twitter />, value: collection.twitterUsername },
    { icon: <Globe />, value: collection.externalUrl },
  ];

  const statistics = [
    {
      icon: <Twitter />,
      value: collection.floorSale["1day"],
      title: "Top Offer",
    },
    {
      icon: <Twitter />,
      value: formatEther(collection.floorAsk.price.amount.raw),
      title: "Floor",
    },
    { icon: <Globe />, value: collection.onSaleCount, title: "Listed" },
    {
      icon: <Globe />,
      value: collection.volume.allTime,
      title: "Total Volume",
    },
    { icon: <Globe />, value: collection.tokenCount, title: "Count" },
  ];

  const contract_details = [
    {
      title: "Type",
      value: collection.contractKind,
    },
    {
      title: "Chain",
      value: "Ethereum",
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
            className="mx-auto border-4 rounded shadow-2xl border-white/10"
          />
          <div className="flex mx-auto mt-4 space-x-2">
            {links.map((social, index) => {
              if (social.value)
                return (
                  <Link key={index} href={`${social.value}`}>
                    {social.icon}
                  </Link>
                );
            })}
          </div>
        </div>

        <div>
          <div>
            <div className="flex mb-3 space-x-2">
              {contract_details.map((detail, index) => {
                return (
                  <div className="uppercase">
                    {" "}
                    <span className="opacity-50 ">{detail.title}</span>{" "}
                    {detail.value}
                  </div>
                );
              })}
            </div>
            <h1>{collection.name}</h1>

            <div className="flex space-x-2">
              {statistics.map((statistic, index) => {
                return (
                  <div key={index} className="px-6 py-2 rounded bg-black/40">
                    <div className="text-xs">{statistic.title}</div>
                    <div className="text-xl">{statistic.value}</div>
                  </div>
                );
              })}
            </div>

            {/* <p
              dangerouslySetInnerHTML={{ __html: collection.description }}
              className="hidden sm:block"
            /> */}
          </div>
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
