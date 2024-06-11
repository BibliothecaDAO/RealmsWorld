import type { Metadata } from "next";
import { redirect } from "next/navigation";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  redirect(`/account/assets`);
}
