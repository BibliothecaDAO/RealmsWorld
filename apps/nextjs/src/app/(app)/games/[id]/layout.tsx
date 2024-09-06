"use client";

import React from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const defaultImage = "/backgrounds/dummy_background.png";
  // const imageUrl =
  //   "url(" +
  //   (params.id ? `/content/games/${params.id}/background.webp` : defaultImage) +
  //   ")";
  return (
    <div
      className="mt-24 h-full w-full"
    // style={
    //   {
    //     "--image-url": imageUrl,
    //   } as React.CSSProperties
    // }
    >
      {children}

    </div>
  );
}
