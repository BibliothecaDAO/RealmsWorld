"use client";

import React from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";

import nextConfig from "../../../../next.config.mjs";

export const isImageDomainAllowed = (src: string) => {
  try {
    const url = new URL(src);
    return nextConfig.images?.domains?.includes(url.hostname);
  } catch (error) {
    return false;
  }
};

const SafeImage = (props: ImageProps) => {
  if (!isImageDomainAllowed(props.src as string)) {
    return null;
  }

  return <Image {...props} />;
};

export default SafeImage;
