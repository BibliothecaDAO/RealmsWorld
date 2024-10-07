import type { Metadata } from "next";

import { Profile } from "./Profile";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <div className="px-4 pt-4 md:px-6">
      <div className="w-full">
        <h4 className="my-4 text-3xl">Delegate Profile</h4>

        <Profile />
      </div>
    </div>
  );
}
