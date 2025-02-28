"use client";

import type { RouterOutputs } from "@realms-world/api";
import { use } from "react";
import { api } from "@/trpc/react";

import { DelegateCard } from "./DelegateCard";

export const DelegatesList = ({
  delegates,
}: {
  delegates: Promise<RouterOutputs["delegates"]["all"]>;
}) => {
  const { data: delegatesInfo } = api.delegates.all.useQuery(
    {
      limit: 200,
    },
    {
      initialData: use(delegates),
    },
  );

  const shuffledDelegates = delegatesInfo.items
    .filter(
      (delegate) =>
        delegate.user !==
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    )
    .sort(() => Math.random() - 0.5)
    .sort((a, b) => (a.delegatedVotesRaw === "0" ? 1 : -1));

  return (
    <div className="my-4 grid grid-cols-1 gap-4 overflow-x-hidden md:grid-cols-3">
      {shuffledDelegates.map((delegate) => (
        <DelegateCard key={delegate.id} delegate={delegate} />
      ))}
    </div>
  );
};
