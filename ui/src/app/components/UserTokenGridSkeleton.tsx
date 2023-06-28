import React from "react";

function UserTokenCardSkeleton() {
    return (
        <div className="flex flex-col items-stretch duration-300 transform border rounded-xl border-white/10">
            <div className="w-full h-64 bg-gray-300 animate-pulse rounded-t-xl"></div>
            <div className="flex flex-col h-auto p-3 space-y-3">
                <div className="w-16 h-4 bg-gray-300 animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-300 animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
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