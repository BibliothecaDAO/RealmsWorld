"use client";

import { promises as fs } from "fs";
import path from "path";
import { useEffect, useState } from "react";
import { Carousel } from "@/app/_components/ui/carousel";

export const GameScreenshots = async ({ id }: { id: string }) => {
  const [screenshotList, setScreenshotList] =
    useState<{ src: string; alt: string }[]>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fs.readdir(path.join(dir));
      setScreenshotList(
        data.map((image, index) => ({
          src: `/games/${id}/screenshots/${image}`,
          alt: `${id} Screenshot ${index}`,
        })),
      );
    };

    const dirRelativeToPublicFolder = `games/${id}/screenshots`;
    const dir = path.resolve("public", dirRelativeToPublicFolder);
    fetchData();
    //TODO not working in Vercel production
  }, []);
  return (
    <>
      {screenshotList && (
        <Carousel
          className="h-full"
          images={screenshotList}
          autoPlay
          showPreview
        />
      )}
    </>
  );
};
