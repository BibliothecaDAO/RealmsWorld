import type { Metadata } from "next";
import { DelegateCard } from "@/app/account/delegates/DelegateCard";
import { api } from "@/trpc/server";

import type { RouterInputs } from "@realms-world/api";

import { DelegatesActions } from "./DelegatesToolbar";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Delegates`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  searchParams: { search },
}: {
  searchParams: { search?: string };
}) {
  const filters: RouterInputs["delegates"]["all"] = {
    limit: 20,
    search: search,
  };
  console.log(filters);

  const delegates = await api.delegates.all(filters);
  console.log(delegates);
  return (
    <div>
      <div className="w-full">
        <h4 className="my-4 text-3xl">Delegates</h4>
        <p className="text-xl">
          Realms is a DAO-operated onchain gaming network. Realms NFTs are the
          governance tokens.
        </p>
      </div>
      <DelegatesActions />
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {delegates.items.map((delegate) => (
          <DelegateCard key={delegate.id} delegate={delegate} />
        ))}
      </div>
    </div>
  );
}
