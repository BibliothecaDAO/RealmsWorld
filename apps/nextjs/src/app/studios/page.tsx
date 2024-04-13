import type { Metadata } from "next";
import { StudioCard } from "@/app/studios/StudioCard";

import { studios } from "@realms-world/constants";

import { PageLayout } from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Games of the Realms",
  description:
    "Game Studios contributing to the Realms.World- Created for adventurers by BiblioDAO",
};

export default async function Page() {
  return (
    <PageLayout title="Game Studios">
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(studios).map(([_, studio], index) => (
          <StudioCard key={index} studio={studio} />
        ))}
      </div>
    </PageLayout>
  );
}
