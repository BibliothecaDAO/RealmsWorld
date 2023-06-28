"use client";

import { Attributes } from "@/types";
import Link from "next/link";

export const TokenAttributes = ({ token, collection }: any) => {
  return token.attributes.map((attributes: Attributes, index: string) => {
    return (
      <Link
        href={`/collection/${token.contract}?${attributes.key}=${attributes.value}`}
        key={index}
        className="w-1/2 p-1"
      >
        <div className="p-4 rounded bg-black/50 hover:bg-black/60">
          <div className="w-full text-xs uppercase opacity-70">
            {attributes.key}
          </div>
          <div className="flex justify-between w-full">
            <div className="sm:text-lg font-sans-serif">{attributes.value}</div>
            <div className="ml-3">{attributes.floorAskPrice}</div>
          </div>
          <div className="w-full text-xs opacity-70">
            {attributes.tokenCount} (
            {(
              (attributes.tokenCount / parseInt(collection.tokenCount)) *
              100
            ).toFixed(2)}
            %)
          </div>
        </div>
      </Link>
    );
  });
};
