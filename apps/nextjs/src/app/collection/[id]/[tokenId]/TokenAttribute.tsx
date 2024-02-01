"use client";

import Link from "next/link";

interface TokenAttributeProps {
  title: string;
  value: string | number;
  contractId: string;
  floorAskPrice?: string | number;
  attributeTokenCount?: number;
  collectionTokenCount?: number;
}
export const TokenAttribute = ({
  attributeTokenCount,
  collectionTokenCount,
  contractId,
  floorAskPrice,
  title,
  value,
}: TokenAttributeProps) => {
  return (
    <Link href={`/collection/${contractId}?${title}=${value}`}>
      <div className="border-2 bg-dark-green px-4 py-2 transition duration-200 hover:bg-bright-yellow hover:text-dark-green">
        <div className="w-full font-sans text-xs uppercase opacity-50">
          {title}
        </div>
        <div className="flex w-full justify-between">
          <div className="font-sans-serif sm:text-xl">{value}</div>
          <div className="ml-3">{floorAskPrice}</div>
        </div>
        {attributeTokenCount && collectionTokenCount && (
          <div className="w-full text-xs opacity-70">
            {attributeTokenCount} (
            {((attributeTokenCount / collectionTokenCount) * 100).toFixed(2)}
            %)
          </div>
        )}
      </div>
    </Link>
  );
};
