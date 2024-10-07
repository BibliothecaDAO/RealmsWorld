import type { Metadata } from "next";

import { BridgeNftWrapper } from "../BridgeNftWrapper";

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
        <BridgeNftWrapper />
      </div>
    </>
  );
}
