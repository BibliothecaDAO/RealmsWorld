"use client";

import React from "react";
import { isStarknetAddress } from "@/utils/utils";
import { motion } from "framer-motion";
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
  const isL2 = isStarknetAddress(params?.address);

  const isL1 = isAddress(params?.address);

  //const isUserAddress = [l1Account, l2Account].includes(params?.address);

  return (
    <div className="h-full w-full">
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        className="mask-transparent -mt-24 h-96 w-full before:bg-[url(/backgrounds/dummy_background.png)] before:bg-cover before:bg-center before:bg-no-repeat"
      />
      <motion.div className="relative z-10 sm:pl-32">
        <div className="-mt-64 flex h-full p-8">
          <UserProfile
            l1Address={isL1 ? params.address : ""}
            l2Address={isL2 ? params.address : ""}
          />

          <div className="flex-shrink p-8 sm:w-3/4">
            <UserTabs address={params.address} />
            <div className="relative z-10">{children} </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
