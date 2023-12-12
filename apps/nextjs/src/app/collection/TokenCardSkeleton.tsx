export function TokenCardSkeleton({ pulse = true }: { pulse?: boolean }) {
  return (
    <div className="flex min-h-[400px] flex-row border-2 bg-dark-green/90">
      <div className="flex-grow">
        <div className="h-[300px] w-full animate-pulse bg-black/60"></div>
        <div className="space-y-3 p-4">
          <div
            className={`w-1/2 bg-medium-dark-green ${pulse && "animate-pulse"}`}
          >
            &nbsp;
          </div>
          <p
            className={`w-1/3 bg-medium-dark-green text-sm ${
              pulse && "animate-pulse"
            }`}
          >
            &nbsp;
          </p>
        </div>
      </div>
    </div>
  );
}
