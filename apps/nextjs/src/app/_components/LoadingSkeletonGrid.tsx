import { TokenCardSkeleton } from "../collection/TokenCardSkeleton";

export const LoadingSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <TokenCardSkeleton key={index} />
      ))}
    </div>
  );
};
