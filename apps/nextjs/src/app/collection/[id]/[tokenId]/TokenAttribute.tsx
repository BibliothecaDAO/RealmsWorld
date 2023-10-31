"use client";

import Link from "next/link";
import type { Attributes } from "@/types";

interface TokenAttributeProps {
  title: string;
  value: any;
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
      <div className="bg-dark-green hover:bg-dark-green/80 rounded border p-4">
        <div className="w-full text-xs uppercase opacity-90">{title}</div>
        <div className="flex w-full justify-between">
          <div className="font-sans-serif sm:text-lg">{value}</div>
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
