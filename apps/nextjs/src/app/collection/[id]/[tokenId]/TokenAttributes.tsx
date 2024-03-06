"use client";

import type { Collection, Token } from "@/types";
import Link from "next/link";

export const TokenAttributes = ({
  token,
  collection,
}: {
  token: Token;
  collection: Collection;
}) => {
  return token.attributes.map((attributes, index) => {
    return (
      <Link
        href={`/collection/${token.contract}?${attributes.key}=${attributes.value}`}
        key={index}
        className="w-1/2 p-1"
      >
        <div className="rounded bg-black/50 p-4 hover:bg-black/60">
          <div className="w-full text-xs uppercase opacity-70">
            {attributes.key}
          </div>
          <div className="flex w-full justify-between">
            <div className="font-sans-serif sm:text-lg">{attributes.value}</div>
            <div className="ml-3">{attributes.floorAskPrice}</div>
          </div>
          {attributes.tokenCount && (
            <div className="w-full text-xs opacity-70">
              {attributes.tokenCount} (
              {(
                (attributes.tokenCount / parseInt(collection.tokenCount)) *
                100
              ).toFixed(2)}
              %)
            </div>
          )}
        </div>
      </Link>
    );
  });
};
