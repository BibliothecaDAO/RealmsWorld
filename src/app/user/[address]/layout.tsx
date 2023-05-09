"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  const defaultImage = "/backgrounds/dummy_background.png";
  const imageUrl = params.address
    ? `/backgrounds/${params.address}.png`
    : defaultImage;

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

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
        {children}
      </motion.div>
    </div>
  );
}
