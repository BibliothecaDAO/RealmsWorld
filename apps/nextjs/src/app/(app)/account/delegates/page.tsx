import type { Metadata } from "next";
import { api } from "@/trpc/server";

import type { RouterInputs } from "@realms-world/api";

import { DelegatesToolbar } from "./DelegatesToolbar";
import { Suspense } from "react";
import { DelegatesList } from "./DelegatesList";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Delegates`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page(
  props: {
    searchParams: Promise<{ search?: string }>;
  }
) {
  const searchParams = await props.searchParams;

  const {
    search
  } = searchParams;

  const filters: RouterInputs["delegates"]["all"] = {
    limit: 200,
    search: search,
  };
  const delegates = api.delegates.all(filters);

  return (
    <div className="px-4 pt-4 md:px-6">
      <div className="w-full">
        <h4 className="my-4 text-3xl">Delegates</h4>
        <p className="text-xl">
          Realms is a DAO-operated onchain gaming network. Realms NFTs are the
          governance tokens.
        </p>
      </div>
      <DelegatesToolbar />
      <Suspense fallback={<div>Loading...</div>}>
        <DelegatesList delegates={delegates} />
      </Suspense>
    </div>
  );
}
