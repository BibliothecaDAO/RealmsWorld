import type { erc721Tokens } from "@/constants";
import { getOwnersDistribution } from "@/lib/reservoir/getOwnerDistribution";
import { getOwners } from "@/lib/reservoir/getOwners";
import { getTokenContractAddresses } from "@/utils/utils";

import { OwnerDistribution } from "./OwnerDistribution";
import { TopOwners } from "./TopOwners";

export default async function Page({ params }: { params: { id: string } }) {
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const { ownersDistribution } = await getOwnersDistribution({
    collection: tokenAddresses.L1 ?? params.id,
  });
  const { owners } = await getOwners({
    collection: tokenAddresses.L1 ?? params.id,
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
