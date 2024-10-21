import React from "react";
import WalletHeader from "../WalletHeader";

export default async function UserLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ address: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  //const isUserAddress = [l1Account, l2Account].includes(params?.address);

  return (
    <div className="h-full w-full">
      <WalletHeader walletAddress={params.address} />
      <div className="relative z-10">{children} </div>
    </div>
  );
}
