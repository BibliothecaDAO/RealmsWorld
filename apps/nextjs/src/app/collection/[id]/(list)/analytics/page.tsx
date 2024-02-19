import type { paths } from "@reservoir0x/reservoir-sdk";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { getOwnersDistribution } from "@/lib/reservoir/getOwnerDistribution";
import { getOwners } from "@/lib/reservoir/getOwners";

import { getCollectionAddresses } from "@realms-world/constants";

import { OwnerDistribution } from "./OwnerDistribution";
import { TopOwners } from "./TopOwners";

export default async function Page({ params }: { params: { id: string } }) {
  const tokenAddresses = getCollectionAddresses(params.id);
  if (!tokenAddresses[SUPPORTED_L1_CHAIN_ID]) {
    return <h3 className="mt-8 text-center">Coming Soon</h3>;
  }
  const ownersDistributionData = getOwnersDistribution({
    collection: tokenAddresses[SUPPORTED_L1_CHAIN_ID] ?? params.id,
  }) as Promise<
    paths["/collections/{collection}/owners-distribution/v1"]["get"]["responses"]["200"]["schema"]
  >;
  const ownersData = getOwners({
    collection: tokenAddresses[SUPPORTED_L1_CHAIN_ID] ?? params.id,
  }) as Promise<{
    owners: paths["/owners/v2"]["get"]["responses"]["200"]["schema"];
  }>;

  const [{ ownersDistribution }, { owners }] = await Promise.all([
    ownersDistributionData,
    ownersData,
  ]);

  const cards = [
    {
      component: <OwnerDistribution ownersDistribution={ownersDistribution} />,
    },
    { component: <TopOwners owners={owners} /> },
  ];

  return (
    <div className="mt-8 grid gap-20 md:grid-cols-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-xl border-2 bg-dark-green px-8 py-2"
        >
          {card.component}
        </div>
      ))}
    </div>
  );
}
