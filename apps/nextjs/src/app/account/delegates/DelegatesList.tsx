'use client'
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@realms-world/api";
import { use } from "react";
import { DelegateCard } from "./DelegateCard";

export const DelegatesList = ({ delegates }: {
    delegates: Promise<RouterOutputs["delegates"]["all"]>;
}) => {

    const { data: delegatesInfo } = api.delegates.all.useQuery(
        {
        },
        {
            initialData: use(delegates)
        },
    );

    return (
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {
                delegatesInfo.items.map((delegate) => {
                    return <DelegateCard key={delegate.id} delegate={delegate} />;
                })
            }
        </div>
    )
}