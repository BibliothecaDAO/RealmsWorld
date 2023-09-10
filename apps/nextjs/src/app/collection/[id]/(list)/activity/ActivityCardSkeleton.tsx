export const ActivityCardSkeleton = () => {
  return (
    <div className="block w-full p-2 border-b border-white/30 flex lg:flex-wrap animate-pulse">
      <div className="block justify-start w-full sm:w-5/12 lg:flex lg:flex-wrap">
        <div className="self-center flex-none w-full px-4 py-1 mr-6 rounded sm:w-32 opacity-60"></div>
        <div
          className="self-start rounded-lg bg-gray-300"
          style={{ width: "60px", height: "60px" }}
        />
        <div className="self-center flex-none ml-3 opacity-50">
          <div className="h-4 bg-gray-300 w-16 mb-1" />
          <div className="h-4 bg-gray-300 w-24" />
        </div>
      </div>
      <div className="w-1/4 sm:w-1/6 lg:w-1/6">
        <div className=" opacity-50 h-4 bg-gray-300 w-12 mb-1" />
        <div className="h-4 bg-gray-300 w-16" />
      </div>
      <div className="w-1/4 sm:w-1/6 lg:w-1/6">
        <div className=" opacity-50 h-4 bg-gray-300 w-16 mb-1" />
        <div className="h-4 bg-gray-300 w-16" />
      </div>
      <div className="flex self-center w-1/2 sm:w-1/6 sm:justify-end lg:w-1/6">
        <div className="self-center h-4 bg-gray-300 w-16" />
      </div>
    </div>
  );
};
