import type { Metadata } from "next";

import { Overview } from "./Overview";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page() {

  return (
      <>
        <Overview />
      </>
  );
}
