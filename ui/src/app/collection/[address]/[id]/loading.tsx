import { ArrowLeft } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-wrap h-full p-4 sm:p-8 container mx-auto">
      <div className="flex-none w-full p-2 rounded-t md:w-1/3 bg-gradient-to-b from-theme-gray-light">
        <div className="mx-auto pb-[100%] h-auto w-full border-4 rounded border-white/10" />
        <div className="flex flex-wrap">
          {new Array(6).fill(0).map((index) => (
            <div key={index} className="w-1/2 p-1 ">
              <div className="p-4 h-24 animate-pulse rounded bg-gray-400" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-auto p-4 md:p-8 md:w-2/3">
        <ArrowLeft className="self-center w-4 mr-2" />
        <div className="w-56 my-8 h-12 animate-pulse rounded-full bg-gray-400" />
        <div className="flex space-x-4">
          <div>owner </div>
          <div className="w-16 h-6 animate-pulse rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};
