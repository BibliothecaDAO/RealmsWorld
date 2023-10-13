export const ActivityCardSkeleton = () => {
  return (
    <div className=" block flex w-full animate-pulse border-b p-2 lg:flex-wrap">
      <div className="block w-full justify-start sm:w-5/12 lg:flex lg:flex-wrap">
        <div className="mr-6 w-full flex-none self-center rounded px-4 py-1 opacity-60 sm:w-32"></div>
        <div
          className="self-start rounded-lg bg-gray-300"
          style={{ width: "60px", height: "60px" }}
        />
        <div className="ml-3 flex-none self-center opacity-50">
          <div className="mb-1 h-4 w-16 bg-gray-300" />
          <div className="h-4 w-24 bg-gray-300" />
        </div>
      </div>
      <div className="w-1/4 sm:w-1/6 lg:w-1/6">
        <div className=" mb-1 h-4 w-12 bg-gray-300 opacity-50" />
        <div className="h-4 w-16 bg-gray-300" />
      </div>
      <div className="w-1/4 sm:w-1/6 lg:w-1/6">
        <div className=" mb-1 h-4 w-16 bg-gray-300 opacity-50" />
        <div className="h-4 w-16 bg-gray-300" />
      </div>
      <div className="flex w-1/2 self-center sm:w-1/6 sm:justify-end lg:w-1/6">
        <div className="h-4 w-16 self-center bg-gray-300" />
      </div>
    </div>
  );
};
