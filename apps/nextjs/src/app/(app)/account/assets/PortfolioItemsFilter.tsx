import { cn } from "@realms-world/utils";
import { Button } from "@realms-world/ui";
import { ArrowLeft, Filter } from "lucide-react";
//import { SearchInput } from "@realms-world/ui/search-input";
import ViewTypeToggleGroup, { ViewType } from "@/app/_components/ViewToggleGroup";

// import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
//import ViewTypeToggleButton from "~/components/view-type-toggle-button";
//import PortfolioItemsFiltersModal from "./portfolio-items-filters-modal";

interface PortfolioItemsToolsBarProps {
    toggleFiltersOpen: () => void;
    viewType: ViewType;
    setViewType: (viewType: ViewType) => void;
    walletAddress: string;
    filtersOpen: boolean;
    // walletCollectionsInitialData: WalletCollectionsApiResponse;
}
export default function PortfolioItemsToolsBar({
    className,
    toggleFiltersOpen,
    viewType,
    setViewType,
    walletAddress,
    filtersOpen,
    // walletCollectionsInitialData,
}: PortfolioItemsToolsBarProps & { className?: string }) {
    return (
        <div className={cn("mt-4 bg-background sm:mt-6", className)}>
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
                    size="lg"
                    className="hidden sm:flex"
                >
                    {filtersOpen ? <ArrowLeft /> : <Filter />}
                    <span>Filters</span>
                </Button>

                {/*<SearchInput className="flex-1" placeholder="Search item" /> */}

                {/* <PortfolioItemsSortingSelect
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