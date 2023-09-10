import { getOwnersDistribution } from "@/lib/reservoir/getOwnerDistribution";
import { getOwners } from "@/lib/reservoir/getOwners";

import { OwnerDistribution } from "./OwnerDistribution";
import { TopOwners } from "./TopOwners";

export default async function Page({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: any;
}) {
  const { ownersDistribution } = await getOwnersDistribution({
    collection: params.address,
  });
  const { owners } = await getOwners({
    collection: params.address,
  });

  const cards = [
    {
      component: <OwnerDistribution ownersDistribution={ownersDistribution} />,
    },
    { component: <TopOwners owners={owners} /> },
  ];

  return (
    <div className="mt-8 grid gap-20 md:grid-cols-2">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl border-2 px-8 py-2">
          {card.component}
        </div>
      ))}
    </div>
  );
}
