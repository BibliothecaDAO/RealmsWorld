"use client";

import React from "react";
import { isStarknetAddress } from "@/utils/utils";
import { isAddress } from "viem";

import { UserProfile } from "../UserProfile";
import { UserTabs } from "../UserTabs";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  const isL2 = isStarknetAddress(params.address);

  const isL1 = isAddress(params.address);

  //const isUserAddress = [l1Account, l2Account].includes(params?.address);

  return (
    <div className="mt-16 h-full w-full px-4 sm:mt-0 sm:pl-32">
      <UserProfile
        l1Address={isL1 ? params.address : ""}
        l2Address={isL2 ? params.address : ""}
      />
      <div className="">
        <UserTabs address={params.address} />
        <div className="relative z-10">{children} </div>
      </div>
    </div>
  );
}
