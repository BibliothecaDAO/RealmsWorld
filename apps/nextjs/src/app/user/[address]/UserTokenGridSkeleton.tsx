import React from "react";

function UserTokenCardSkeleton() {
  return (
    <div className=" flex transform flex-col items-stretch rounded-xl border duration-300">
      <div className="h-64 w-full animate-pulse rounded-t-xl bg-gray-300"></div>
      <div className="flex h-auto flex-col space-y-3 p-3">
        <div className="h-4 w-16 animate-pulse bg-gray-300"></div>
        <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
        <div className="h-4 w-20 animate-pulse bg-gray-300"></div>
      </div>
    </div>
  );
}

function UserTokenGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <UserTokenCardSkeleton key={index} />
        ))}
    </div>
  );
}

export default UserTokenGridSkeleton;
