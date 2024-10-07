import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return <div>Lords is the fuel of the Realms Autonomous World</div>;
}
