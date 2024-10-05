"use client";

import type { Components } from "react-virtuoso";

import * as React from "react";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import { useUIStore } from "@/providers/UIStoreProvider";
import { TriangleAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { useAccount as useL2Account } from "@starknet-react/core";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import {
  getPortfolioTokens,
  PortfolioCollectionApiResponse,
} from "@/lib/ark/getPortfolioTokens";
import { useArkClient } from "@/lib/ark/useArkClient";
import Media from "@/app/_components/Media";
import type { PortfolioToken } from "@/types/ark";
import { L2ERC721Card } from "../../collection/[id]/(list)/L2ERC721Card";
import { VirtuosoGrid } from "react-virtuoso";
import type { ViewType } from "@/app/_components/ViewToggleGroup";

const LargeGridContainer: Components["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className="mb-2 grid w-full grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] sm:gap-2"
      >
        {children}
      </div>
    );
  },
);

LargeGridContainer.displayName = "LargeGridContainer";

const SmallGridContainer: Components["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className="mb-2 grid w-full grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] sm:gap-2"
      >
        {children}
      </div>
    );
  },
);

SmallGridContainer.displayName = "SmallGridContainer";

export const PortfolioItemsGrid = ({
  walletTokens,
  viewType,
  selectable,
  isNftSelected,
  toggleNftSelection,
}: {
  walletTokens: PortfolioToken[];
  viewType: ViewType;
  selectable?: boolean;
  toggleNftSelection?: (tokenId: string, contractAddress: string) => void;
  isNftSelected?: (tokenId: string, contractAddress: string) => boolean;
}) => {
  return (
    <VirtuosoGrid
      // initialItemCount same as totalCount but needed for SSR
      initialItemCount={walletTokens.length}
      totalCount={walletTokens.length}
      useWindowScroll
      components={{
        List:
          viewType === "large-grid" ? LargeGridContainer : SmallGridContainer,
      }}
      itemContent={(index) => {
        const token = walletTokens[index];

        if (token === undefined) {
          return null;
        }

        if (
          selectable &&
          toggleNftSelection != undefined &&
          isNftSelected != undefined
        ) {
          const isSelected = isNftSelected(
            token.token_id,
            token.collection_address,
          );
          return (
            <button
              key={index}
              className="w-full"
              onClick={() =>
                toggleNftSelection(
                  token.token_id.toString(),
                  token.collection_address,
                )
              }
            >
              <L2ERC721Card isSelected={isSelected} token={token} selectable />
            </button>
          );
        } else {
          return <L2ERC721Card key={token.token_id} token={token} />;
        }
      }}
    />
  );
};
