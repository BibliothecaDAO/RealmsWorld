"use client";

import React, { use } from "react";

export default function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }
) {
  const params = use(props.params);

  const {
    children
  } = props;

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
