import type { Metadata } from "next";
import { DelegationProfile } from "@/app/_components/delegation/Profile";
import { api } from "@/trpc/server";

import type { RouterInputs } from "@realms-world/api";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Delegates`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page() {
  const filters: RouterInputs["delegates"]["all"] = {
    limit: 20,
  };

  const delegates = await api.delegates.all(filters);
  return (
    <div>
      <div className="w-full">
        <h4 className="my-4 text-3xl">Delegates</h4>
        <p>
          Realms World Delegates vote on your behalf on the benefit of the
          protocol.
        </p>
      </div>

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {delegates.items.map((delegate) => (
          <DelegationProfile key={delegate.id} delegate={delegate} />
        ))}
      </div>
    </div>
  );
}
