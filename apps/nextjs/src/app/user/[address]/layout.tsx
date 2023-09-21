"use client";

import React from "react";
import Image from "next/image";
import { NavLink } from "@/app/_components/ui/nav-link";
import { /*hexToNumber,*/ shortenHex } from "@/utils/utils";
import { motion } from "framer-motion";

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
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(5,5,5, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  //const id = hexToNumber(params.address, 1, 10);
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
    <div className="h-full w-full">
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        className="-mt-24 h-96 w-full"
        style={backgroundImageStyle}
      />
      <motion.div className="sm:pl-32 ">
        <div className="-mt-64 flex h-full p-8">
          <div className="from-theme-gray-light hidden w-1/3 flex-none rounded-t-2xl bg-gradient-to-b p-4 sm:block">
            <h5>{shortenHex(params.address)}</h5>
            {/*<Image
              src={`/users/${id}.png`}
              alt="An example image"
              width={2000}
              height={2000}
              className="mx-auto rounded"
  />*/}
          </div>
          <div className="flex-shrink p-4 p-8 sm:w-2/3">
            <div className="mb-4 flex flex w-full space-x-4 border-b border-white/20 py-3 text-xl">
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
