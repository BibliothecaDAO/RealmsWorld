"use client";

import { cn } from "@realms-world/utils";

import PortfolioItemsFiltersContent from "./PortfolioItemsFiltersContent";

interface PortfolioItemsFitlersPanelProps {
  filtersOpen: boolean;
  walletAddress: string;
  selectable?: boolean;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
}

export default function PortfolioItemsFitlersPanel({
  className,
  filtersOpen,
  walletAddress,
  // walletCollectionsInitialData,
}: PortfolioItemsFitlersPanelProps & { className: string }) {
  return (
    filtersOpen && (
      <div
        className={cn(
          "w-72 flex-shrink-0 border-r border-border bg-background",
          className,
        )}
      >
        <PortfolioItemsFiltersContent
          walletAddress={walletAddress}
          className="h-full px-5 py-3"
          selectable
          // walletCollectionsInitialData={walletCollectionsInitialData}
        />
      </div>
    )
  );
}
