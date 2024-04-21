import type { Metadata } from "next";

import { UserAssets } from "./UserAssets";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page() {

  return (
      <>
        <UserAssets />
      </>
  );
}
