import React from "react";

//import { NETWORK_NAME } from "@/constants/env";
//import { ChainType } from "@starkware-industries/commons-js-enums";
//import { motion } from "framer-motion";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="container mx-auto flex flex-wrap p-4 pt-16 sm:p-8">
      {children}
    </div>
  );
}
