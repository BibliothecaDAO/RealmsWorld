import type { Metadata } from "next";

import { Collections } from "@realms-world/constants";

import { BridgeNftWrapper } from "./BridgeNftWrapper";
import { Portfolio } from "./Portfolio";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <>
      <div className="h-full w-full space-y-20">
        <Portfolio />
      </div>
    </>
  );
}
