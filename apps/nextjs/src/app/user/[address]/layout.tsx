import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  //const isUserAddress = [l1Account, l2Account].includes(params?.address);

  return (
    <div className="mt-16 h-full w-full px-4 sm:mt-0 sm:pl-32">
      <div className="">
        <div className="relative z-10">{children} </div>
      </div>
    </div>
  );
}
