import { ArrowLeft } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto flex h-[592px] flex-wrap px-4 sm:px-8">
      <div className="w-full flex-none  p-2 md:w-1/3">
        <div className=" mx-auto h-96 w-full bg-bright-yellow " />
        {/* <div className="flex flex-wrap">
          {new Array(6).fill(0).map((index) => (
            <div key={index} className="w-1/2 ">
              <div className="h-24 animate-pulse  bg-bright-yellow p-4" />
            </div>
          ))}
        </div> */}
      </div>
      <div className="w-auto px-4 md:w-2/3 md:px-8">
        <div className="my-8 h-12 w-56 animate-pulse bg-bright-yellow" />
        <div className="flex space-x-4">
          <div className="h-6 w-16 animate-pulse bg-bright-yellow" />
        </div>
      </div>
    </div>
  );
};
