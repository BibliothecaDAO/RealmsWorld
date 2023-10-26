"use client";

import React from "react";
import { motion } from "framer-motion";

import { ModalWrapper } from "./ModalWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <div className="mask-transparent h-96 w-full before:bg-[url(/backgrounds/bridge.png)] before:bg-cover before:bg-center before:bg-no-repeat" />
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        className="-mt-36 sm:pl-32"
      >
        {children}
      </motion.div>
      <ModalWrapper />
    </div>
  );
}
