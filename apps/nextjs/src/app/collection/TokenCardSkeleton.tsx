export function TokenCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className="bg-dark-green/90 flex min-h-[400px] flex-row rounded-lg border transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <div className="h-[324px] w-full animate-pulse bg-black/60"></div>
        <div className="p-4">
          <h2
            className={`bg-medium-dark-green w-1/4 rounded text-2xl font-bold ${
              pulse && "animate-pulse"
            }`}
          >
            &nbsp;
          </h2>
          <p
            className={`mt-2 w-1/3 rounded bg-current text-sm ${
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
