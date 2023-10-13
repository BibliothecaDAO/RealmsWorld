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
  const imageUrl = params.id ? `/backgrounds/${params.id}.png` : defaultImage;

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(42,43,36, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="bg-dark-green h-full w-full">
      <div className="-mt-24 h-96 w-full" style={backgroundImageStyle} />
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className="sm:pl-32 "
      >
        {children}
      </motion.div>
    </div>
  );
}
