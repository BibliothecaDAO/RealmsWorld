import { TokenCardSkeleton } from "../(app)/collection/TokenCardSkeleton";

export const LoadingSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <TokenCardSkeleton key={index} />
      ))}
    </div>
  );
};

import { cn } from "@realms-world/utils";

const ITEMS_COUNT = 30;

type ViewType = "large-grid" | "small-grid" | "list";

function Card({ viewType }: { viewType: ViewType }) {
  return (
    <TokenCardSkeleton className="rounded">
      <div className="image aspect-square animate-pulse bg-primary/10" />
      <div
        className={cn(
          "flex flex-col gap-2 p-3",
          viewType === "small-grid" ? "h-[107px]" : "h-[120px]",
        )}
      >
        <div
          className={cn(
            "w-full rounded",
            viewType === "small-grid" ? "h-[23px]" : "h-[33px]",
          )}
        />
        <div
          className={cn(
            "w-1/2 rounded",
            viewType === "small-grid" ? "h-[20px]" : "h-[23px]",
          )}
        />
      </div>
    </TokenCardSkeleton>
  );
}

export function CollectionItemsDataFallback({
  viewType,
}: {
  viewType: ViewType;
}) {
  if (viewType === "list") {
    return null;
  }

  return (
    <div
      className={cn(
        "mb-2 grid w-full grid-cols-2 gap-4 px-5 sm:gap-2",
        viewType === "small-grid"
          ? "sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]"
          : "sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]",
      )}
    >
      {Array.from(Array(ITEMS_COUNT).keys()).map((index) => (
        <Card key={`cidf-${index}-${viewType}`} viewType={viewType} />
      ))}
    </div>
  );
}
