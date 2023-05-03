import React from "react";
import { motion } from "framer-motion";
import CollectionSummary from "../CollectionSummary";
import { Button } from "@/app/components/ui/button";

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
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${imageUrl}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const tabs = [
    {
      name: "Trade",
      link: "/",
    },
    { name: "Analytics", link: "analytics" },
    {
      name: "Activity",
      link: "activity",
    },
  ];
  return (
    <div className="w-full h-full bg-theme-gray">
      <div
        // initial={{ opacity: 0.2 }}
        // animate={{ opacity: 1 }}
        className="w-full -mt-24 h-96"
        style={backgroundImageStyle}
      />

      <div className="flex h-full lg:pl-32 -mt-56">
        <div className="flex-grow p-4 sm:p-8">
          {/* @ts-expect-error Async Server Component */}
          <CollectionSummary address={params.address} />
          <div className="flex gap-4 justify-center">
            {tabs.map((tab) => (
              <Button
                key={tab.name}
                variant={"default"}
                href={`/collection/${params.address}/${tab.link}`}
              >
                {tab.name}
              </Button>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
