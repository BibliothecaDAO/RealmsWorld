"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const defaultImage = "/backgrounds/dummy_background.png";
  const imageUrl =
    "url(" +
    (params.id ? `/games/${params.id}/background.webp` : defaultImage) +
    ")";
  return (
    <div
      className="mt-32 h-full w-full"
      style={
        {
          "--image-url": imageUrl,
        } as React.CSSProperties
      }
    >
      {/* <div className="mask-transparent absolute  h-48 w-full before:bg-[url:var(--image-url)] before:bg-cover before:bg-center before:bg-no-repeat" /> */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className="sm:pl-32"
      >
        {children}
      </motion.div>
    </div>
  );
}
