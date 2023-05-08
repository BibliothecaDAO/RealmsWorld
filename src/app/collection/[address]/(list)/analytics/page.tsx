import { getOwnersDistribution } from "@/app/lib/reservoir/getOwnerDistribution";
import { OwnerDistribution } from "./OwnerDistribution";
import { getOwners } from "@/app/lib/reservoir/getOwners";
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
    <div className="grid grid-cols-3 gap-20 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border-2 rounded-xl border-white/10 px-8 py-2"
        >
          {card.component}
        </div>
      ))}
    </div>
  );
}
