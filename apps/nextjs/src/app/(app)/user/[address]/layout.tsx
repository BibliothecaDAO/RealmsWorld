import React from "react";
import WalletHeader from "../WalletHeader";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  //const isUserAddress = [l1Account, l2Account].includes(params?.address);

  return (
    <div className="h-full w-full">
      <WalletHeader walletAddress={params.address} />
      <div className="relative z-10">{children} </div>
    </div>
  );
}
