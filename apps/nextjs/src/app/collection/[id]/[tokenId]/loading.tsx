import { ArrowLeft } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto flex h-[592px] flex-wrap p-4 sm:p-8">
      <div className="w-full flex-none  p-2 md:w-1/2">
        <div className=" mx-auto h-auto w-full  border-4" />
        <div className="flex flex-wrap">
          {new Array(6).fill(0).map((index) => (
            <div key={index} className="w-1/2 p-1 ">
              <div className="h-24 animate-pulse  bg-bright-yellow p-4" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-auto p-4 md:w-1/2 md:p-8">
        <ArrowLeft className="mr-2 w-4 self-center" />
        <div className="my-8 h-12 w-56 animate-pulse bg-bright-yellow" />
        <div className="flex space-x-4">
          <div>owner </div>
          <div className="h-6 w-16 animate-pulse bg-bright-yellow" />
        </div>
      </div>
    </div>
  );
};
