"use client";

import React from "react";
import { motion } from "framer-motion";
import { hexToNumber, shortenHex } from "@/functions/utils";
import Image from "next/image";
import { NavLink } from "@/app/components/ui/nav-link";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  const defaultImage = "/backgrounds/dummy_background.webp";
  const imageUrl = params.address
    ? `/backgrounds/${params.address}.png`
    : defaultImage;

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const id = hexToNumber(params.address, 1, 10);
  const tabs = [
    {
      name: "Mainnet",
      link: "",
    },
    { name: "Starknet", link: "starknet" },
    {
      name: "Activity",
      link: "activity",
    },
  ];
  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        className="w-full -mt-24 h-96"
        style={backgroundImageStyle}
      />
      <motion.div
        className="sm:pl-32 "
      >
        <div className="flex h-full p-8 -mt-64">
          <div className="flex-none w-1/3 p-4 rounded-t-2xl bg-gradient-to-b from-theme-gray-light">
            <h5>{shortenHex(params.address)}</h5>
            <Image
              src={`/users/${id}.png`}
              alt="An example image"
              width={2000}
              height={2000}
              className="mx-auto rounded"
            />
          </div>
          <div className="flex-grow p-8">
            <div className="flex w-full flex text-xl py-3 border-b border-white/20 mb-4 space-x-4">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.name}
                  exact
                  href={`/user/${params.address}${tab.link && "/" + tab.link}`}
                >
                  {tab.name}
                </NavLink>
              ))}
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
