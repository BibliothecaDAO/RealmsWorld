import type { Metadata } from "next";
import { DelegationProfile } from "@/app/_components/delegation/Profile";
import { api } from "@/trpc/server";

import type { RouterInputs } from "@realms-world/api";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

const exampleDelegation = [
  {
    address:
      "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
    description:
      "A wise and ancient sorcerer who guards the secrets of the enchanted forest.",
    delegated: "10",
    twitter: "https://twitter.com/realmsworld",
    telegram: "https://twitter.com/realmsworld",
    github: "https://twitter.com/realmsworld",
  },
  {
    address:
      "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
    description:
      "A wise and ancient sorcerer who guards the secrets of the enchanted forest.",
    delegated: "10",
    twitter: "https://twitter.com/realmsworld",
    github: "https://twitter.com/realmsworld",
    telegram: "https://twitter.com/realmsworld",
  },
  {
    address:
      "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
    description:
      "A wise and ancient sorcerer who guards the secrets of the enchanted forest.",
    delegated: "10",
    twitter: "https://twitter.com/realmsworld",
    github: "https://twitter.com/realmsworld",
    telegram: "https://twitter.com/realmsworld",
  },
  {
    address:
      "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
    description:
      "A wise and ancient sorcerer who guards the secrets of the enchanted forest.",
    delegated: "10",
    twitter: "https://twitter.com/realmsworld",
    telegram: "https://twitter.com/realmsworld",
    github: "https://twitter.com/realmsworld",
  },
  {
    address:
      "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
    description:
      "A wise and ancient sorcerer who guards the secrets of the enchanted forest.",
    delegated: "10",
    twitter: "https://twitter.com/realmsworld",
    github: "https://twitter.com/realmsworld",
    telegram: "https://twitter.com/realmsworld",
  },
  {
    address:
      "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
    description:
      "A wise and ancient sorcerer who guards the secrets of the enchanted forest.",
    delegated: "10",
    twitter: "https://twitter.com/realmsworld",
    github: "https://twitter.com/realmsworld",
    telegram: "https://twitter.com/realmsworld",
  },
];
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
        {delegates.items.map((delegation) => (
          <DelegationProfile key={delegation.id} {...delegation} />
        ))}
      </div>
    </div>
  );
}
