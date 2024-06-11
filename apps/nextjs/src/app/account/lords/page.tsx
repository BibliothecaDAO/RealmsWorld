import type { Metadata } from "next";

import { Overview } from "./Overview";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <>
      <Overview />
    </>
  );
}
