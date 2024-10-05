import { cn } from "@realms-world/utils";
import { Button } from "@realms-world/ui/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
//import { SearchInput } from "@realms-world/ui/search-input";
import type { ViewType } from "@/app/_components/ViewToggleGroup";
import ViewTypeToggleGroup from "@/app/_components/ViewToggleGroup";
import PortfolioItemsSortingSelect from "./PortfolioItemsSortingSelect";
import { NftActions } from "./NftActions";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

// import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
//import ViewTypeToggleButton from "~/components/view-type-toggle-button";
//import PortfolioItemsFiltersModal from "./portfolio-items-filters-modal";

interface PortfolioItemsToolsBarProps {
  toggleFiltersOpen: () => void;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  walletAddress: string;
  filtersOpen: boolean;
  selectable?: boolean;
  selectBatchNfts?: (contractAddress: string, tokenIds: string[]) => void;
  selectedTokenIds?: string[];
  totalSelectedNfts: number;
  batchTokenIds: string[];
  deselectAllNfts: () => void;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
}
export default function PortfolioItemsToolsBar({
  className,
  toggleFiltersOpen,
  viewType,
  setViewType,
  selectable,
  walletAddress,
  deselectAllNfts,
  batchTokenIds,
  filtersOpen,
  selectedTokenIds,
  totalSelectedNfts,
  selectBatchNfts,
  // walletCollectionsInitialData,
}: PortfolioItemsToolsBarProps & { className?: string }) {
  return (
    <div className={cn("mb-1 mt-1 sm:mt-2", className)}>
      <div className="flex items-center gap-2 md:gap-6">
        {/*<PortfolioItemsFiltersModal
                    walletAddress={walletAddress}
                // walletCollectionsInitialData={walletCollectionsInitialData}
                >
                    <Button variant="secondary" size="icon-xl" className="sm:hidden">
                        {filtersOpen ? <ArrowLeft /> : <Filter />}
                    </Button>
    </PortfolioItemsFiltersModal>*/}
        <Button
          onClick={toggleFiltersOpen}
          variant="secondary"
          className="hidden sm:flex"
        >
          {filtersOpen ? <ArrowLeft /> : <Filter />}
          <span>Filters</span>
        </Button>
        {selectable && (
          <NftActions
            selectedTokenIds={selectedTokenIds}
            totalSelectedNfts={totalSelectedNfts}
            selectBatchNfts={selectBatchNfts}
            batchTokenIds={batchTokenIds}
            deselectAllNfts={deselectAllNfts}
            sourceChain={SUPPORTED_L2_CHAIN_ID}
          />
        )}
        <div className="flex-1" />

        {/*<SearchInput className="flex-1" placeholder="Search item" /> 

         <PortfolioItemsSortingSelect
          className="hidden lg:block"
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
        /> */}

        <ViewTypeToggleGroup
          className="hidden md:flex"
          setViewType={setViewType}
          viewType={viewType}
        />
        {/*<ViewTypeToggleButton
                    className="md:hidden"
                    setViewType={setViewType}
                    viewType={viewType}
    />*/}
      </div>
    </div>
  );
}
